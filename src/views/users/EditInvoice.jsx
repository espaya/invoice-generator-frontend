import { useState, useEffect } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import InvoicePreview from "../../components/InvoicePreview";
import CompanySettings from "../../controllers/CompanySettingsController";
import { useParams } from "react-router-dom";
import viewInvoice from "../../controllers/ViewInvoice";

export default function EditInvoice() {
  const apiBase = import.meta.env.VITE_API_URL;
  const { invoice_number } = useParams();

  const [errors, setErrors] = useState({});
  const [invoice, setInvoice] = useState(null);

  // Customers
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [useNewCustomer, setUseNewCustomer] = useState(false);
  const [previousCustomer, setPreviousCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Invoice items
  const [items, setItems] = useState([
    { id: null, description: "", quantity: 1, unitPrice: 0 },
  ]);

  const [taxPercent, setTaxPercent] = useState(0);

  // UI state
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [notes, setNotes] = useState("");

  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  const [companySettings, setCompanySettings] = useState({});

  // Fetch company settings
  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, [apiBase]);

  // Fetch invoice data
  useEffect(() => {
    if (!invoice_number) return;

    viewInvoice(
      invoice_number,
      setLoading,
      (data) => {
        setInvoice(data);

        setInvoiceDate(data.invoice_date || "");
        setDueDate(data.due_date || "");
        setStatus(data.status || "pending");
        setNotes(data.notes || "");

        setTaxPercent(Number(data.tax_percent || 0) * 100);

        // items
        if (Array.isArray(data.items)) {
          setItems(
            data.items.map((item) => ({
              id: item.id,
              description: item.description,
              quantity: Number(item.quantity),
              unitPrice: Number(item.unit_price),
            })),
          );
        }

        // selected customer
        if (data.customer) {
          setSelectedCustomer(data.customer);
          setPreviousCustomer(data.customer);
          setUseNewCustomer(false);
        }

        // clear new customer
        setNewCustomer({
          name: "",
          email: "",
          address: "",
          phone: "",
        });
      },
      setErrors,
      apiBase,
    );
  }, [invoice_number, apiBase]);

  // Fetch customers list
  useEffect(() => {
    fetch(`${apiBase}/api/customers`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, [apiBase]);

  // Ensure selectedCustomer matches dropdown list
  useEffect(() => {
    if (!invoice?.customer || customers.length === 0) return;

    const found = customers.find((c) => c.id === invoice.customer.id);

    if (found) {
      setSelectedCustomer(found);
    }
  }, [customers, invoice]);

  // Item handlers
  const addItem = () =>
    setItems([
      ...items,
      { id: null, description: "", quantity: 1, unitPrice: 0 },
    ]);

  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const handleItemChange = (idx, field, value) => {
    const newItems = [...items];

    if (field === "description") {
      newItems[idx][field] = value;
    } else {
      newItems[idx][field] = parseFloat(value) || 0;
    }

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

      const payload = {
        customer_id: useNewCustomer ? null : selectedCustomer?.id || null,
        new_customer: useNewCustomer ? newCustomer : null,

        invoice_date: invoiceDate,
        due_date: dueDate,
        status: status,

        items: items.map((item) => ({
          id: item.id || null,
          description: item.description,
          quantity: parseFloat(item.quantity),
          unit_price: parseFloat(item.unitPrice),
        })),

        tax_percent: taxPercent / 100,
        notes: notes,
      };

      const response = await fetch(
        `${apiBase}/api/invoice/${invoice_number}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "An error occurred",
          text: data.message || "Failed to update invoice",
        });

        setErrors(data.errors || {});
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Invoice Updated!",
        text: data.message || "Updated successfully.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Updating Invoice",
        text: err.message || "Unexpected error.",
      });
    } finally {
      setLoading(false);
    }
  };

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
                  <h3>Edit {invoice_number}</h3>
                  <p>Update invoice details and items</p>
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

                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={useNewCustomer}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setUseNewCustomer(checked);

                                if (checked) {
                                  // Save the current selected customer before clearing
                                  setPreviousCustomer(selectedCustomer);

                                  // Clear selected customer
                                  setSelectedCustomer(null);
                                } else {
                                  // Restore previous customer when unchecking
                                  setSelectedCustomer(previousCustomer);
                                }
                              }}
                              id="useNewCustomer"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="useNewCustomer"
                            >
                              Use New Customer Instead
                            </label>
                          </div>

                          <select
                            className="form-select mb-2"
                            value={selectedCustomer?.id || ""}
                            onChange={(e) => {
                              const cust = customers.find(
                                (c) => c.id === parseInt(e.target.value),
                              );

                              setSelectedCustomer(cust || null);

                              // update previous customer too
                              setPreviousCustomer(cust || null);

                              // if user selects existing, switch off new customer mode
                              setUseNewCustomer(false);
                            }}
                            disabled={useNewCustomer}
                          >
                            <option value="">
                              -- Select Existing Customer --
                            </option>

                            {customers.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.email})
                              </option>
                            ))}
                          </select>

                          {selectedCustomer && !useNewCustomer && (
                            <div className="alert alert-light border">
                              <strong>{selectedCustomer.name}</strong>
                              <br />
                              {selectedCustomer.email}
                              <br />
                              {selectedCustomer.address}
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
                            disabled={!useNewCustomer}
                          />

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
                            disabled={!useNewCustomer}
                          />

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
                            disabled={!useNewCustomer}
                          />

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
                            disabled={!useNewCustomer}
                          />
                        </div>

                        {/* Company Info */}

                        <div className="col-md-6 text-end">
                          {loading ? (
                            <p className="text-info">Loading...</p>
                          ) : (
                            <>
                              <img
                                src="/images/logo.jpeg"
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
                            </>
                          )}
                        </div>
                      </div>

                      {/* Invoice Details */}
                      <div className="row mb-4 mt-50">
                        <div className="col-md-3">
                          <label>Invoice ID</label>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={invoice_number}
                          />
                        </div>

                        <div className="col-md-3">
                          <label>Invoice Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                          />
                        </div>

                        <div className="col-md-3">
                          <label>Due Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                          />
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
                                    className="form-control"
                                    value={item.description}
                                    onChange={(e) =>
                                      handleItemChange(
                                        idx,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleItemChange(
                                        idx,
                                        "quantity",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={item.unitPrice}
                                    onChange={(e) =>
                                      handleItemChange(
                                        idx,
                                        "unitPrice",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  {companySettings?.currency_symbol}
                                  {(item.quantity * item.unitPrice).toFixed(2)}
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
                      </div>

                      {/* Notes */}
                      <div className="mb-4 mt-20">
                        <label>Notes (optional)</label>
                        <textarea
                          className="form-control"
                          rows={4}
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
                              setTaxPercent(parseFloat(e.target.value) || 0)
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
                          Tax ({taxPercent}%):{" "}
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
                          {loading ? "Saving..." : "Update Invoice"}
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
