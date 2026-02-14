import { Link } from "react-router-dom";
import { PATHS } from "../../../router";

export default function QuickActions() {
  return (
    <>
      <div className="col-lg-4 col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Quick Actions</h4>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-6">
                <Link
                  to={PATHS.ADD_INVOICE}
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="ri-file-add-line fs-18"></i>
                  Create User
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to={PATHS.CUSTOMERS}
                  className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="ri-user-add-line fs-18"></i>
                  View Customers
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to={PATHS.INVOICE}
                  className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2 text-dark"
                >
                  <i className="ri-file-list-3-line fs-18"></i>
                  View Invoices
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to={PATHS.SETTINGS}
                  className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="ri-settings-3-line fs-18"></i>
                  Settings
                </Link>
              </div>
            </div>

            <small className="text-muted d-block mt-3">
              Quickly access the most used invoice tools.
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
