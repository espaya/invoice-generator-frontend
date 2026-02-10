import { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profile, setProfile] = useState({
    username: "janedoe",
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Senior Product Manager",
    phone: "+1 234 567 8901",
    address: "123 Main St, New York, NY",
    postCode: "10001",
    city: "New York",
    country: "USA",
    joined: "01/03/2020", // read-only
    accountType: "Enterprise User", // read-only
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setIsEditing(false);
    console.log("Updated profile:", profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Password updated:", passwords);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsChangingPassword(false);
  };

  const handlePasswordCancel = () => {
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsChangingPassword(false);
  };

  const fields = [
    { label: "Username", name: "username" },
    { label: "Full Name", name: "fullName" },
    { label: "Email Address", name: "email" },
    { label: "Role / Position", name: "role" },
    { label: "Phone Number", name: "phone" },
    { label: "Address", name: "address" },
    { label: "Post Code", name: "postCode" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
    { label: "Joined Since", name: "joined", readOnly: true },
    { label: "Account Type", name: "accountType", readOnly: true },
  ];

  return (
    <div id="main-wrapper">
      <Header />
      <Sidebar />

      <div className="content-body">
        <div className="container">
          {/* Page Title */}
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>User Profile & Settings</h3>
                  <p className="mb-2">
                    Manage your account and invoicing settings
                  </p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Home </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">Profile & Settings</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Main Content Card */}
            <div className="col-xl-8">
              <div className="row">
                {/* Personal Info Card */}
                <div className="col-lg-12">
                  <div className="card welcome-profile">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-10">
                        <img
                          src="/images/avatar/1.png"
                          alt="Avatar"
                          className="me-16 rounded-circle"
                          width={75}
                        />
                        <div>
                          <h4 className="mb-2">{profile.fullName}</h4>
                          <p className="text-dark mb-1">{profile.role}</p>
                          <p className="mb-0">{profile.email}</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>

                {/* Profile or Password Form */}
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex align-items-center">
                      <h4 className="card-title mb-0">
                        {isChangingPassword
                          ? "Change Password"
                          : "Personal Information"}
                      </h4>

                      <div className="ms-auto d-flex flex-column flex-md-row gap-2 mt-2 mt-md-0 w-100 w-md-50 align-items-center justify-content-center justify-content-md-end">
                        {!isChangingPassword && (
                          <button
                            className="btn btn-primary w-100 w-md-auto"
                            style={{ maxWidth: "150px" }}
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? "View" : "Edit"}
                          </button>
                        )}
                        <button
                          className="btn btn-danger w-100 w-md-auto"
                          style={{ maxWidth: "150px" }}
                          onClick={() => {
                            setIsChangingPassword(true);
                            setIsEditing(false);
                          }}
                        >
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        {/* Show Password Form if changing password */}
                        {isChangingPassword ? (
                          <div className="col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Current Password
                              </label>
                              <input
                                type="password"
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={handlePasswordChange}
                                className="form-control"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">New Password</label>
                              <input
                                type="password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={handlePasswordChange}
                                className="form-control"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={handlePasswordChange}
                                className="form-control"
                              />
                            </div>
                            <div className="mt-3">
                              <button
                                className="me-2 btn btn-primary"
                                onClick={handlePasswordUpdate}
                              >
                                Update Password
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={handlePasswordCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Profile fields
                          fields.map((field) => (
                            <div
                              className="col-lg-6 col-md-6 mb-3"
                              key={field.name}
                            >
                              <div className="user-info">
                                <span>{field.label}</span>
                                {isEditing && !field.readOnly ? (
                                  <input
                                    type="text"
                                    name={field.name}
                                    value={profile[field.name]}
                                    onChange={handleChange}
                                    className="form-control mt-1"
                                  />
                                ) : (
                                  <h5>{profile[field.name]}</h5>
                                )}
                              </div>
                            </div>
                          ))
                        )}

                        {!isChangingPassword && isEditing && (
                          <div className="col-lg-9 mt-3">
                            <button
                              className="me-2 btn btn-primary"
                              onClick={handleUpdate}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4">
              <div className="card transparent mb-3">
                <div className="row card-body g-2">
                  {[
                    {
                      icon: "ri-user-settings-line",
                      title: "My Profile",
                      subtitle: "Account settings",
                    },
                    {
                      icon: "ri-message-2-line",
                      title: "My Messages",
                      subtitle: "Inbox & Drafts",
                    },
                    {
                      icon: "ri-pulse-line",
                      title: "My Activity",
                      subtitle: "Logs & Notifications",
                    },
                    {
                      icon: "ri-file-list-3-line",
                      title: "Invoices",
                      subtitle: "View & Manage Invoices",
                    },
                  ].map((widget) => (
                    <div className="col-xl-12 col-md-6 mb-3" key={widget.title}>
                      <div className="bg-white py-12 px-12 rounded d-flex align-items-center shadow-sm">
                        <div className="profile-widget-icon me-15 fs-24 d-flex justify-content-center align-items-center rounded-circle bg-primary-lighten text-primary">
                          <i className={widget.icon} />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{widget.title}</h6>
                          <p className="mb-0">{widget.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card transparent mt-20">
                <div className="card-header">
                  <h4 className="card-title">Quick Actions</h4>
                </div>
                <div className="card-body">
                  <button className="btn btn-info w-100 mb-3">
                    Generate New Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
