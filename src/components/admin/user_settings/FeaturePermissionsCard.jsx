import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function FeaturePermissionsCard({ user, userId }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const [saving, setSaving] = useState(false);

  const [permissions, setPermissions] = useState({
    can_create_invoice: true,
    can_download_pdf: true,
    can_send_email: true,
  });

  useEffect(() => {
    if (!user?.id) return;

    setPermissions({
      can_create_invoice: user.can_create_invoice ?? true,
      can_download_pdf: user.can_download_pdf ?? true,
      can_send_email: user.can_send_email ?? true,
    });
  }, [user]);

  const handleChange = (e) => {
    setPermissions((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const savePermissions = async () => {
    setSaving(true);

    try {
      const res = await fetch(
        `${apiBase}/api/admin/users/${userId}/permissions`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
          body: JSON.stringify(permissions),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        Swal.fire(
          "Error",
          data.message || "Failed to update permissions",
          "error",
        );
        return;
      }

      Swal.fire("Success", data.message || "Permissions updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
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
                checked={permissions.can_create_invoice}
                onChange={handleChange}
              />
              <label className="form-check-label">Can Create Invoices</label>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="can_download_pdf"
                checked={permissions.can_download_pdf}
                onChange={handleChange}
              />
              <label className="form-check-label">Can Download PDF</label>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="can_send_email"
                checked={permissions.can_send_email}
                onChange={handleChange}
              />
              <label className="form-check-label">Can Send Emails</label>
            </div>
          </div>

          <div className="col-md-3 mt-10 d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={savePermissions}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Permissions"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
