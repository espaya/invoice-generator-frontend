import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import Pagination from "../../controllers/Pagination";
import Cookies from "js-cookie";
import formatDate from "../../utils/FormatDate";
import CompanySettings from "../../controllers/CompanySettingsController";

export default function AdminInvoice() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [companySettings, setCompanySettings] = useState({});

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // fetch invoices
  const getInvoices = async (page = 1, searchQuery = "") => {
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${apiBase}/api/admin/invoices?page=${page}&search=${searchQuery}`,
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
        setErrors({ general: data.message || "Failed to fetch invoices" });
        setInvoices([]);
        return;
      }

      setInvoices(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // fetch when page/search changes
  useEffect(() => {
    getInvoices(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  // delete invoice
  const deleteInvoice = async (id) => {
    const result = await Swal.fire({
      title: "Delete Invoice",
      text: "Are you sure you want to delete this invoice?",
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

        const res = await fetch(`${apiBase}/admin/invoices/${id}`, {
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
            text: data.message || "Failed to delete invoice",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });

        getInvoices(currentPage, debouncedSearch);
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
                  <h3>Invoices</h3>
                  <p className="mb-2">Manage all invoices</p>
                </div>
              </div>

              <div className="col-auto">
                <div className="search">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search invoices..."
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
                        <strong>Invoice #</strong>
                      </div>

                      <div className="rtable-cell category-cell column-heading text-dark">
                        <strong>Author</strong>
                      </div>

                      <div className="rtable-cell ranking-cell column-heading text-dark">
                        <strong>Amount</strong>
                      </div>

                      <div className="rtable-cell impression-cell column-heading text-dark">
                        <strong>Status</strong>
                      </div>

                      <div className="rtable-cell sales-cell column-heading text-dark">
                        <strong>Date</strong>
                      </div>

                      <div className="rtable-cell earning-cell column-heading text-dark">
                        <strong>Actions</strong>
                      </div>
                    </div>

                    {/* LOADING SKELETON */}
                    {loading &&
                      [...Array(5)].map((_, i) => (
                        <div className="rtable-row" key={i}>
                          <div className="rtable-cell topic-cell">
                            <span className="placeholder col-8"></span>
                          </div>
                          <div className="rtable-cell category-cell">
                            <span className="placeholder col-10"></span>
                          </div>
                          <div className="rtable-cell ranking-cell">
                            <span className="placeholder col-6"></span>
                          </div>
                          <div className="rtable-cell impression-cell">
                            <span className="placeholder col-6"></span>
                          </div>
                          <div className="rtable-cell sales-cell">
                            <span className="placeholder col-6"></span>
                          </div>
                          <div className="rtable-cell earning-cell">
                            <span className="placeholder col-4"></span>
                          </div>
                        </div>
                      ))}

                    {/* INVOICE ROWS */}
                    {!loading && invoices.length > 0
                      ? invoices.map((invoice) => (
                          <div className="rtable-row" key={invoice.id}>
                            <div className="rtable-cell topic-cell">
                              <div className="rtable-cell--content title-content">
                                #{invoice.invoice_number || invoice.id}
                              </div>
                            </div>

                            <div className="rtable-cell category-cell">
                              <div className="rtable-cell--heading">User</div>
                              <div className="rtable-cell--content date-content">
                                {invoice.user.name || "N/A"}
                              </div>
                            </div>

                            <div className="rtable-cell ranking-cell">
                              <div className="rtable-cell--heading">Amount</div>
                              <div className="rtable-cell--content">
                                {companySettings.currency_symbol}
                                {invoice.total}
                              </div>
                            </div>

                            <div className="rtable-cell impression-cell">
                              <div className="rtable-cell--heading">Status</div>
                              <div className="rtable-cell--content">
                                <span
                                  className={`badge ${
                                    invoice.status === "paid"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  {invoice.status.toUpperCase()}
                                </span>
                              </div>
                            </div>

                            <div className="rtable-cell sales-cell">
                              <div className="rtable-cell--heading">Date</div>
                              <div className="rtable-cell--content">
                                {formatDate(invoice.created_at)}
                              </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="rtable-cell earning-cell">
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  title="View Invoice"
                                  onClick={() =>
                                    Swal.fire(
                                      "View",
                                      `Invoice ID: ${invoice.id}`,
                                      "info",
                                    )
                                  }
                                >
                                  <i className="ri-eye-line"></i>
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-warning"
                                  title="Edit Invoice"
                                  onClick={() =>
                                    Swal.fire(
                                      "Edit",
                                      `Edit Invoice ID: ${invoice.id}`,
                                      "info",
                                    )
                                  }
                                >
                                  <i className="ri-edit-2-line"></i>
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete Invoice"
                                  onClick={() => deleteInvoice(invoice.id)}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      : !loading && (
                          <p className="mt-3 text-center text-muted">
                            No invoices found.
                          </p>
                        )}
                  </div>

                  {/* PAGINATION */}
                  {!loading && invoices.length > 0 && (
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
