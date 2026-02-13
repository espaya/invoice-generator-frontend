import { useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import Country from "../../components/Country";
import Cookies from "js-cookie";

export default function AdminAddUser() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [preview, setPreview] = useState("/images/avatar.png");
  const [dragActive, setDragActive] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    post_code: "",
    country: "",
    photo: null,
  });

  const removePhoto = () => {
    setFormData({ ...formData, photo: null });
    setPreview("/images/avatar.png");

    const input = document.getElementById("photoInput");
    if (input) input.value = "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({ ...formData, photo: file });

      // preview
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("full_name", formData.full_name);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("post_code", formData.post_code);
      data.append("country", formData.country);

      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const res = await fetch(`${apiBase}/api/admin/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        //   "Content-Type": "application/json",
        },
        body: data,
        credentials: "include",
      });

      const response = await res.json();

      if (!res.ok) {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          setErrors({ general: response.message || "Something went wrong" });
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to create user",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message || "User created successfully!",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        full_name: "",
        phone: "",
        address: "",
        city: "",
        post_code: "",
        country: "",
        photo: null,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      setFormData({ ...formData, photo: file });

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
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
    <div id="main-wrapper">
      <Header />
      <AdminSidebar />

      <div className="content-body">
        <div className="container">
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>Add User</h3>
                  <p className="mb-2">Create a new user account</p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Home </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">Add User</a>
                </div>
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-20 d-flex justify-content-center">
                        <div
                          style={{
                            position: "relative",
                            width: "120px",
                            height: "120px",
                          }}
                        >
                          <img
                            className="rounded-circle"
                            src={preview}
                            alt="User Preview"
                            width={120}
                            height={120}
                            style={{ objectFit: "cover" }}
                          />

                          {formData.photo && (
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="btn btn-danger btn-sm"
                              style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                padding: "0px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Username */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter username"
                        />
                        {errors.name && (
                          <small className="text-danger">
                            {errors.name[0]}
                          </small>
                        )}
                      </div>

                      {/* Full Name */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter full name"
                        />
                        {errors.full_name && (
                          <small className="text-danger">
                            {errors.full_name[0]}
                          </small>
                        )}
                      </div>

                      {/* Email */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                        {errors.email && (
                          <small className="text-danger">
                            {errors.email[0]}
                          </small>
                        )}
                      </div>

                      {/* Password */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Password</label>

                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                          />

                          <span
                            className="input-group-text"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i
                              className={
                                showPassword ? "ri-eye-off-line" : "ri-eye-line"
                              }
                            ></i>
                          </span>
                        </div>

                        {errors.password && (
                          <small className="text-danger">
                            {errors.password[0]}
                          </small>
                        )}
                      </div>

                      {/* Role */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Role</label>
                        <select
                          className="form-select"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>

                        {errors.role && (
                          <small className="text-danger">
                            {errors.role[0]}
                          </small>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone"
                        />
                        {errors.phone && (
                          <small className="text-danger">
                            {errors.phone[0]}
                          </small>
                        )}
                      </div>

                      {/* Address */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter address"
                        />
                        {errors.address && (
                          <small className="text-danger">
                            {errors.address[0]}
                          </small>
                        )}
                      </div>

                      {/* City */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <small className="text-danger">
                            {errors.city[0]}
                          </small>
                        )}
                      </div>

                      {/* Post Code */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Post Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="post_code"
                          value={formData.post_code}
                          onChange={handleChange}
                          placeholder="Enter post code"
                        />
                        {errors.post_code && (
                          <small className="text-danger">
                            {errors.post_code[0]}
                          </small>
                        )}
                      </div>

                      {/* Country */}
                      <div className="col-md-6">
                        <Country
                          profileData={formData}
                          setProfileData={setFormData}
                        />
                        {errors.country && (
                          <small className="text-danger">
                            {errors.country[0]}
                          </small>
                        )}
                      </div>

                      {/* Photo */}
                      {/* Photo Upload Drag & Drop */}
                      <div className="col-md-6 mb-16">
                        <label className="form-label">Photo</label>

                        <div
                          className={`border rounded p-4 text-center ${
                            dragActive
                              ? "border-primary bg-light"
                              : "border-secondary"
                          }`}
                          style={{ cursor: "pointer" }}
                          onDragEnter={handleDragEnter}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() =>
                            document.getElementById("photoInput").click()
                          }
                        >
                          <i className="ri-upload-cloud-line fs-30 text-primary"></i>
                          <p className="mb-0 mt-2">
                            Drag & drop image here <br /> or{" "}
                            <strong>click to upload</strong>
                          </p>

                          {formData.photo && (
                            <p className="mt-2 text-success mb-0">
                              Selected: {formData.photo.name}
                            </p>
                          )}
                        </div>

                        <input
                          type="file"
                          id="photoInput"
                          className="d-none"
                          accept="image/*"
                          name="photo"
                          onChange={handleFileChange}
                        />

                        {errors.photo && (
                          <small className="text-danger">
                            {errors.photo[0]}
                          </small>
                        )}
                      </div>

                      {/* Submit */}
                      <div className="col-md-4 d-grid gap-2 mt-3">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save User"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
