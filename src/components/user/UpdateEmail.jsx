import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

export default function UpdateEmail() {
  const apiBase = import.meta.env.VITE_API_URL;

  const { user, fetchUser } = useUser();

  const [loadingEmail, setLoadingEmail] = useState(false);

  const [emailData, setEmailData] = useState({
    email: "",
  });

  const [originalEmail, setOriginalEmail] = useState("");

  // set initial email when user is available
  useEffect(() => {
    if (user?.email) {
      setEmailData({ email: user.email });
      setOriginalEmail(user.email);
    }
  }, [user]);

  const isEmailChanged = emailData.email !== originalEmail;

  const updateEmail = async (e) => {
    e.preventDefault();

    if (!isEmailChanged) {
      Swal.fire("No changes", "No changes were made", "info");
      return;
    }

    setLoadingEmail(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${apiBase}/api/user/profile/update-email`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
        body: JSON.stringify(emailData),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Email update failed", "error");
        return;
      }

      Swal.fire("Success", data.message || "Email updated!", "success");

      setOriginalEmail(emailData.email);

      // refresh global user (updates Header instantly)
      await fetchUser();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Update Email</h4>
        </div>

        <div className="card-body">
          <form onSubmit={updateEmail}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={emailData.email}
                onChange={(e) =>
                  setEmailData({
                    email: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingEmail || !isEmailChanged}
            >
              {loadingEmail ? "Saving..." : "Save"}
            </button>

            {!isEmailChanged && (
              <small className="text-muted d-block mt-2">
                No changes detected
              </small>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
