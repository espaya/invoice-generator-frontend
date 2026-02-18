import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import Pagination from "../../controllers/Pagination";
import Cookies from "js-cookie";
import formatDate from "../../utils/FormatDate";
import TableSkeleton from "../../components/TableSkeleton";
import { Link } from "react-router-dom";

export default function AdminCustomers() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Customers
  const getCustomers = async (page = 1, searchQuery = "") => {
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${apiBase}/api/admin/customers?page=${page}&search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Failed to fetch customers" });
        setCustomers([]);
        return;
      }

      setCustomers(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page/search changes
  useEffect(() => {
    getCustomers(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  // Delete Customer
  const deleteCustomer = async (id) => {
    const result = await Swal.fire({
      title: "Delete Customer",
      text: "Are you sure you want to delete this customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${apiBase}/api/admin/customers/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          Swal.fire({
            title: "Error",
            text: data.message || "Failed to delete customer",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });

        getCustomers(currentPage, debouncedSearch);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
      }
    }
  };

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
                  <h3>Customers</h3>
                  <p className="mb-2">Manage all customers</p>
                </div>
              </div>

              <div className="col-auto">
                <div className="search">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search customers..."
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

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row">
            <div className="col-12">
              <div className="card transparent">
                <div className="card-body">
                  <div className="rtable rtable--5cols rtable--collapse">
                    {/* TABLE HEAD */}
                    <div className="rtable-row rtable-row--head bg-transparent">
                      <div className="rtable-cell topic-cell column-heading text-dark">
                        <strong>Name</strong>
                      </div>

                      <div className="rtable-cell category-cell column-heading text-dark">
                        <strong>Email</strong>
                      </div>

                      <div className="rtable-cell ranking-cell column-heading text-dark">
                        <strong>Phone</strong>
                      </div>

                      <div className="rtable-cell impression-cell column-heading text-dark">
                        <strong>Address</strong>
                      </div>

                      <div className="rtable-cell sales-cell column-heading text-dark">
                        <strong>Created</strong>
                      </div>

                      <div className="rtable-cell earning-cell column-heading text-dark">
                        <strong>Actions</strong>
                      </div>
                    </div>

                    {/* LOADING SKELETON */}
                    {loading && <TableSkeleton />}

                    {/* CUSTOMER ROWS */}
                    {!loading && customers.length > 0
                      ? customers.map((customer) => (
                          <div className="rtable-row" key={customer.id}>
                            <div className="rtable-cell topic-cell">
                              <div className="rtable-cell--content title-content">
                                {customer.name}
                              </div>
                            </div>

                            <div className="rtable-cell category-cell">
                              <div className="rtable-cell--heading">Email</div>
                              <div className="rtable-cell--content date-content">
                                {customer.email}
                              </div>
                            </div>

                            <div className="rtable-cell ranking-cell">
                              <div className="rtable-cell--heading">Phone</div>
                              <div className="rtable-cell--content">
                                {customer.phone || "N/A"}
                              </div>
                            </div>

                            <div className="rtable-cell impression-cell">
                              <div className="rtable-cell--heading">
                                Address
                              </div>
                              <div className="rtable-cell--content">
                                {customer.address || "N/A"}
                              </div>
                            </div>

                            <div className="rtable-cell sales-cell">
                              <div className="rtable-cell--heading">
                                Created
                              </div>
                              <div className="rtable-cell--content">
                                {formatDate(customer.created_at)}
                              </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="rtable-cell earning-cell">
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-sm btn-outline-info"
                                  title="View Customer"
                                  to={`/admin/dashboard/customers/${customer.id}`}
                                >
                                  <i className="ri-eye-line text-black"></i>
                                </Link>

                                <Link
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete Customer"
                                  onClick={() => deleteCustomer(customer.id)}
                                >
                                  <i className="ri-delete-bin-line text-black"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))
                      : !loading && (
                          <p className="mt-3 text-center text-muted">
                            No customers found.
                          </p>
                        )}
                  </div>

                  {/* PAGINATION */}
                  {!loading && customers.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      lastPage={lastPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
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
