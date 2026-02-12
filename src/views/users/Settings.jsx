import { useState, useEffect } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";
import Country from "../../components/Country";

export default function Settings() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const [user, setUser] = useState(null);

  // ORIGINAL values (for detecting changes)
  const [originalProfile, setOriginalProfile] = useState(null);
  const [originalEmail, setOriginalEmail] = useState("");

  // PROFILE DATA (includes username + full_name)
  const [profileData, setProfileData] = useState({
    username: "", // users.name
    full_name: "", // profiles.full_name
    phone: "",
    address: "",
    city: "",
    post_code: "",
    country: "",
  });

  const [emailData, setEmailData] = useState({
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // fetch user profile
  useEffect(() => {
    fetch(`${apiBase}/api/user/profile`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        const profile = {
          username: data.name || "",
          full_name: data.profile?.full_name || "",
          phone: data.profile?.phone || "",
          address: data.profile?.address || "",
          city: data.profile?.city || "",
          post_code: data.profile?.post_code || "",
          country: data.profile?.country || "",
        };

        setProfileData(profile);
        setOriginalProfile(profile);

        setEmailData({ email: data.email || "" });
        setOriginalEmail(data.email || "");
      })
      .catch((err) => console.error(err));
  }, [apiBase]);

  // Detect changes
  const isProfileChanged =
    originalProfile &&
    JSON.stringify(profileData) !== JSON.stringify(originalProfile);

  const isEmailChanged = emailData.email !== originalEmail;

  const isPasswordFilled =
    passwordData.current_password.trim() !== "" ||
    passwordData.new_password.trim() !== "" ||
    passwordData.new_password_confirmation.trim() !== "";

  const isPhotoSelected = !!photo;

  // Photo preview handler
  const handlePhotoChange = (file) => {
    setPhoto(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  // update profile info (username + full_name + profile fields)
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

      if (data.user) {
        setUser(data.user);

        const updatedProfile = {
          username: data.user.name || "",
          full_name: data.user.profile?.full_name || "",
          phone: data.user.profile?.phone || "",
          address: data.user.profile?.address || "",
          city: data.user.profile?.city || "",
          post_code: data.user.profile?.post_code || "",
          country: data.user.profile?.country || "",
        };

        setProfileData(updatedProfile);
        setOriginalProfile(updatedProfile);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingProfile(false);
    }
  };

  // update email
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
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingEmail(false);
    }
  };

  // update password
  const updatePassword = async (e) => {
    e.preventDefault();

    if (!isPasswordFilled) {
      Swal.fire("No changes", "Please fill password fields", "info");
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
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingPassword(false);
    }
  };

  // update photo
  const updatePhoto = async (e) => {
    e.preventDefault();

    if (!photo) {
      Swal.fire("No changes", "Please select a photo first", "info");
      return;
    }

    setLoadingPhoto(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const formData = new FormData();
      formData.append("photo", photo);

      const res = await fetch(`${apiBase}/api/user/profile/update-photo`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("X-XSRF-TOKEN"),
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Photo update failed", "error");
        return;
      }

      Swal.fire("Success", data.message || "Photo updated!", "success");

      setUser((prev) => ({
        ...prev,
        photo: data.photo_url,
      }));

      setPhoto(null);
      setPhotoPreview(null);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingPhoto(false);
    }
  };

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />

        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Profile</h3>
                    <p className="mb-2">Welcome to Settings Profile page</p>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Settings </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Profile</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* MENU */}
              <div className="col-md-3">
                <ul className="settings-menu">
                  <li className="active">
                    <Link to={PATHS.SETTINGS}>
                      <i className="ri-arrow-right-s-line" />
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-9">
                <div className="row">
                  {/* PHOTO */}
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
                                Username: {profileData.username}
                              </small>
                            </div>
                          </div>

                          <input
                            type="file"
                            className="form-control mb-3"
                            accept="image/*"
                            onChange={(e) =>
                              handlePhotoChange(e.target.files[0])
                            }
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

                  {/* UPDATE EMAIL */}
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
                                setEmailData({ email: e.target.value })
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
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* UPDATE PASSWORD */}
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Update Password</h4>
                      </div>

                      <div className="card-body">
                        <form onSubmit={updatePassword}>
                          <div className="mb-3">
                            <label className="form-label">
                              Current Password
                            </label>
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
                              <label className="form-label">
                                Confirm Password
                              </label>
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

                  {/* PERSONAL INFORMATION */}
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

                  {/* END */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
