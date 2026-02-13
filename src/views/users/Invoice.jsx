import { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import GetInvoices from "../../controllers/GetInvoices";
import Pagination from "../../controllers/Pagination";
import formatDate from "../../utils/FormatDate";
import CompanySettings from "../../controllers/CompanySettingsController";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendInvoice } from "../../controllers/InvoiceActions";

export default function Invoice() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [invoices, setInvoices] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [companySettings, setCompanySettings] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const [actionLoading, setActionLoading] = useState({
    type: null,
    invoice_number: null,
  });

  // ✅ Fetch invoices safely
  const fetchInvoices = (page = 1, searchQuery = "") => {
    const safeSearch = (searchQuery ?? "").toString().trim();
    GetInvoices(setLoading, apiBase, setInvoices, page, safeSearch);
  };

  const viewInvoice = (invoice_number) => {
    navigate(`/user/dashboard/invoice/${invoice_number}`);
  };

  useEffect(() => {
    fetchInvoices(1, "");
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // ✅ SEARCH IN REAL TIME (debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchInvoices(1, search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleDownload = (invoice_number) => {
    setActionLoading({ type: "download", invoice_number });

    window.open(`${apiBase}/api/invoice/${invoice_number}/download`, "_blank");

    setTimeout(() => {
      setActionLoading({ type: null, invoice_number: null });
    }, 1000);
  };

  const handleResend = async (invoice_number) => {
    const prompt = await Swal.fire({
      icon: "question",
      title: "Send Invoice",
      text: "Do you want to send this invoice to the client?",
      showCancelButton: true,
      confirmButtonText: "Yes, send",
      cancelButtonText: "Cancel",
    });

    if (!prompt.isConfirmed) return;

    setActionLoading({ type: "send", invoice_number });

    const result = await sendInvoice(invoice_number, apiBase);

    setActionLoading({ type: null, invoice_number: null });

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: result.message,
    });
  };

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
                  <h3>Invoices</h3>
                  <p className="mb-2">Welcome to the Invoice management page</p>
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
                        placeholder="Search invoice number, customer, status..."
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

          {/* Invoice Table */}
          <div className="row">
            <div className="col-12">
              <div className="card transparent">
                <div className="card-body">
                  {loading ? (
                    <Spinner />
                  ) : invoices.data.length === 0 ? (
                    <p className="text-muted alert alert-info text-center">
                      No invoices found{" "}
                      {search.trim() !== "" && `for "${search}"`}
                    </p>
                  ) : (
                    <>
                      <div className="rtable rtable--6cols rtable--collapse">
                        {/* Table Header */}
                        <div className="rtable-row rtable-row--head bg-transparent">
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Invoice ID</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Customer Name</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Date</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Status</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Amount</strong>
                          </div>
                          <div className="rtable-cell column-heading text-dark">
                            <strong>Actions</strong>
                          </div>
                        </div>

                        {/* Table Rows */}
                        {invoices.data.map((invoice) => (
                          <div className="rtable-row" key={invoice.id}>
                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {invoice.invoice_number}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {invoice.customer?.name || "N/A"}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {invoice.invoice_date
                                  ? formatDate(invoice.invoice_date)
                                  : "N/A"}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                <span
                                  className={`badge ${
                                    invoice.status === "paid"
                                      ? "bg-success"
                                      : invoice.status === "pending"
                                        ? "bg-warning text-dark"
                                        : "bg-danger"
                                  }`}
                                >
                                  {(invoice.status || "unknown").toUpperCase()}
                                </span>
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content">
                                {companySettings.currency_symbol}
                                {Number(invoice.total || 0).toLocaleString()}
                              </div>
                            </div>

                            <div className="rtable-cell">
                              <div className="rtable-cell--content d-flex gap-2">
                                <button
                                  onClick={() =>
                                    viewInvoice(invoice.invoice_number)
                                  }
                                  className="btn btn-sm btn-primary"
                                >
                                  <i className="ri-eye-fill"></i>
                                </button>

                                <button
                                  title="Download this invoice"
                                  className="btn btn-sm btn-info"
                                  disabled={
                                    actionLoading.type === "download" &&
                                    actionLoading.invoice_number ===
                                      invoice.invoice_number
                                  }
                                  onClick={() =>
                                    handleDownload(invoice.invoice_number)
                                  }
                                >
                                  {actionLoading.type === "download" &&
                                  actionLoading.invoice_number ===
                                    invoice.invoice_number ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  ) : (
                                    <i className="ri-download-fill"></i>
                                  )}
                                </button>

                                <button
                                  title="Resend this invoice to client"
                                  className="btn btn-sm btn-warning"
                                  disabled={
                                    actionLoading.type === "send" &&
                                    actionLoading.invoice_number ===
                                      invoice.invoice_number
                                  }
                                  onClick={() =>
                                    handleResend(invoice.invoice_number)
                                  }
                                >
                                  {actionLoading.type === "send" &&
                                  actionLoading.invoice_number ===
                                    invoice.invoice_number ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  ) : (
                                    <i className="ri-mail-fill"></i>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <Pagination
                        currentPage={invoices.current_page}
                        lastPage={invoices.last_page}
                        onPageChange={(page) =>
                          fetchInvoices(page, search ?? "")
                        }
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
