import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function AccountStatusCard({ user, userId }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("active");
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setStatus(user.status || "active");
    setIsBlocked(user.is_blocked ?? false);
  }, [user]);

  const saveStatus = async () => {
    setSaving(true);

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${userId}/status`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify({
          status,
          is_blocked: isBlocked,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Failed to update status", "error");
        return;
      }

      Swal.fire("Success", data.message || "Status updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">Account Status</h4>

        <span
          className={`badge ${
            status === "active"
              ? "bg-success"
              : status === "suspended"
                ? "bg-warning text-dark"
                : "bg-danger"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
                checked={isBlocked}
                onChange={(e) => setIsBlocked(e.target.checked)}
              />
              <label className="form-check-label">
                {isBlocked ? "Blocked" : "Allowed"}
              </label>
            </div>

            <small className="text-muted">If blocked, user cannot login.</small>
          </div>

          <div className="col-md-3 mt-10 d-grid">
            <button
              className="btn btn-primary"
              type="button"
              onClick={saveStatus}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
