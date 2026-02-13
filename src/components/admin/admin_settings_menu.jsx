import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../router";

export default function AdminSettingsMenu() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li className={isActive(PATHS.ADMIN_SETTINGS) ? "active" : ""}>
          <Link to={PATHS.ADMIN_SETTINGS}>
            <i className="ri-arrow-right-s-line" />
            Profile
          </Link>
        </li>

        <li className={isActive(PATHS.ADMIN_SYSTEM_SETTINGS) ? "active" : ""}>
          <Link to={PATHS.ADMIN_SYSTEM_SETTINGS}>
            <i className="ri-arrow-right-s-line" />
            System
          </Link>
        </li>
      </ul>
    </div>
  );
}
