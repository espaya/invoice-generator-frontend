import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

export default function ProfilePhoto() {
  const apiBase = import.meta.env.VITE_API_URL;

  const { user, fetchUser } = useUser();

  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const removePreview = (e) => {
    e.stopPropagation(); // prevent opening file picker
    setPhotoPreview(null);

    const input = document.getElementById("photoInput");
    if (input) input.value = "";
  };

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

  // drag drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handlePhotoChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User Profile</h4>
        </div>

        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            {/* PHOTO DROPZONE */}
            <div
              style={{
                position: "relative",
                width: "70px",
                height: "70px",
                cursor: "pointer",
              }}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("photoInput").click()}
            >
              <img
                className={`rounded-circle ${
                  dragActive ? "border border-3 border-primary" : ""
                }`}
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

              {/* REMOVE PREVIEW ICON */}
              {photoPreview && !loadingPhoto && (
                <button
                  type="button"
                  onClick={removePreview}
                  className="btn btn-danger btn-sm"
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    padding: "0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  <i className="ri-close-line"></i>
                </button>
              )}

              {/* DRAG OVERLAY */}
              <div
                className="rounded-circle"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: dragActive
                    ? "rgba(13, 110, 253, 0.25)"
                    : "rgba(0,0,0,0.15)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: dragActive ? 1 : 0,
                  transition: "0.2s ease-in-out",
                }}
              >
                <i className="ri-upload-cloud-line text-white fs-20"></i>
              </div>

              {/* UPLOADING OVERLAY */}
              {loadingPhoto && (
                <div
                  className="rounded-circle"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Uploading...
                </div>
              )}
            </div>

            {/* USER DETAILS */}
            <div className="ms-3">
              <h5 className="mb-0">{user?.full_name || "No Full Name"}</h5>
              <small className="text-muted">
                @{user?.username || "No Username"}
              </small>
            </div>
          </div>

          {/* HIDDEN INPUT */}
          <input
            type="file"
            id="photoInput"
            className="d-none"
            accept="image/*"
            disabled={loadingPhoto}
            onChange={(e) => handlePhotoChange(e.target.files[0])}
          />

          <small className="text-muted">
            Click or drag & drop an image on the profile photo to upload.
          </small>
        </div>
      </div>
    </div>
  );
}
