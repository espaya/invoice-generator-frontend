import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function DangerZoneCard({ userId }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const deleteUser = async () => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: "This action is permanent and cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${apiBase}/api/admin/users/${userId}`, {
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

  return (
    <div className="card border-danger mb-3 mt-20">
      <div className="card-header bg-danger text-white">
        <h4 className="card-title mb-10 text-white">Danger Zone</h4>
      </div>

      <div className="card-body">
        <p className="text-muted">
          These actions are irreversible. Proceed carefully.
        </p>

        <button className="btn btn-danger" type="button" onClick={deleteUser}>
          Delete User Permanently
        </button>
      </div>
    </div>
  );
}
