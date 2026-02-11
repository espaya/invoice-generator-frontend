import { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import GetInvoices from "../../controllers/GetInvoices";
import Pagination from "../../controllers/Pagination";
import formatDate from "../../utils/FormatDate";
import CompanySettings from "../../controllers/CompanySettingsController";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Invoice() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [invoices, setInvoices] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [companySettings, setCompanySettings] = useState([]);
  const navigate = useNavigate();

  // Fetch invoices
  const fetchInvoices = (page = 1) => {
    GetInvoices(setLoading, apiBase, setInvoices, page);
  };

  const viewInvoice = (invoice_number) => {
    navigate(`/user/dashboard/invoice/${invoice_number}`);
  };

  useEffect(() => {
    fetchInvoices();
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  return (
    <>
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
                    <p className="mb-2">
                      Welcome to the Invoice management page
                    </p>
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
                      <p>No invoices found.</p>
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
                                  {invoice.customer?.name}
                                </div>
                              </div>
                              <div className="rtable-cell">
                                <div className="rtable-cell--content">
                                  {formatDate(invoice.invoice_date)}
                                </div>
                              </div>
                              <div className="rtable-cell">
                                <div className="rtable-cell--content">
                                  <span
                                    className={`badge ${
                                      invoice.status === "paid"
                                        ? "bg-success"
                                        : invoice.status === "pending"
                                          ? "bg-warning"
                                          : "bg-danger"
                                    }`}
                                  >
                                    {invoice.status.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="rtable-cell">
                                <div className="rtable-cell--content">
                                  {companySettings.currency_symbol}
                                  {Number(invoice.total).toLocaleString()}
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
                                  <button className="btn btn-sm btn-info">
                                    <i className="ri-download-fill"></i>
                                  </button>
                                  <button className="btn btn-sm btn-warning">
                                    <i className="ri-mail-fill"></i>
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
                          onPageChange={fetchInvoices}
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
    </>
  );
}
