import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

export default function ProfilePhoto() {
  const apiBase = import.meta.env.VITE_API_URL;

  const { user, fetchUser } = useUser();

  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const uploadPhoto = async (file) => {
    if (!file) return;

    setLoadingPhoto(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const formData = new FormData();
      formData.append("photo", file);

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

      setPhotoPreview(null);

      // refresh global user (Header updates instantly)
      await fetchUser();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoadingPhoto(false);
    }
  };

  const handlePhotoChange = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPhotoPreview(url);

    uploadPhoto(file);
  };

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User Profile</h4>
        </div>

        <div className="card-body">
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
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            <div>
              <h5 className="mb-0">{user?.full_name || "No Full Name"}</h5>
              <small className="text-muted">
                @{user?.username || "No Username"}
              </small>

              {loadingPhoto && (
                <div>
                  <small className="text-primary">Uploading...</small>
                </div>
              )}
            </div>
          </div>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            disabled={loadingPhoto}
            onChange={(e) => handlePhotoChange(e.target.files[0])}
          />
        </div>
      </div>
    </div>
  );
}
