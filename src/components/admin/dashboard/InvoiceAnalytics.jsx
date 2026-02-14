import { useEffect, useState } from "react";
import formatDate from "../../../utils/FormatDate";
import CompanySettings from "../../../controllers/CompanySettingsController";
import StatWidgetSkeleton from "../../StatWidgetSkeleton";

export default function InvoiceAnalytics() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [companySettings, setCompanySettings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${apiBase}/api/admin/invoices/recent`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setInvoices(data.invoices || []);
        }
      } catch (err) {
        console.error("Fetch invoices error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [apiBase]);

  const getStatusBadge = (status) => {
    if (!status) return <span className="badge bg-secondary">Unknown</span>;

    if (status === "paid")
      return <span className="badge bg-success">Paid</span>;

    if (status === "pending")
      return <span className="badge bg-warning text-dark">Pending</span>;

    if (status === "overdue")
      return <span className="badge bg-danger">Overdue</span>;

    return <span className="badge bg-secondary">{status}</span>;
  };

  return (
    <div className="col-xl-8 col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Invoice Analytics</h4>
        </div>

        <div className="card-body">
          {loading ? (
            <StatWidgetSkeleton />
          ) : invoices.length === 0 ? (
            <p className="text-muted">No invoices found.</p>
          ) : (
            <div className="rtable rtable--5cols rtable--collapse">
              <div className="rtable-row rtable-row--head bg-transparent">
                <div className="rtable-cell topic-cell column-heading text-dark">
                  <strong>Invoice</strong>
                </div>

                <div className="rtable-cell traffic-cell column-heading text-dark">
                  <strong>Total</strong>
                </div>

                <div className="rtable-cell source-cell column-heading text-dark">
                  <strong>Customer</strong>
                </div>

                <div className="rtable-cell referrals-cell column-heading text-dark">
                  <strong>Status</strong>
                </div>

                <div className="rtable-cell trend-cell column-heading text-dark">
                  <strong>Date</strong>
                </div>
              </div>

              {invoices.map((invoice) => (
                <div className="rtable-row" key={invoice.id}>
                  {/* INVOICE */}
                  <div className="rtable-cell topic-cell">
                    <div className="rtable-cell--content title-content d-flex align-items-center">
                      <i className="ri-file-list-3-line fs-20 text-primary me-15"></i>

                      <div className="topic-cell-span">
                        <h5 className="mb-0">
                          {invoice.invoice_number || "N/A"}
                        </h5>

                        <small className="text-muted d-block">
                          Due:{" "}
                          {invoice.due_date
                            ? formatDate(invoice.due_date)
                            : "N/A"}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="rtable-cell traffic-cell">
                    <div className="rtable-cell--heading">Total</div>
                    <div className="rtable-cell--content date-content">
                      {companySettings.currency_symbol}
                      {invoice.total}
                    </div>
                  </div>

                  {/* CUSTOMER */}
                  <div className="rtable-cell source-cell">
                    <div className="rtable-cell--heading">Customer</div>
                    <div className="rtable-cell--content access-link-content d-flex align-items-center">
                      {invoice.customer?.name || "No customer"}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="rtable-cell referrals-cell">
                    <div className="rtable-cell--heading">Status</div>
                    <div className="rtable-cell--content replay-link-content">
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="rtable-cell trend-cell">
                    <div className="rtable-cell--heading">Date</div>
                    <div className="rtable-cell--content replay-link-content">
                      {invoice.invoice_date
                        ? formatDate(invoice.invoice_date)
                        : "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <small className="text-muted d-block mt-3">
            Showing your latest 5 invoices.
          </small>
        </div>
      </div>
    </div>
  );
}
