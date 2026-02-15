import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="brand-logo text-center">
          <a className="mini-logo" href="index.html">
            <img src="images/logoi.png" alt="" width="30" />
          </a>
        </div>
        <div className="menu">
          <ul>
            <li className="undefined">
              <Link to={PATHS.USER}>
                <span>
                  <i className="ri-grid-fill"></i>
                </span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="undefined">
              <Link to={PATHS.INVOICE}>
                <span>
                  <i className="ri-file-text-fill"></i>
                </span>
                <span className="nav-text">Invoice</span>
              </Link>
            </li>
            <li>
              <Link to={PATHS.ADD_INVOICE}>
                <span>
                  <i className="ri-file-add-fill"></i>
                </span>
                <span className="nav-text">Add Invoice</span>
              </Link>
            </li>

            <li className="undefined">
              <Link to={PATHS.CUSTOMERS}>
                <span>
                  <i className="ri-team-fill"></i>
                </span>
                <span className="nav-text">Customers</span>
              </Link>
            </li>
            <li className="undefined">
              <Link to={PATHS.SETTINGS}>
                <span>
                  <i className="ri-settings-fill"></i>
                </span>
                <span className="nav-text">Settings</span>
              </Link>
            </li>

            <li>
              <Link to={PATHS.ABOUT_APP}>
                <span>
                  <i className="ri-information-fill"></i>
                </span>
                <span className="nav-text">About App</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
