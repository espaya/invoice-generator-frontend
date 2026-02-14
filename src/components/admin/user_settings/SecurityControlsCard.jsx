import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function SecurityControlsCard({ user, userId }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const [saving, setSaving] = useState(false);
  const [forcePasswordReset, setForcePasswordReset] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setForcePasswordReset(user.force_password_reset ?? false);
  }, [user]);

  const saveSecurity = async () => {
    setSaving(true);

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${userId}/security`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify({
          force_password_reset: forcePasswordReset,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire(
          "Error",
          data.message || "Failed to update security",
          "error",
        );
        return;
      }

      Swal.fire("Success", data.message || "Security updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card mb-3 mt-20">
      <div className="card-header">
        <h4 className="card-title mb-0">Security Controls</h4>
      </div>

      <div className="card-body">
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={forcePasswordReset}
            onChange={(e) => setForcePasswordReset(e.target.checked)}
          />
          <label className="form-check-label">
            Force Password Reset on Next Login
          </label>
        </div>

        <div className="d-grid col-md-3 mt-15">
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveSecurity}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Security"}
          </button>
        </div>
      </div>
    </div>
  );
}
