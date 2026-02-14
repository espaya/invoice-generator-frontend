import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/admin_sidebar";
import AdminViewUserSidebar from "../../components/admin/admin_view_user_sidebar";
import Header from "../../components/header";
import StatWidgetSkeleton from "../../components/StatWidgetSkeleton";

import getSingleUser from "../../controllers/GetSingleUser";

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
                  {/* ==========================
                      ACCOUNT STATUS CARD
                  ========================== */}
                  <div className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0">Account Status</h4>

                      <span
                        className={`badge ${
                          settings.status === "active"
                            ? "bg-success"
                            : settings.status === "suspended"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                        }`}
                      >
                        {settings.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            value={settings.status}
                            onChange={handleChange}
                          >
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="banned">Banned</option>
                          </select>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Block Login</label>

                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="is_blocked"
                              checked={settings.is_blocked}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              {settings.is_blocked ? "Blocked" : "Allowed"}
                            </label>
                          </div>

                          <small className="text-muted">
                            If blocked, user cannot login.
                          </small>
                        </div>

                        <div className="col-md-12 mt-2 d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={suspendUser}
                          >
                            Suspend
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={banUser}
                          >
                            Ban
                          </button>

                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={reactivateUser}
                          >
                            Reactivate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==========================
                      SUBSCRIPTION & LIMITS
                  ========================== */}
                  <div className="card mb-3 mt-20">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Plan & Limits</h4>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <label className="form-label">Plan</label>
                          <select
                            className="form-select"
                            name="plan"
                            value={settings.plan}
                            onChange={handleChange}
                          >
                            <option value="free">Free</option>
                            <option value="basic">Basic</option>
                            <option value="pro">Pro</option>
                            <option value="enterprise">Enterprise</option>
                          </select>
                        </div>

                        <div className="col-md-4 mb-3">
                          <label className="form-label">Invoice Limit</label>
                          <input
                            type="number"
                            className="form-control"
                            name="invoice_limit"
                            value={settings.invoice_limit}
                            onChange={handleChange}
                          />
                          <small className="text-muted">
                            Set 0 for unlimited.
                          </small>
                        </div>

                        <div className="col-md-4 mb-3">
                          <label className="form-label">Customer Limit</label>
                          <input
                            type="number"
                            className="form-control"
                            name="customer_limit"
                            value={settings.customer_limit}
                            onChange={handleChange}
                          />
                          <small className="text-muted">
                            Set 0 for unlimited.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==========================
                      FEATURE PERMISSIONS
                  ========================== */}
                  <div className="card mb-3 mt-20">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Feature Permissions</h4>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="can_create_invoice"
                              checked={settings.can_create_invoice}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              Can Create Invoices
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4 mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="can_download_pdf"
                              checked={settings.can_download_pdf}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              Can Download PDF
                            </label>
                          </div>
                        </div>

                        <div className="col-md-4 mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="can_send_email"
                              checked={settings.can_send_email}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              Can Send Emails
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==========================
                      SECURITY CONTROLS
                  ========================== */}
                  <div className="card mb-3 mt-20">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Security Controls</h4>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="force_password_reset"
                              checked={settings.force_password_reset}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">
                              Force Password Reset on Next Login
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <button
                            type="button"
                            className="btn btn-outline-primary w-100"
                            onClick={() =>
                              Swal.fire(
                                "Coming Soon",
                                "This will allow admin to manually verify user email.",
                                "info",
                              )
                            }
                          >
                            Verify Email Manually
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==========================
                      ADMIN NOTES
                  ========================== */}
                  <div className="card mb-3 mt-20">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Admin Notes</h4>
                    </div>

                    <div className="card-body">
                      <textarea
                        className="form-control"
                        rows={5}
                        name="admin_notes"
                        value={settings.admin_notes}
                        onChange={handleChange}
                        placeholder="Write internal notes about this user..."
                      ></textarea>

                      <small className="text-muted d-block mt-2">
                        Notes are private and only visible to admins.
                      </small>
                    </div>
                  </div>

                  {/* ==========================
                      SAVE BUTTON
                  ========================== */}
                  <div className="d-grid mb-3 mt-20">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Settings"}
                    </button>
                  </div>

                  {/* ==========================
                      DANGER ZONE
                  ========================== */}
                  <div className="card border-danger mt-20">
                    <div className="card-header bg-danger text-white">
                      <h4 className="card-title mb-0 text-white">
                        Danger Zone
                      </h4>
                    </div>

                    <div className="card-body">
                      <p className="text-muted">
                        These actions are irreversible. Proceed carefully.
                      </p>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteUser}
                      >
                        Delete User Permanently
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
