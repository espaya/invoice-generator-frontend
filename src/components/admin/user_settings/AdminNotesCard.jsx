import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function AdminNotesCard({ user, userId }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const [saving, setSaving] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    setAdminNotes(user.admin_notes || "");
  }, [user]);

  const saveNotes = async () => {
    setSaving(true);

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${userId}/notes`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify({
          admin_notes: adminNotes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Failed to update notes", "error");
        return;
      }

      Swal.fire("Success", data.message || "Notes updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card mb-3 mt-20">
      <div className="card-header">
        <h4 className="card-title mb-0">Admin Notes</h4>
      </div>

      <div className="card-body">
        <textarea
          className="form-control"
          rows={5}
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Write private notes about this user..."
        />

        <small className="text-muted d-block mt-10">
          Notes are only visible to admins.
        </small>

        <div className="d-grid mt-10 col-md-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveNotes}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
}
