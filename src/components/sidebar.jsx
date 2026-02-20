import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../router";
import { useEffect, useState } from "react";
import CompanySettings from "../controllers/CompanySettingsController";

export default function Sidebar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [companySettings, setCompanySettings] = useState({});

  const isActive = (path) => location.pathname === path;

  const logo = companySettings?.logo;

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings)
  },[])

  return (
    <div className="sidebar">
      <div className="brand-logo text-center">
        <a className="mini-logo" href="/">
          <img src={logo ? `${apiBase}/storage/${logo}` : "/images/logo_placeholder.png"} alt="" width="30" />
        </a>
      </div>

      <div className="menu">
        <ul>
          <li className={isActive(PATHS.USER) ? "active" : ""}>
            <Link to={PATHS.USER}>
              <span>
                <i className="ri-grid-fill"></i>
              </span>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>

          <li className={isActive(PATHS.INVOICE) ? "active" : ""}>
            <Link to={PATHS.INVOICE}>
              <span>
                <i className="ri-file-text-fill"></i>
              </span>
              <span className="nav-text">Invoice</span>
            </Link>
          </li>

          <li className={isActive(PATHS.ADD_INVOICE) ? "active" : ""}>
            <Link to={PATHS.ADD_INVOICE}>
              <span>
                <i className="ri-file-add-fill"></i>
              </span>
              <span className="nav-text">Add Invoice</span>
            </Link>
          </li>

          <li className={isActive(PATHS.CUSTOMERS) ? "active" : ""}>
            <Link to={PATHS.CUSTOMERS}>
              <span>
                <i className="ri-team-fill"></i>
              </span>
              <span className="nav-text">Customers</span>
            </Link>
          </li>

          <li className={isActive(PATHS.SETTINGS) ? "active" : ""}>
            <Link to={PATHS.SETTINGS}>
              <span>
                <i className="ri-settings-fill"></i>
              </span>
              <span className="nav-text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
