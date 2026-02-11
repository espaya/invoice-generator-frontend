import CompanySettings from "../controllers/CompanySettingsController";
import formatDate from "../utils/FormatDate";
import { useEffect, useRef, useState } from "react";
import handlePrint from "../utils/PrintPreview";

export default function InvoicePreview({
  setShowPreview,
  selectedCustomer,
  newCustomer,
  items,
  notes,
  subtotal,
  taxPercent,
  totalAmount,
  taxAmount,
  dueDate,
  invoiceDate,
  status,
}) {
  const printRef = useRef();
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [companySettings, setCompanySettings] = useState([]);


  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  return (
    <>
      <div className="modal-content print-area" ref={printRef}>
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2>Invoice</h2>
                  <p>
                    Invoice ID: AUTO-GENERATED <br />
                    Invoice Date: {formatDate(invoiceDate)} <br />
                    DueDate: {formatDate(dueDate)}
                  </p>
                  <p>
                    Status:{" "}
                    <span className="badge bg-primary">
                      {status.toUpperCase()}
                    </span>
                  </p>
                </div>
                <div className="text-end">
                  <img
                    src="/images/logo.png"
                    alt="Company Logo"
                    className="img-fluid mb-2"
                    width="100"
                  />
                  <p className="mt-20">
                    <strong>{companySettings?.company_name}</strong> <br />
                    {companySettings?.company_address} <br />
                    {companySettings?.company_email} <br />
                    {companySettings?.company_phone}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <strong>Bill To:</strong><br/>
                <>
                  {selectedCustomer
                    ? `${selectedCustomer.name} (${selectedCustomer.email})`
                    : `${newCustomer.name} (${newCustomer.email})`}
                </>
                <br/>
                {selectedCustomer?.address || newCustomer.address ? (
                  <>
                    {selectedCustomer
                      ? selectedCustomer.address
                      : newCustomer.address}
                  </>
                ) : null}
              </div>

              <table
                className="table table-bordered mb-3"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                      Description
                    </th>
                    <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                      Quantity
                    </th>
                    <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                      Unit Price
                    </th>
                    <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
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
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "0.5rem",
                          textAlign: "right",
                        }}
                      >
                        {companySettings?.currency_symbol}
                        {(item.quantity * item.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {notes && (
                <div className="mb-3">
                  <strong>Notes:</strong>
                  <p>{notes}</p>
                </div>
              )}

              <div className="text-end" style={{ marginTop: "1rem" }}>
                <p>
                  Subtotal: {companySettings?.currency_symbol}
                  {subtotal.toFixed(2)}
                </p>
                <p>
                  Tax ({taxPercent}%): {companySettings?.currency_symbol}
                  {taxAmount.toFixed(2)}
                </p>
                <h4>
                  Total: {companySettings?.currency_symbol}
                  {totalAmount.toFixed(2)}
                </h4>
              </div>

              <hr />

              <div className="text-center mt-3">
                <p>Thank you for your business!</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handlePrint(printRef)}
                >
                  Print Invoice
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
