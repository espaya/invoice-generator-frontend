import Country from "../../components/Country";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

export default function UpdatePersonalInfo() {
  const apiBase = import.meta.env.VITE_API_URL;

  const { user, fetchUser } = useUser();

  const [loadingProfile, setLoadingProfile] = useState(false);

  const [originalProfile, setOriginalProfile] = useState(null);

  const [profileData, setProfileData] = useState({
    username: "",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    post_code: "",
    country: "",
  });

  // load profile data from global user
  useEffect(() => {
    if (!user) return;

    const profile = {
      username: user.username || "",
      full_name: user.full_name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      post_code: user.post_code || "",
      country: user.country || "",
    };

    setProfileData(profile);
    setOriginalProfile(profile);
  }, [user]);

  const isProfileChanged =
    originalProfile &&
    JSON.stringify(profileData) !== JSON.stringify(originalProfile);

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!isProfileChanged) {
      Swal.fire("No changes", "No changes were made", "info");
      return;
    }

    setLoadingProfile(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${apiBase}/api/user/profile/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Update failed", "error");
        return;
      }

      Swal.fire("Success", data.message || "Profile updated!", "success");

      // refresh global user (Header updates)
      await fetchUser();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoadingProfile(false);
    }
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Personal Information</h4>
        </div>

        <div className="card-body">
          <form onSubmit={updateProfile}>
            <div className="row">
              {/* USERNAME */}
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

              {/* FULL NAME */}
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

              {/* PHONE */}
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

              {/* ADDRESS */}
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

              {/* CITY */}
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

              {/* POST CODE */}
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

              {/* COUNTRY */}
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
          </form>
        </div>
      </div>
    </div>
  );
}
