export default function UpdateEmail({
  updateEmail,
  emailData,
  setEmailData,
  loadingEmail,
  isEmailChanged,
}) {
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
                onChange={(e) => setEmailData({ email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingEmail || !isEmailChanged}
            >
              {loadingEmail ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
