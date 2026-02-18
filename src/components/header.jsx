import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";

import Notification from "./notification";
import { PATHS } from "../router";
import { useUser } from "../context/UserContext";
import { logoutUser } from "../routes/Logout"; // ✅ import logout helper
import CompanySettings from "../controllers/CompanySettingsController";
import { AuthContext } from "../routes/AuthContext";

export default function Header() {
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [companySettings, setCompanySettings] = useState({});
  const [loading, setLoading] = useState(false);
  const {user: authUser } = useContext(AuthContext);

  const logo = companySettings?.logo;

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // ✅ fetch user once when header loads
  useEffect(() => {
    if (user) return;

    fetch(`${apiBase}/api/user/profile`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Header fetch user error:", err));
  }, [apiBase, user, setUser]);

  // ✅ handle logout
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    await logoutUser(setUser, navigate);

    Swal.fire("Logged Out", "You have been logged out successfully", "success");
  };

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="header-content">
              <div className="header-left">
                <div className="brand-logo">
                  <a className="mini-logo" href="#">
                    <img
                      src={
                        logo
                          ? `${apiBase}/storage/${logo}`
                          : "/images/logo_placeholder.png"
                      }
                      alt=""
                      width="40"
                    />
                  </a>
                </div>
              </div>

              <div className="header-right">
                <div className="dark-light-toggle">
                  <span className="dark">
                    <i className="ri-moon-line"></i>
                  </span>
                  <span className="light">
                    <i className="ri-sun-line"></i>
                  </span>
                </div>

                {/* <Notification /> */}

                <div className="dropdown profile_log dropdown">
                  <div data-bs-toggle="dropdown">
                    <div className="user icon-menu active">
                      <span className="thumb">
                        <img
                          src={user?.photo ? user.photo : "/images/avatar.png"}
                          alt="profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <div
                    tabIndex="-1"
                    role="menu"
                    aria-hidden="true"
                    className="dropdown-menu dropdown-menu-right"
                  >
                    <div className="user-email">
                      <div className="user">
                        <span className="thumb">
                          <img
                            src={
                              user?.photo ? user.photo : "/images/avatar.png"
                            }
                            alt="profile"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </span>

                        <div>
                          <h5 className="mb-0">
                            {user?.full_name || "No Full Name"}
                          </h5>

                          <small className="text-muted d-block">
                            @{user?.username || "username"}
                          </small>

                          <span>{user?.email || "No email"}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top"
                      to={
                        authUser && authUser?.role === "admin"
                          ? PATHS.ADMIN_SETTINGS
                          : PATHS.SETTINGS
                      }
                    >
                      <span className="fs-18 text-primary me-10">
                        <i className="ri-settings-3-line"></i>
                      </span>
                      Settings
                    </Link>

                    {/* ✅ LOGOUT BUTTON FIXED */}
                    <button
                      type="button"
                      className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top text-danger"
                      onClick={handleLogout}
                      style={{
                        background: "transparent",
                        border: "none",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <span className="fs-18 text-danger me-10">
                        <i className="ri-logout-circle-line"></i>
                      </span>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
