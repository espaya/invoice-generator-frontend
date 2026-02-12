import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useState } from "react";

export default function UpdatePassword() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [loadingPassword, setLoadingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isPasswordFilled =
    passwordData.current_password.trim() !== "" &&
    passwordData.new_password.trim() !== "" &&
    passwordData.new_password_confirmation.trim() !== "";

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!isPasswordFilled) {
      Swal.fire("No changes", "Please fill all password fields", "info");
      return;
    }

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      Swal.fire("Error", "New password confirmation does not match", "error");
      return;
    }

    setLoadingPassword(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${apiBase}/api/user/profile/update-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Password update failed", "error");
        return;
      }

      Swal.fire("Success", data.message || "Password updated!", "success");

      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Update Password</h4>
        </div>

        <div className="card-body">
          <form onSubmit={updatePassword}>
            {/* CURRENT PASSWORD */}
            <div className="mb-3">
              <label className="form-label">Current Password</label>

              <div className="input-group">
                <input
                  type={showCurrent ? "text" : "password"}
                  className="form-control"
                  value={passwordData.current_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current_password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  <i
                    className={showCurrent ? "ri-eye-off-line" : "ri-eye-line"}
                  />
                </button>
              </div>
            </div>

            <div className="row">
              {/* NEW PASSWORD */}
              <div className="col-md-6 mb-3">
                <label className="form-label">New Password</label>

                <div className="input-group">
                  <input
                    type={showNew ? "text" : "password"}
                    className="form-control"
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNew(!showNew)}
                  >
                    <i
                      className={showNew ? "ri-eye-off-line" : "ri-eye-line"}
                    />
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Confirm Password</label>

                <div className="input-group">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="form-control"
                    value={passwordData.new_password_confirmation}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password_confirmation: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <i
                      className={
                        showConfirm ? "ri-eye-off-line" : "ri-eye-line"
                      }
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingPassword || !isPasswordFilled}
            >
              {loadingPassword ? "Saving..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
