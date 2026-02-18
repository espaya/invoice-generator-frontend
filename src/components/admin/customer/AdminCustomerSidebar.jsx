import { Link, useParams, useLocation } from "react-router-dom";

export default function AdminCustomerSidebar() {
  const { id } = useParams();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li
          className={
            isActive(`/admin/dashboard/customers/${id}`) ? "active" : ""
          }
        >
          <Link to={`/admin/dashboard/customers/${id}`}>
            <i className="ri-arrow-right-s-line" />
            Profile
          </Link>
        </li>

        <li
          className={
            isActive(`/admin/dashboard/customers/${id}/invoice`) ? "active" : ""
          }
        >
          <Link to={`/admin/dashboard/customers/${id}/invoice`}>
            <i className="ri-arrow-right-s-line" />
            Invoice
          </Link>
        </li>

        <li
          className={
            isActive(`/admin/dashboard/customers/${id}/settings`)
              ? "active"
              : ""
          }
        >
          <Link to={`/admin/dashboard/customers/${id}/settings`}>
            <i className="ri-arrow-right-s-line" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
