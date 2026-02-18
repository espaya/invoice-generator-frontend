import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/admin_sidebar";
import AdminCustomerSidebar from "../../components/admin/customer/AdminCustomerSidebar";
import Header from "../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Pagination from "../../controllers/Pagination";
import TableSkeleton from "../../components/TableSkeleton";
import formatDate from "../../utils/FormatDate";
import CompanySettings from "../../controllers/CompanySettingsController";

export default function AdminSingleCustomerInvoice() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [companySettings, setCompanySettings] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const navigate = useNavigate();

  const getSingleCustomerInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/get-customer/${id}`, {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
        return;
      }

      setInvoices(data.invoices || []);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCustomerInvoices();
  }, []);

  const lastPage = Math.ceil(invoices.length / perPage);

  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
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
                    <h3>Invoice</h3>
                    <p className="mb-2">Customer invoices list</p>
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
                      <div className="card-header">
                        <h4 className="card-title">Invoices</h4>
                      </div>

                      <div className="card-body">
                        {errors.general && (
                          <p className="alert alert-danger">{errors.general}</p>
                        )}

                        {loading ? (
                          <TableSkeleton />
                        ) : (
                          <>
                            <div className="rtable rtable--5cols rtable--collapse">
                              <div className="rtable-row rtable-row--head bg-transparent">
                                <div className="rtable-cell topic-cell column-heading text-dark">
                                  <strong>Invoice No</strong>
                                </div>
                                <div className="rtable-cell category-cell column-heading text-dark">
                                  <strong>Status</strong>
                                </div>
                                <div className="rtable-cell ranking-cell column-heading text-dark">
                                  <strong>Invoice Date</strong>
                                </div>
                                <div className="rtable-cell impression-cell column-heading text-dark">
                                  <strong>Due Date</strong>
                                </div>
                                <div className="rtable-cell sales-cell column-heading text-dark">
                                  <strong>Subtotal</strong>
                                </div>
                                <div className="rtable-cell earning-cell column-heading text-dark">
                                  <strong>Total</strong>
                                </div>
                              </div>

                              {paginatedInvoices.length > 0 ? (
                                paginatedInvoices.map((invoice) => (
                                  <div
                                    className="rtable-row"
                                    key={invoice.id}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      navigate(
                                        `/admin/dashboard/invoice/${invoice.invoice_number}`,
                                      )
                                    }
                                  >
                                    <div className="rtable-cell topic-cell">
                                      <div className="rtable-cell--content title-content d-flex align-items-center">
                                        <span className="topic-cell-span">
                                          {invoice.invoice_number}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="rtable-cell category-cell">
                                      <div className="rtable-cell--heading">
                                        Status
                                      </div>
                                      <div
                                        className={`rtable-cell--content date-content px-2 py-1 rounded text-white`}
                                      >
                                        <span
                                          className={`px-2 py-1 rounded text-white ${
                                            invoice.status === "paid"
                                              ? "bg-success"
                                              : invoice.status === "pending"
                                                ? "bg-warning text-dark"
                                                : invoice.status === "overdue"
                                                  ? "bg-danger"
                                                  : "bg-secondary"
                                          }`}
                                        >
                                          {invoice.status.toUpperCase()}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="rtable-cell ranking-cell">
                                      <div className="rtable-cell--heading">
                                        Invoice Date
                                      </div>
                                      <div className="rtable-cell--content access-link-content">
                                        {formatDate(invoice.invoice_date)}
                                      </div>
                                    </div>

                                    <div className="rtable-cell impression-cell">
                                      <div className="rtable-cell--heading">
                                        Due Date
                                      </div>
                                      <div className="rtable-cell--content replay-link-content">
                                        {formatDate(invoice.due_date)}
                                      </div>
                                    </div>

                                    <div className="rtable-cell sales-cell">
                                      <div className="rtable-cell--heading">
                                        Subtotal
                                      </div>
                                      <div className="rtable-cell--content earning-content">
                                        {companySettings.currency_symbol}
                                        {invoice.subtotal}
                                      </div>
                                    </div>

                                    <div className="rtable-cell earning-cell">
                                      <div className="rtable-cell--heading">
                                        Total
                                      </div>
                                      <div className="rtable-cell--content earning-content">
                                        {companySettings.currency_symbol}
                                        {invoice.total}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-center mt-3">
                                  No invoices found.
                                </p>
                              )}
                            </div>

                            {invoices.length > perPage && (
                              <Pagination
                                currentPage={currentPage}
                                lastPage={lastPage}
                                onPageChange={(page) => setCurrentPage(page)}
                              />
                            )}
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
      </div>
    </>
  );
}
