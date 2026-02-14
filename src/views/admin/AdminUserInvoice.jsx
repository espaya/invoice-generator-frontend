import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import getSingleUser from "../../controllers/GetSingleUser";
import StatWidgetSkeleton from "../../components/StatWidgetSkeleton";
import formatDate from "../../utils/FormatDate";
import AdminViewUserSidebar from "../../components/admin/admin_view_user_sidebar";

export default function AdminUserInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    getSingleUser(setLoading, setErrors, apiBase, setSingleUser, id);
  }, [id]);

  const getStatusBadge = (status) => {
    if (status === "paid")
      return <span className="badge bg-success">Paid</span>;
    if (status === "pending")
      return <span className="badge bg-warning text-dark">Pending</span>;
    if (status === "overdue")
      return <span className="badge bg-danger">Overdue</span>;

    return <span className="badge bg-secondary">{status}</span>;
  };

  const handleInvoiceClick = (invoiceNumber) => {
    navigate(`/admin/dashboard/invoice/${invoiceNumber}`);
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
                  <h3>User Invoices</h3>
                  <p className="mb-2">View invoices created by this user</p>
                </div>
              </div>

              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Users </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">Invoices</a>
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
                    <div className="card-header">
                      <h4 className="card-title mb-0">Invoices</h4>
                    </div>

                    <div className="card-body">
                      {!singleUser?.invoices ||
                      singleUser.invoices.length === 0 ? (
                        <p className="text-muted mb-0">
                          This user has not created any invoices yet.
                        </p>
                      ) : (
                        <div className="rtable rtable--5cols rtable--collapse">
                          {/* HEADER */}
                          <div className="rtable-row rtable-row--head bg-transparent">
                            <div className="rtable-cell topic-cell column-heading text-dark">
                              <strong>Invoice No</strong>
                            </div>

                            <div className="rtable-cell category-cell column-heading text-dark">
                              <strong>Customer</strong>
                            </div>

                            <div className="rtable-cell ranking-cell column-heading text-dark">
                              <strong>Status</strong>
                            </div>

                            <div className="rtable-cell impression-cell column-heading text-dark">
                              <strong>Total</strong>
                            </div>

                            <div className="rtable-cell sales-cell column-heading text-dark">
                              <strong>Invoice Date</strong>
                            </div>

                            <div className="rtable-cell earning-cell column-heading text-dark">
                              <strong>Due Date</strong>
                            </div>
                          </div>

                          {/* ROWS */}
                          {singleUser.invoices.map((invoice) => (
                            <div
                              key={invoice.id}
                              className="rtable-row"
                              style={{
                                cursor: "pointer",
                                transition: "0.2s",
                              }}
                              onClick={() =>
                                handleInvoiceClick(invoice.invoice_number)
                              }
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f8f9fa")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "transparent")
                              }
                            >
                              {/* INVOICE NUMBER */}
                              <div className="rtable-cell topic-cell">
                                <div className="rtable-cell--content title-content d-flex align-items-center">
                                  <i className="ri-file-list-3-line fs-20 text-primary me-15"></i>

                                  <span className="topic-cell-span">
                                    {invoice.invoice_number}
                                  </span>
                                </div>
                              </div>

                              {/* CUSTOMER */}
                              <div className="rtable-cell category-cell">
                                <div className="rtable-cell--heading">
                                  Customer
                                </div>

                                <div className="rtable-cell--content date-content">
                                  {singleUser.customers?.find(
                                    (c) => c.id === invoice.customer_id,
                                  )?.name || "N/A"}
                                </div>
                              </div>

                              {/* STATUS */}
                              <div className="rtable-cell ranking-cell">
                                <div className="rtable-cell--heading">
                                  Status
                                </div>

                                <div className="rtable-cell--content access-link-content d-flex align-items-center">
                                  {getStatusBadge(invoice.status)}
                                </div>
                              </div>

                              {/* TOTAL */}
                              <div className="rtable-cell impression-cell">
                                <div className="rtable-cell--heading">
                                  Total
                                </div>

                                <div className="rtable-cell--content replay-link-content">
                                  ₵{invoice.total}
                                </div>
                              </div>

                              {/* INVOICE DATE */}
                              <div className="rtable-cell sales-cell">
                                <div className="rtable-cell--heading">
                                  Invoice Date
                                </div>

                                <div className="rtable-cell--content earning-content">
                                  {invoice.invoice_date
                                    ? formatDate(invoice.invoice_date)
                                    : "N/A"}
                                </div>
                              </div>

                              {/* DUE DATE */}
                              <div className="rtable-cell earning-cell">
                                <div className="rtable-cell--heading">
                                  Due Date
                                </div>

                                <div className="rtable-cell--content earning-content">
                                  {invoice.due_date
                                    ? formatDate(invoice.due_date)
                                    : "N/A"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <small className="text-muted d-block mt-3">
                        Showing {singleUser?.invoices?.length || 0} invoice(s)
                        created by this user.
                      </small>

                      <small className="text-muted d-block mt-1">
                        Click an invoice row to view details.
                      </small>
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
