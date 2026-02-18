import { useContext } from "react";
import Header from "../components/header";
import { AuthContext } from "../routes/AuthContext";
import AdminSidebar from "../components/admin/admin_sidebar";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function NotFound() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div id="main-wrapper">
        <Header />

        {user?.role === "admin" ? <AdminSidebar /> : <Sidebar />}

        <div className="content-body">
          <div className="container">
            {/* PAGE TITLE */}
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>404 - Page Not Found</h3>
                    <p className="mb-2">
                      Sorry, the page you are looking for does not exist.
                    </p>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="breadcrumbs">
                    <Link to={user?.role === "admin" ? PATHS.ADMIN : PATHS.USER}>
                      Home
                    </Link>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <span>404</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 404 CARD */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <h1
                        style={{
                          fontSize: "80px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        className="text-primary"
                      >
                        404
                      </h1>

                      <h4 className="mb-2">Oops! Page not found</h4>

                      <p className="text-muted mb-3">
                        The page you are trying to access may have been removed,
                        renamed, or is temporarily unavailable.
                      </p>
                    </div>

                    <div className="d-flex justify-content-center gap-2 flex-wrap mt-20">
                      <Link
                        to={user?.role === "admin" ? PATHS.ADMIN : PATHS.USER}
                        className="btn btn-primary"
                      >
                        <i className="ri-home-4-line me-1" />
                        Go to Dashboard
                      </Link>

                      <button
                        onClick={() => window.location.reload()}
                        className="btn btn-info"
                      >
                        <i className="ri-refresh-line me-1" />
                        Refresh Page
                      </button>
                    </div>

                    <div className="mt-20">
                      <small className="text-muted">
                        If you think this is an error, contact your system
                        administrator.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END ROW */}
          </div>
        </div>
      </div>
    </>
  );
}
