import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useEffect, useState, useRef } from "react";
import CompanySettings from "../../controllers/CompanySettingsController";
import viewInvoice from "../../controllers/ViewInvoice";
import handlePrint from "../../utils/PrintPreview";
import formatDate from "../../utils/FormatDate";
import Spinner from "../../components/Spinner";
import InvoiceFooter from "../../components/InvoiceFooter";
import { PATHS } from "../../router";

export default function SingleInvoice() {
  const { invoice_number } = useParams();
  const apiBase = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [errors, setErrors] = useState({});
  const [companySettings, setCompanySettings] = useState({});
  const printRef = useRef();

  useEffect(() => {
    if (invoice_number) {
      viewInvoice(invoice_number, setLoading, setInvoice, setErrors, apiBase);
    }
  }, [invoice_number, apiBase]);

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, [apiBase]);

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />

        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>{invoice_number}</h3>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="breadcrumbs">
                    <Link to={PATHS.USER}>Home </Link>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <Link to={PATHS.INVOICE}>Invoice</Link>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">{invoice_number}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row d-flex justify-content-center align-items-center py-20">
                      <div className="col-xl-8">
                        <div
                          ref={printRef}
                          className="modal-content"
                          style={{
                            padding: "2rem",
                            maxWidth: "900px",
                            margin: "auto",
                          }}
                        >
                          {loading ? (
                            <Spinner />
                          ) : errors.general ? (
                            <div className="alert alert-danger">
                              {errors.general}
                            </div>
                          ) : !invoice ? (
                            <div className="alert alert-warning text-center">
                              No invoice data found.
                            </div>
                          ) : (
                            <>
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                  <h2>Invoice</h2>
                                  <p>
                                    Invoice ID:{" "}
                                    <strong>{invoice.invoice_number}</strong>{" "}
                                    <br />
                                    Invoice Date:{" "}
                                    {formatDate(invoice.invoice_date)} <br />
                                    Due Date: {formatDate(invoice.due_date)}
                                  </p>

                                  <p>
                                    Status:{" "}
                                    <span
                                      className={`badge ${invoice.status === "success" ? "bg-primary" : "bg-danger"}`}
                                    >
                                      {invoice.status?.toUpperCase()}
                                    </span>
                                  </p>
                                </div>

                                <div className="text-end">
                                  <img
                                    src="/images/logo.jpeg"
                                    alt="Company Logo"
                                    className="img-fluid mb-2"
                                    width="100"
                                  />

                                  <p className="mt-20">
                                    <strong>
                                      {companySettings?.company_name}
                                    </strong>{" "}
                                    <br />
                                    {companySettings?.company_address} <br />
                                    {companySettings?.company_email} <br />
                                    {companySettings?.company_phone}
                                  </p>
                                </div>
                              </div>

                              <hr />

                              <div className="mb-4">
                                <strong>Bill To:</strong>
                                <br />
                                {invoice.customer ? (
                                  <>
                                    {invoice.customer.name} (
                                    {invoice.customer.email})
                                    <br />
                                    {invoice.customer.address}
                                  </>
                                ) : (
                                  <span>No customer info</span>
                                )}
                              </div>

                              <table
                                className="table table-bordered mb-3"
                                style={{
                                  borderCollapse: "collapse",
                                  width: "100%",
                                }}
                              >
                                <thead>
                                  <tr>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      Description
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      Quantity
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      Unit Price
                                    </th>
                                    <th
                                      style={{
                                        border: "1px solid #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      Total
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {invoice.items?.length > 0 ? (
                                    invoice.items.map((item) => (
                                      <tr key={item.id}>
                                        <td
                                          style={{
                                            border: "1px solid #000",
                                            padding: "0.5rem",
                                          }}
                                        >
                                          {item.description}
                                        </td>

                                        <td
                                          style={{
                                            border: "1px solid #000",
                                            padding: "0.5rem",
                                            textAlign: "right",
                                          }}
                                        >
                                          {item.quantity}
                                        </td>

                                        <td
                                          style={{
                                            border: "1px solid #000",
                                            padding: "0.5rem",
                                            textAlign: "right",
                                          }}
                                        >
                                          {companySettings?.currency_symbol}
                                          {Number(item.unit_price).toFixed(2)}
                                        </td>

                                        <td
                                          style={{
                                            border: "1px solid #000",
                                            padding: "0.5rem",
                                            textAlign: "right",
                                          }}
                                        >
                                          {companySettings?.currency_symbol}
                                          {Number(item.total).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="4" className="text-center">
                                        No items found
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>

                              {invoice.notes && (
                                <div className="mb-3">
                                  <strong>Notes:</strong>
                                  <p>{invoice.notes}</p>
                                </div>
                              )}

                              <div
                                className="text-end"
                                style={{ marginTop: "1rem" }}
                              >
                                <p>
                                  Subtotal: {companySettings?.currency_symbol}
                                  {Number(invoice.subtotal || 0).toFixed(2)}
                                </p>

                                <p>
                                  Tax ({Number(invoice.tax_percent || 0) * 100}
                                  %): {companySettings?.currency_symbol}
                                  {(
                                    Number(invoice.total || 0) -
                                    Number(invoice.subtotal || 0)
                                  ).toFixed(2)}
                                </p>

                                <h4>
                                  Total: {companySettings?.currency_symbol}
                                  {Number(invoice.total || 0).toFixed(2)}
                                </h4>
                              </div>

                              <hr />

                              <div className="text-center mt-3">
                                <p>Thank you for your business!</p>
                              </div>

                              <InvoiceFooter
                                handlePrint={handlePrint}
                                printRef={printRef}
                                invoice={invoice}
                                apiBase={apiBase}
                                setLoading={setLoading}
                                setInvoice={setInvoice}
                                setErrors={setErrors}
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
          </div>
        </div>
      </div>
    </>
  );
}
