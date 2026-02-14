import { Link, useLocation, useParams } from "react-router-dom";

export default function AdminViewUserSidebar() {
  const { id } = useParams();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li className={isActive(`/admin/dashboard/users/${id}`) ? "active" : ""}>
          <Link to={`/admin/dashboard/users/${id}`}>
            <i className="ri-arrow-right-s-line" />
            Profile
          </Link>
        </li>

        <li
          className={
            isActive(`/admin/dashboard/users/${id}/invoice`) ? "active" : ""
          }
        >
          <Link to={`/admin/dashboard/users/${id}/invoice`}>
            <i className="ri-arrow-right-s-line" />
            Invoices
          </Link>
        </li>

        <li
          className={
            isActive(`/admin/dashboard/users/${id}/settings`) ? "active" : ""
          }
        >
          <Link to={`/admin/dashboard/users/${id}/settings`}>
            <i className="ri-arrow-right-s-line" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
