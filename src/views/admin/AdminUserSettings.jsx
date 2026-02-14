import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/admin_sidebar";
import AdminViewUserSidebar from "../../components/admin/admin_view_user_sidebar";
import Header from "../../components/header";
import StatWidgetSkeleton from "../../components/StatWidgetSkeleton";

import getSingleUser from "../../controllers/GetSingleUser";
import AccountStatusCard from "../../components/admin/user_settings/AccountStatusCard";
import FeaturePermissionsCard from "../../components/admin/user_settings/FeaturePermissionsCard";
import SecurityControlsCard from "../../components/admin/user_settings/SecurityControlsCard";
import AdminNotesCard from "../../components/admin/user_settings/AdminNotesCard";
import DangerZoneCard from "../../components/admin/user_settings/DangerZoneCard";

export default function AdminUserSettings() {
  const apiBase = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleUser, setSingleUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    status: "active", // active | suspended | banned
    is_blocked: false,
    force_password_reset: false,
    plan: "free",
    invoice_limit: 0,
    customer_limit: 0,
    can_create_invoice: true,
    can_download_pdf: true,
    can_send_email: true,
    admin_notes: "",
  });

  // ==========================
  // LOAD USER DETAILS
  // ==========================
  useEffect(() => {
    getSingleUser(setLoading, setErrors, apiBase, setSingleUser, id);
  }, [id]);

  // ==========================
  // PREFILL SETTINGS ON LOAD
  // ==========================
  useEffect(() => {
    if (!singleUser?.id) return;

    setSettings({
      status: singleUser.status || "active",
      is_blocked: singleUser.is_blocked ?? false,
      force_password_reset: singleUser.force_password_reset ?? false,
      plan: singleUser.plan || "free",
      invoice_limit: singleUser.invoice_limit ?? 0,
      customer_limit: singleUser.customer_limit ?? 0,
      can_create_invoice: singleUser.can_create_invoice ?? true,
      can_download_pdf: singleUser.can_download_pdf ?? true,
      can_send_email: singleUser.can_send_email ?? true,
      admin_notes: singleUser.admin_notes || "",
    });
  }, [singleUser]);

  // ==========================
  // HANDLE CHANGE
  // ==========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================
  // SAVE SETTINGS
  // ==========================
  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${id}/settings`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire(
          "Error",
          data.message || "Failed to update settings",
          "error",
        );
        return;
      }

      Swal.fire("Success", data.message || "Settings updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // DELETE USER
  // ==========================
  const deleteUser = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Delete failed", "error");
        return;
      }

      Swal.fire(
        "Deleted",
        data.message || "User deleted successfully",
        "success",
      );
      navigate("/admin/dashboard/users");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  // ==========================
  // SUSPEND USER
  // ==========================
  const suspendUser = async () => {
    const confirm = await Swal.fire({
      title: "Suspend User?",
      text: "User will not be able to login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    setSettings((prev) => ({ ...prev, status: "suspended" }));

    Swal.fire(
      "Suspended",
      "User marked as suspended. Click Save to apply.",
      "info",
    );
  };

  // ==========================
  // BAN USER
  // ==========================
  const banUser = async () => {
    const confirm = await Swal.fire({
      title: "Ban User?",
      text: "This is a permanent restriction.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Ban User",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    setSettings((prev) => ({ ...prev, status: "banned" }));

    Swal.fire("Banned", "User marked as banned. Click Save to apply.", "info");
  };

  // ==========================
  // REACTIVATE USER
  // ==========================
  const reactivateUser = async () => {
    setSettings((prev) => ({ ...prev, status: "active", is_blocked: false }));

    Swal.fire(
      "Reactivated",
      "User marked active. Click Save to apply.",
      "success",
    );
  };

  return (
    <div id="main-wrapper">
      <Header />
      <AdminSidebar />

      <div className="content-body">
        <div className="container">
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>User Settings</h3>
                  <p className="mb-2">
                    Manage account restrictions, permissions and limits
                  </p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Users </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">Settings</a>
                </div>
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row">
            <AdminViewUserSidebar />

            <div className="col-md-9">
              {loading ? (
                <StatWidgetSkeleton />
              ) : (
                <form onSubmit={saveSettings}>
                  <AccountStatusCard />
                  <FeaturePermissionsCard />
                  <SecurityControlsCard />
                  <AdminNotesCard />
                  <DangerZoneCard />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
