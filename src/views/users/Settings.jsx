import { useState, useEffect } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";
import ProfilePhoto from "../../components/user/ProfilePhoto";
import UpdateEmail from "../../components/user/UpdateEmail";
import UpdatePassword from "../../components/user/UpdatePassword";
import UpdatePersonalInfo from "../../components/user/UpdatePersonalInfo";


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
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
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
                  <div className="row">
                    <ProfilePhoto
                      user={user}
                      profileData={profileData}
                      updatePhoto={updatePhoto}
                      handlePhotoChange={handlePhotoChange}
                      photoPreview={photoPreview}
                      loadingPhoto={loadingPhoto}
                      isPhotoSelected={isPhotoSelected}
                    />

                    <UpdateEmail
                      updateEmail={updateEmail}
                      emailData={emailData}
                      setEmailData={setEmailData}
                      loadingEmail={loadingEmail}
                      isEmailChanged={isEmailChanged}
                    />

                    <UpdatePassword
                      updatePassword={updatePassword}
                      passwordData={passwordData}
                      setPasswordData={setPasswordData}
                      loadingPassword={loadingPassword}
                      isPasswordFilled={isPasswordFilled}
                    />

                    <UpdatePersonalInfo
                      updateProfile={updateProfile}
                      profileData={profileData}
                      setProfileData={setProfileData}
                      loadingProfile={loadingProfile}
                      isProfileChanged={isProfileChanged}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
