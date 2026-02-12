import { useState } from "react";
import Swal from "sweetalert2";
import { downloadInvoicePdf } from "../controllers/InvoiceActions";

import {
  sendInvoice,
  markInvoicePaid,
  duplicateInvoice,
  voidInvoice,
  deleteInvoice,
} from "../controllers/InvoiceActions";

import viewInvoice from "../controllers/ViewInvoice";
import { Link } from "react-router-dom";

export default function InvoiceFooter({
  handlePrint,
  printRef,
  invoice,
  apiBase,
  setLoading,
  setInvoice,
  setErrors,
}) {
  const [actionLoading, setActionLoading] = useState(false);

  const refreshInvoice = () => {
    viewInvoice(
      invoice.invoice_number,
      setLoading,
      setInvoice,
      setErrors,
      apiBase,
    );
  };

  const handleAction = async (actionFn, successCallback = null) => {
    setActionLoading(true);

    const result = await actionFn();

    setActionLoading(false);

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

    if (successCallback) successCallback();
  };

  const confirmAction = async (title, text, confirmText = "Yes") => {
    return await Swal.fire({
      icon: "question",
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: "Cancel",
    });
  };

  // ---------------- ACTIONS ----------------

  const handleSendInvoice = async () => {
    const prompt = await confirmAction(
      "Send Invoice",
      "Do you want to send this invoice to the client?",
      "Yes, send",
    );

    if (!prompt.isConfirmed) return;

    handleAction(() => sendInvoice(invoice.invoice_number, apiBase));
  };

  const handleMarkPaid = async () => {
    const prompt = await Swal.fire({
      icon: "warning",
      title: "Record Payment",
      text: "Are you sure you want to mark this invoice as PAID?",
      showCancelButton: true,
      confirmButtonText: "Yes, mark paid",
      cancelButtonText: "Cancel",
    });

    if (!prompt.isConfirmed) return;

    handleAction(
      () => markInvoicePaid(invoice.invoice_number, apiBase),
      refreshInvoice,
    );
  };

  const handleDuplicate = async () => {
    const prompt = await confirmAction(
      "Duplicate Invoice",
      "Do you want to duplicate this invoice?",
      "Yes, duplicate",
    );

    if (!prompt.isConfirmed) return;

    handleAction(() => duplicateInvoice(invoice.invoice_number, apiBase));
  };

  const handleVoidInvoice = async () => {
    const prompt = await Swal.fire({
      icon: "warning",
      title: "Cancel Invoice",
      text: "This will cancel the invoice. Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "Cancel",
    });

    if (!prompt.isConfirmed) return;

    handleAction(
      () => voidInvoice(invoice.invoice_number, apiBase),
      refreshInvoice,
    );
  };

  const handleDeleteInvoice = async () => {
    const prompt = await Swal.fire({
      icon: "error",
      title: "Delete Invoice",
      text: "This action cannot be undone. Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!prompt.isConfirmed) return;

    handleAction(() => deleteInvoice(invoice.invoice_number, apiBase));
  };

  const handleDownloadPdf = async () => {
    Swal.fire({
      icon: "info",
      title: "Coming Soon",
      text: "PDF download will be enabled once backend PDF generation is ready.",
    });
  };

  return (
    <div className="modal-footer print-hide d-flex justify-content-between flex-wrap gap-2">
      {/* Left Actions */}
      <div className="d-flex gap-2 flex-wrap">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handlePrint(printRef)}
          disabled={actionLoading}
        >
          <i className="ri-printer-fill"></i> Print
        </button>

        <button
          type="button"
          className="btn btn-dark"
          disabled={actionLoading}
          onClick={() => downloadInvoicePdf(invoice.invoice_number, apiBase)}
        >
          <i className="ri-file-download-fill"></i> Download PDF
        </button>

        <button
          type="button"
          className="btn btn-info"
          onClick={handleSendInvoice}
          disabled={actionLoading}
        >
          <i className="ri-mail-send-fill"></i>{" "}
          {invoice?.status === "sent" ? "Resend Invoice" : "Send Invoice"}
        </button>
      </div>

      {/* Right Actions */}
      <div className="d-flex gap-2 flex-wrap">
        <button
          type="button"
          className="btn btn-primary"
          disabled={invoice?.status === "paid" || actionLoading}
          onClick={handleMarkPaid}
        >
          <i className="ri-money-dollar-circle-fill"></i>{" "}
          {invoice?.status === "paid" ? "Paid" : "Record Payment"}
        </button>

        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            disabled={actionLoading}
          >
            <i className="ri-more-2-fill"></i> More
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link to={`/user/dashboard/invoice/edit/${invoice.invoice_number}`} className="dropdown-item">
                <i className="ri-edit-box-fill"></i> Edit Invoice
              </Link>
            </li>

            <li>
              <button className="dropdown-item" onClick={handleDuplicate}>
                <i className="ri-file-copy-fill"></i> Duplicate Invoice
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
                disabled={invoice?.status === "paid"}
                onClick={handleVoidInvoice}
              >
                <i className="ri-forbid-2-fill"></i> Void / Cancel Invoice
              </button>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleDeleteInvoice}
              >
                <i className="ri-delete-bin-fill"></i> Delete Invoice
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
