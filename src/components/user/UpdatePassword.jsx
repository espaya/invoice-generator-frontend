export default function UpdatePassword({
  updatePassword,
  passwordData,
  setPasswordData,
  loadingPassword,
  isPasswordFilled,
}) {
  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Update Password</h4>
        </div>

        <div className="card-body">
          <form onSubmit={updatePassword}>
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                value={passwordData.current_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                }
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.new_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      new_password: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.new_password_confirmation}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      new_password_confirmation: e.target.value,
                    })
                  }
                />
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
