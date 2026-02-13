import { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Pagination from "../../controllers/Pagination";
import formatDate from "../../utils/FormatDate";
import Spinner from "../../components/Spinner";
import GetCustomers from "../../controllers/GetCustomers";
import Gravatar from "../../utils/Gravatar";

export default function Customers() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [customers, setCustomers] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch customers
  const fetchCustomers = (page = 1, searchQuery = search) => {
    GetCustomers(setLoading, apiBase, setCustomers, page, searchQuery);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ Search debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCustomers(1, search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

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

              {/* SEARCH */}
              <div className="col-md-6">
                <div className="search">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search name, email, address..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <span className="input-group-text px-12">
                        <i className="ri-search-line"></i>
                      </span>
                    </div>
                  </form>
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
                    <p className="text-muted">
                      No customers found {search && `for "${search}"`}
                    </p>
                  ) : (
                    <>
                      <div className="rtable rtable--6cols rtable--collapse">
                        {/* Table Header */}
                        <div className="rtable-row rtable-row--head bg-transparent">
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Avatar</strong>
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
                        {customers.data.map((customer) => (
                          <div className="rtable-row" key={customer.id}>
                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                <Gravatar
                                  email={customer.email}
                                  name={customer.name}
                                />
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {customer.name}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {customer.email}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {customer.address || "N/A"}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {formatDate(customer.created_at)}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                <button className="btn btn-sm btn-primary">
                                  <i className="ri-eye-fill"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <Pagination
                        currentPage={customers.current_page}
                        lastPage={customers.last_page}
                        onPageChange={(page) => fetchCustomers(page, search)}
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
