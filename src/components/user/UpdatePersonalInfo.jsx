import Country from "../../components/Country";

export default function UpdatePersonalInfo({
  updateProfile,
  profileData,
  setProfileData,
  loadingProfile,
  isProfileChanged,
}) {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Personal Information</h4>
        </div>

        <div className="card-body">
          <form onSubmit={updateProfile}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      username: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.full_name}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      full_name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.city}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      city: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Post Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.post_code}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      post_code: e.target.value,
                    })
                  }
                />
              </div>

              <Country
                profileData={profileData}
                setProfileData={setProfileData}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingProfile || !isProfileChanged}
            >
              {loadingProfile ? "Saving..." : "Save Changes"}
            </button>

            {!isProfileChanged && (
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
