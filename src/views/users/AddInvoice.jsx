import { useState, useEffect } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import InvoicePreview from "../../components/InvoicePreview";
import CompanySettings from "../../controllers/CompanySettingsController";

export default function AddInvoice() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  // Customers
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Invoice items
  const [items, setItems] = useState([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [taxPercent, setTaxPercent] = useState(0);

  // UI state
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [notes, setNotes] = useState("");

  const [invoiceDate, setInvoiceDate] = useState(""); // new state
  const [dueDate, setDueDate] = useState(""); // new state
  const [status, setStatus] = useState("pending"); // default status

  const [companySettings, setCompanySettings] = useState([]); // for potential future use

  // Fetch company settings on mount (for potential future use)
  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // Fetch customers
  useEffect(() => {
    fetch(`${apiBase}/api/customers`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, []);

  // Item handlers
  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));
  const handleItemChange = (idx, field, value) => {
    const newItems = [...items];
    newItems[idx][field] = field === "description" ? value : parseFloat(value);
    setItems(newItems);
  };

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0,
  );
  const taxAmount = (subtotal * taxPercent) / 100;
  const totalAmount = subtotal + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
        method: "GET",
      });

      const response = await fetch(`${apiBase}/api/invoices/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
        credentials: "include",
        body: JSON.stringify({
          customer_id: selectedCustomer?.id || null,
          new_customer: selectedCustomer ? null : newCustomer,
          invoice_date: invoiceDate,
          due_date: dueDate,
          status: status,
          items: items.map((item) => ({
            description: item.description,
            quantity: parseFloat(item.quantity),
            unit_price: parseFloat(item.unitPrice),
            total: parseFloat((item.quantity * item.unitPrice).toFixed(2)),
          })),
          tax_percent: taxPercent,
          notes: notes,
          total: totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: data.message,
        });
        setErrors(data.errors || {});
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Invoice Created!",
        text: data.message || "Saved successfully.",
      });

      // Reset form
      setSelectedCustomer(null);
      setNewCustomer({ name: "", email: "", address: "", phone: "" });
      setInvoiceDate("");
      setDueDate("");
      setStatus("pending");
      setItems([{ description: "", quantity: 1, unitPrice: 0 }]);
      setTaxPercent(0);
      setNotes("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Creating Invoice",
        text: err.message || "Unexpected error.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Conditional flags
  const isExistingCustomerSelected = !!selectedCustomer;
  const isNewCustomerFilled =
    newCustomer.name ||
    newCustomer.email ||
    newCustomer.address ||
    newCustomer.phone;

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title mb-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <h3>Add Corporate Invoice</h3>
                  <p>Create a new invoice for an existing or new customer</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {/* Customer Section */}
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <h6>Bill To:</h6>
                          <select
                            className="form-select mb-2"
                            value={selectedCustomer?.id || ""}
                            onChange={(e) => {
                              const cust = customers.find(
                                (c) => c.id === parseInt(e.target.value),
                              );
                              setSelectedCustomer(cust || null);
                            }}
                            disabled={isNewCustomerFilled}
                          >
                            <option value="">
                              -- Select Existing Customer --
                            </option>
                            {Array.isArray(customers) &&
                              customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.name} ({c.email})
                                </option>
                              ))}
                          </select>
                          {errors.customer_id && (
                            <div className="text-danger mb-2">
                              {errors.customer_id[0]}
                            </div>
                          )}

                          <p className="text-muted mb-2">
                            Or add a new customer:
                          </p>
                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Name"
                            value={newCustomer.name}
                            onChange={(e) =>
                              setNewCustomer({
                                ...newCustomer,
                                name: e.target.value,
                              })
                            }
                            disabled={isExistingCustomerSelected}
                          />
                          {errors.name && (
                            <div className="text-danger mb-2">
                              {errors.name[0]}
                            </div>
                          )}

                          <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={newCustomer.email}
                            onChange={(e) =>
                              setNewCustomer({
                                ...newCustomer,
                                email: e.target.value,
                              })
                            }
                            disabled={isExistingCustomerSelected}
                          />
                          {errors.email && (
                            <div className="text-danger mb-2">
                              {errors.email[0]}
                            </div>
                          )}

                          <textarea
                            className="form-control mb-2"
                            rows={3}
                            placeholder="Address"
                            value={newCustomer.address}
                            onChange={(e) =>
                              setNewCustomer({
                                ...newCustomer,
                                address: e.target.value,
                              })
                            }
                            disabled={isExistingCustomerSelected}
                          ></textarea>
                          {errors.address && (
                            <div className="text-danger mb-2">
                              {errors.address[0]}
                            </div>
                          )}

                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Phone"
                            value={newCustomer.phone}
                            onChange={(e) =>
                              setNewCustomer({
                                ...newCustomer,
                                phone: e.target.value,
                              })
                            }
                            disabled={isExistingCustomerSelected}
                          />
                          {errors.phone && (
                            <div className="text-danger mb-2">
                              {errors.phone[0]}
                            </div>
                          )}
                        </div>

                        {/* Company Info */}
                        <div className="col-md-6 text-end">
                          <img
                            src="/images/logo.png"
                            alt="Company Logo"
                            className="img-fluid mb-2"
                            width="100"
                          />
                          <p className="mt-10">
                            <strong>{companySettings?.company_name}</strong>
                            <br />
                            {companySettings?.company_address} <br />
                            {companySettings?.company_email} <br />
                            {companySettings?.company_phone}
                          </p>
                          <p>
                            <b>TIN:</b> {companySettings?.tin}
                          </p>
                        </div>
                      </div>

                      {/* Invoice Details */}
                      <div className="row mb-4 mt-50">
                        <div className="col-md-3">
                          <label>Invoice ID</label>
                          {/* Invoice Date */}
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value="Auto-Generated"
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Invoice Date</label>
                          {/* Due Date */}
                          <input
                            type="date"
                            className="form-control"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                          />
                          {errors.invoice_date && (
                            <small className="text-danger">
                              {errors.invoice_date[0]}
                            </small>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label>Due Date</label>
                          <input
                            onChange={(e) => setDueDate(e.target.value)}
                            type="date"
                            className="form-control"
                            value={dueDate}
                          />
                          {errors.due_date && (
                            <small className="text-danger">
                              {errors.due_date}
                            </small>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label>Status</label>
                          <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                          </select>
                        </div>
                      </div>

                      {/* Items Table */}
                      <div className="table-responsive mb-4">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit Price</th>
                              <th>Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, idx) => (
                              <tr key={idx}>
                                <td>
                                  <input
                                    type="text"
                                    className={`form-control ${errors[`items.${idx}.description`] ? "is-invalid" : ""}`}
                                    value={item.description}
                                    onChange={(e) =>
                                      handleItemChange(
                                        idx,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                  />
                                  {errors[`items.${idx}.description`] && (
                                    <div className="invalid-feedback">
                                      {errors[`items.${idx}.description`][0]}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    step="0.01"
                                    className={`form-control ${errors[`items.${idx}.quantity`] ? "is-invalid" : ""}`}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleItemChange(
                                        idx,
                                        "quantity",
                                        e.target.value,
                                      )
                                    }
                                    min={0}
                                  />
                                  {errors[`items.${idx}.quantity`] && (
                                    <div className="invalid-feedback">
                                      {errors[`items.${idx}.quantity`][0]}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    step="0.01"
                                    className={`form-control ${errors[`items.${idx}.unit_price`] ? "is-invalid" : ""}`}
                                    value={item.unitPrice}
                                    onChange={(e) =>
                                      handleItemChange(
                                        idx,
                                        "unitPrice",
                                        e.target.value,
                                      )
                                    }
                                    min={0}
                                  />
                                  {errors[`items.${idx}.unit_price`] && (
                                    <div className="invalid-feedback">
                                      {errors[`items.${idx}.unit_price`][0]}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {companySettings?.currency_symbol}{(item.quantity * item.unitPrice).toFixed(2)}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeItem(idx)}
                                  >
                                    <i className="ri-close-line fs-18 text-white"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary mt-2"
                          onClick={addItem}
                        >
                          + Add Item
                        </button>
                        {errors.items && typeof errors.items === "string" && (
                          <div className="text-danger mt-2">{errors.items}</div>
                        )}
                      </div>

                      {/* Notes */}
                      <div className="mb-4 mt-20">
                        <label>Notes (optional)</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Enter any notes for this invoice"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                      </div>

                      {/* Tax */}
                      <div className="row mb-4 mt-20">
                        <div className="col-md-3 ms-auto text-end">
                          <label>Tax % (optional)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control text-end"
                            value={taxPercent}
                            onChange={(e) =>
                              setTaxPercent(parseFloat(e.target.value))
                            }
                            min={0}
                          />
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="text-end mb-4 mt-20">
                        <div>
                          Subtotal: {companySettings?.currency_symbol}
                          {subtotal.toFixed(2)}
                        </div>
                        <div>
                          Tax ({taxPercent}%):
                          {companySettings?.currency_symbol}
                          {taxAmount.toFixed(2)}
                        </div>
                        <div>
                          <strong>
                            Total: {companySettings?.currency_symbol}
                            {totalAmount.toFixed(2)}
                          </strong>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => setShowPreview(true)}
                        >
                          <i className="ri-eye-fill"></i> Preview
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? (
                            "Saving..."
                          ) : (
                            <>
                              <i className="ri-save-3-fill"></i> Save & Send
                            </>
                          )}
                        </button>

                        <button type="button" className="btn btn-secondary">
                          <i className="ri-save-3-line"></i> Save as Draft
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
              <InvoicePreview
                setShowPreview={setShowPreview}
                selectedCustomer={selectedCustomer}
                newCustomer={newCustomer}
                items={items}
                notes={notes}
                subtotal={subtotal}
                taxPercent={taxPercent}
                totalAmount={totalAmount}
                taxAmount={taxAmount}
                dueDate={dueDate}
                invoiceDate={invoiceDate}
                status={status}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
