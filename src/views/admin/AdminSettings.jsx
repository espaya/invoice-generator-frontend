import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function AdminSettings() {
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
                    Manage your personal and company profile settings
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
            {/* Main Profile Card */}
            <div className="col-xl-8">
              <div className="row">
                {/* Personal Info Card */}
                <div className="col-lg-6">
                  <div className="card welcome-profile">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-10">
                        <img
                          src="images/avatar/1.png"
                          alt="Avatar"
                          className="me-16 rounded-circle"
                          width={75}
                        />
                        <div>
                          <h4 className="mb-2">Jane Doe</h4>
                          <p className="text-dark mb-1">
                            Senior Product Manager
                          </p>
                          <p className="mb-0">jane.doe@enterprise.com</p>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <span className="verified">
                            <i className="ri-check-line" />
                          </span>
                          Account Verified
                        </li>
                        <li>
                          <span className="not-verified">
                            <i className="ri-shield-check-line" />
                          </span>
                          Two-Factor Authentication
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mobile App Verification */}
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5>Verify On Mobile App</h5>
                      <p>
                        Secure, fast, and reliable verification for enterprise
                        users.
                      </p>
                      <a href="#" className="btn btn-primary me-2">
                        <img src="images/android.svg" alt="Android" />
                      </a>
                      <a href="#" className="btn btn-primary">
                        <img src="images/apple.svg" alt="Apple" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title">Personal & Company Info</h4>
                      <button className="btn btn-primary">Edit</button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {[
                          { label: "User ID", value: "U-00123" },
                          { label: "Full Name", value: "Jane Doe" },
                          {
                            label: "Email Address",
                            value: "jane.doe@enterprise.com",
                          },
                          {
                            label: "Role / Position",
                            value: "Senior Product Manager",
                          },
                          { label: "Phone Number", value: "+1 234 567 8901" },
                          {
                            label: "Address",
                            value: "123 Enterprise St, New York, NY",
                          },
                          { label: "Post Code", value: "10001" },
                          { label: "City", value: "New York" },
                          { label: "Country", value: "USA" },
                          { label: "Joined Since", value: "01/03/2020" },
                          { label: "Company Name", value: "Enterprise Corp" },
                          { label: "TIN / Tax ID", value: "TIN-123456789" },
                          { label: "Currency", value: "USD ($)" },
                          { label: "Website", value: "https://enterprise.com" },
                          { label: "Account Type", value: "Enterprise User" },
                        ].map((info) => (
                          <div
                            className="col-lg-6 col-md-6 mb-3"
                            key={info.label}
                          >
                            <div className="user-info">
                              <span>{info.label}</span>
                              <h5>{info.value}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Widgets */}
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
                      icon: "ri-stack-line",
                      title: "Company Stats",
                      subtitle: "Active Projects: 12",
                    },
                  ].map((widget) => (
                    <div className="col-xl-12 col-md-6 mb-3" key={widget.title}>
                      <div className="bg-white py-12 px-12 rounded d-flex align-items-center shadow-sm">
                        <div
                          className={`profile-widget-icon me-15 fs-24 d-flex justify-content-center align-items-center rounded-circle bg-primary-lighten text-primary`}
                        >
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

              {/* Optional: Top Performance / Quick Links */}
              <div className="card transparent">
                <div className="card-header">
                  <h4 className="card-title">Quick Actions</h4>
                </div>
                <div className="card-body">
                  <button className="btn btn-success w-100 mb-3">
                    Update Profile
                  </button>
                  <button className="btn btn-warning w-100 mb-3">
                    Change Password
                  </button>
                  <button className="btn btn-info w-100 mb-3">
                    Manage Company Info
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
