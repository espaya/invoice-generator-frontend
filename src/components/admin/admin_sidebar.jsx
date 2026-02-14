import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../router";
import { useEffect, useState } from "react";
import CompanySettings from "../../controllers/CompanySettingsController";

export default function AdminSidebar() {
  const location = useLocation();
  const [companySettings, setCompanySettings] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const isActive = (path) => location.pathname === path;
  const logo = companySettings?.logo;

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  return (
    <div className="sidebar">
      {/* LOGO */}
      <div className="brand-logo text-center">
        <Link className="mini-logo" to={PATHS.ADMIN}>
          <img
            src={
              logo
                ? `${apiBase}/storage/${logo}`
                : "/images/logo_placeholder.png"
            }
            alt="logo"
            width={30}
          />
        </Link>
      </div>

      {/* MENU */}
      <div className="menu">
        <ul>
          {/* DASHBOARD */}
          <li className={isActive(PATHS.ADMIN) ? "active" : ""}>
            <Link to={PATHS.ADMIN}>
              <span>
                <i className="ri-grid-fill" />
              </span>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>

          {/* USERS */}
          <li className={isActive(PATHS.ADMIN_USERS) ? "active" : ""}>
            <Link to={PATHS.ADMIN_USERS}>
              <span>
                <i className="ri-user-3-fill" />
              </span>
              <span className="nav-text">Users</span>
            </Link>
          </li>

          {/* INVOICES */}
          <li className={isActive(PATHS.ADMIN_INVOICES) ? "active" : ""}>
            <Link to={PATHS.ADMIN_INVOICES}>
              <span>
                <i className="ri-file-list-3-fill" />
              </span>
              <span className="nav-text">Invoices</span>
            </Link>
          </li>

          {/* CUSTOMERS */}
          <li className={isActive(PATHS.ADMIN_CUSTOMERS) ? "active" : ""}>
            <Link to={PATHS.ADMIN_CUSTOMERS}>
              <span>
                <i className="ri-group-fill" />
              </span>
              <span className="nav-text">Customers</span>
            </Link>
          </li>


          {/* SETTINGS */}
          <li className={isActive(PATHS.ADMIN_SETTINGS) ? "active" : ""}>
            <Link to={PATHS.ADMIN_SETTINGS}>
              <span>
                <i className="ri-settings-3-fill" />
              </span>
              <span className="nav-text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
