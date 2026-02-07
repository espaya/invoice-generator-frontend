import formatDate from "../utils/FormatDate";
import { useRef } from "react";

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

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // restore React
  };

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
                  <p>Invoice ID: AUTO-GENERATED</p>
                  <p>Invoice Date: {formatDate(invoiceDate)}</p>
                  <p>DueDate: {formatDate(dueDate)}</p>
                  <p>Status: <span className="badge bg-primary">{status.toUpperCase()}</span></p>
                </div>
                <div className="text-end">
                  <h4>Company Name</h4>
                  <p>company@example.com</p>
                  <p>Company Address Line</p>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <strong>Bill To:</strong>
                <p>
                  {selectedCustomer
                    ? `${selectedCustomer.name} (${selectedCustomer.email})`
                    : `${newCustomer.name} (${newCustomer.email})`}
                </p>
                {selectedCustomer?.address || newCustomer.address ? (
                  <p>
                    {selectedCustomer
                      ? selectedCustomer.address
                      : newCustomer.address}
                  </p>
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
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "0.5rem",
                          textAlign: "right",
                        }}
                      >
                        ${(item.quantity * item.unitPrice).toFixed(2)}
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
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>
                  Tax ({taxPercent}%): ${taxAmount.toFixed(2)}
                </p>
                <h4>Total: ${totalAmount.toFixed(2)}</h4>
              </div>

              <hr />

              <div className="text-center mt-3">
                <p>Thank you for your business!</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handlePrint}
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
