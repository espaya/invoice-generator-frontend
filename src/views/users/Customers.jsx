import { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../controllers/Pagination";
import formatDate from "../../utils/FormatDate";
import Spinner from "../../components/Spinner";
import GetCustomers from "../../controllers/GetCustomers";
import md5 from "blueimp-md5";

export default function Customers() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [customers, setCustomers] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);

  // Fetch customers
  const fetchCustomers = (page = 1) => {
    GetCustomers(setLoading, apiBase, setCustomers, page);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div id="main-wrapper">
      <Header />
      <Sidebar />

      <div className="content-body">
        <div className="container">
          {/* Page Title */}
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>Customers</h3>
                  <p className="mb-2">
                    Welcome to the Customer management page
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="row">
            <div className="col-12">
              <div className="card transparent">
                <div className="card-body">
                  {loading ? (
                    <Spinner />
                  ) : (customers?.data?.length ?? 0) === 0 ? (
                    <p className="alert alert-info">No customers found.</p>
                  ) : (
                    <>
                      <div className="rtable rtable--6cols rtable--collapse">
                        {/* Table Header */}
                        <div className="rtable-row rtable-row--head bg-transparent">
                          <div className="rtable-cell column-heading text-dark">
                            <strong>ID</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Name</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Email</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Address</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Created At</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Actions</strong>
                          </div>
                        </div>

                        {/* Table Rows */}
                        {customers?.data?.length > 0 ? (
                          <div className="rtable-row">
                            {customers.data.map((customer) => (
                              <div className="rtable-row" key={customer.id}>
                                <div className="rtable-cell">
                                  <img
                                    src={`https://www.gravatar.com/avatar/${md5(customer.email.trim().toLowerCase())}?s=50&d=identicon`}
                                    alt={customer.name}
                                    className="img-fluid rounded-circle"
                                    width="30"
                                    height="30"
                                  />
                                </div>
                                <div className="rtable-cell">
                                  {customer.name}
                                </div>
                                <div className="rtable-cell">
                                  {customer.email}
                                </div>
                                <div className="rtable-cell">
                                  {customer.address}
                                </div>
                                <div className="rtable-cell">
                                  {formatDate(customer.created_at)}
                                </div>
                                <div className="rtable-cell">
                                  <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-primary">
                                      <i className="ri-eye-fill"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>No customers found.</p>
                        )}
                      </div>

                      {/* Pagination */}
                      <Pagination
                        currentPage={customers?.current_page ?? 1}
                        lastPage={customers?.last_page ?? 1}
                        onPageChange={fetchCustomers}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
