import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/admin_sidebar";
import AdminCustomerSidebar from "../../components/admin/customer/AdminCustomerSidebar";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import StatWidgetSkeleton from "../../components/StatWidgetSkeleton";

export default function AdminSingleCustomer() {
  const { id } = useParams();
  const apiBase = import.meta.env.VITE_API_URL;

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const getCustomer = async () => {
    setFetchLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/get-customer/${id}`, {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
        return;
      }

      setCustomer({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    setErrors({});
    setUpdateLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/update-customer/${id}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: JSON.stringify(customer),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      Swal.fire("Success", "Customer updated successfully!", "success");

      setCustomer({
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
        address: data.customer.address,
      });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <AdminSidebar />

        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Profile</h3>
                    <p className="mb-2">
                      Welcome to Edunet Settings Profile page
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <AdminCustomerSidebar />

              <div className="col-md-9">
                <div className="row">
                  <div className="col-xxl-12">
                    <div className="card">
                      {fetchLoading ? (
                        <StatWidgetSkeleton />
                      ) : (
                        <>
                          {errors.general && (
                            <p className="alert alert-danger">
                              {errors.general}
                            </p>
                          )}

                          <div className="card-header">
                            <h4 className="card-title">Personal Information</h4>
                          </div>

                          <div className="card-body">
                            <form
                              className="personal-info-valid"
                              onSubmit={updateCustomer}
                            >
                              <div className="info-group row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                  <label className="form-label">
                                    Full Name
                                  </label>
                                  <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    value={customer.name}
                                    onChange={handleChange}
                                  />
                                  {errors.name && (
                                    <small className="text-danger">
                                      {errors.name[0]}
                                    </small>
                                  )}
                                </div>

                                <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                  <label className="form-label">Email</label>
                                  <input
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    value={customer.email}
                                    onChange={handleChange}
                                  />
                                  {errors.email && (
                                    <small className="text-danger">
                                      {errors.email[0]}
                                    </small>
                                  )}
                                </div>

                                <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                  <label className="form-label">Phone</label>
                                  <input
                                    name="phone"
                                    type="text"
                                    className="form-control"
                                    value={customer.phone}
                                    onChange={handleChange}
                                  />
                                  {errors.phone && (
                                    <small className="text-danger">
                                      {errors.phone[0]}
                                    </small>
                                  )}
                                </div>

                                <div className="col-xxl-6 col-xl-6 col-lg-6 mb-16">
                                  <label className="form-label">Address</label>
                                  <input
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    value={customer.address}
                                    onChange={handleChange}
                                  />
                                  {errors.address && (
                                    <small className="text-danger">
                                      {errors.address[0]}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="mt-16">
                                <button
                                  disabled={updateLoading}
                                  type="submit"
                                  className="btn btn-primary mr-2 d-flex align-items-center gap-2"
                                >
                                  {updateLoading && (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  )}

                                  {updateLoading ? "Updating..." : "Update"}
                                </button>
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
        </div>
      </div>
    </>
  );
}
