import { Link, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import getSingleUser from "../../controllers/GetSingleUser";
import StatWidgetSkeleton from "../../components/StatWidgetSkeleton";
import formatDate from "../../utils/FormatDate";
import AdminViewUserSidebar from "../../components/admin/admin_view_user_sidebar";

export default function AdminViewUser() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    getSingleUser(setLoading, setErrors, apiBase, setSingleUser, id);
  }, [id]);

  const photoUrl = singleUser?.profile?.photo
    ? `${apiBase}/storage/${singleUser.profile.photo}`
    : "/images/avatar.png";

  return (
    <div id="main-wrapper">
      <Header />
      <AdminSidebar />

      <div className="content-body">
        <div className="container">
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>User Profile</h3>
                  <p className="mb-2">View user details</p>
                </div>
              </div>

              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Users </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">Profile</a>
                </div>
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row">
            <AdminViewUserSidebar />

            <div className="col-md-9">
              <div className="card">
                {loading ? (
                  <StatWidgetSkeleton />
                ) : (
                  <>
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0">Information</h4>

                      <Link
                        to={`/admin/dashboard/users/edit/${id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </div>

                    <div className="card-body">
                      {/* USER PHOTO */}
                      <div className="d-flex align-items-center mb-4">
                        <img
                          src={photoUrl}
                          alt="User"
                          className="rounded-circle border me-3"
                          width={80}
                          height={80}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />

                        <div>
                          <h4 className="mb-0">
                            {singleUser?.profile?.full_name || "No Full Name"}
                          </h4>

                          <small className="text-muted">
                            @{singleUser?.name || "No username"}
                          </small>
                        </div>
                      </div>

                      <form className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>USER ID</span>
                            <h5>{singleUser?.id || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>USER NAME</span>
                            <h5>{singleUser?.name || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>FULL NAME</span>
                            <h5>{singleUser?.profile?.full_name || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>EMAIL ADDRESS</span>
                            <h5>{singleUser?.email || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>PHONE</span>
                            <h5>{singleUser?.profile?.phone || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>ROLE</span>
                            <h5>{singleUser?.role || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>ADDRESS</span>
                            <h5>{singleUser?.profile?.address || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>POST CODE</span>
                            <h5>{singleUser?.profile?.post_code || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>CITY</span>
                            <h5>{singleUser?.profile?.city || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>COUNTRY</span>
                            <h5>{singleUser?.profile?.country || "N/A"}</h5>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="user-info">
                            <span>JOINED SINCE</span>
                            <h5>
                              {singleUser?.created_at
                                ? formatDate(singleUser.created_at)
                                : "N/A"}
                            </h5>
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
