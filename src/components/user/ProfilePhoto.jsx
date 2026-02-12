export default function ProfilePhoto({
  user,
  profileData,
  updatePhoto,
  handlePhotoChange,
  photoPreview,
  loadingPhoto,
  isPhotoSelected,
}) {
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User Profile</h4>
        </div>

        <div className="card-body">
          <form onSubmit={updatePhoto}>
            <div className="d-flex align-items-center mb-3">
              <img
                className="rounded-circle me-3"
                src={
                  photoPreview
                    ? photoPreview
                    : user?.photo
                      ? user.photo
                      : "/images/avatar.png"
                }
                width={70}
                height={70}
                alt="profile"
                style={{ objectFit: "cover" }}
              />

              <div>
                <h5 className="mb-0">
                  {profileData.full_name || "No Full Name"}
                </h5>
                <small className="text-muted">
                  Username: {profileData.username || "No Username"}
                </small>
              </div>
            </div>

            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e.target.files[0])}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingPhoto || !isPhotoSelected}
            >
              {loadingPhoto ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
