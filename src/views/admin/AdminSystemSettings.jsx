import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import AdminSettingsMenu from "../../components/admin/admin_settings_menu";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import Spinner from "../../components/Spinner";

export default function AdminSystemSettings() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const [previewLogo, setPreviewLogo] = useState(
    "/images/logo_placeholder.png",
  );

  const isDefaultLogo = previewLogo === "/images/logo_placeholder.png";

  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_address: "",
    invoice_prefix: "INV",
    invoice_footer: "",
    tin: "",
    currency: "GHS",
    currency_symbol: "₵",
    primary_color: "#0d6efd",
    secondary_color: "#6c757d",
    logo: null,
  });

  // fetch settings
  const getSettings = async () => {
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${apiBase}/api/company-settings`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Failed to fetch settings" });
        return;
      }

      setFormData({
        company_name: data.company_name || "",
        company_email: data.company_email || "",
        company_phone: data.company_phone || "",
        company_address: data.company_address || "",
        invoice_prefix: data.invoice_prefix || "INV",
        invoice_footer: data.invoice_footer || "",
        tin: data.tin || "",
        currency: data.currency || "GHS",
        currency_symbol: data.currency_symbol || "₵",
        primary_color: data.primary_color || "#0d6efd",
        secondary_color: data.secondary_color || "#6c757d",
        logo: null,
      });

      if (data.logo) {
        setPreviewLogo(`${apiBase}/storage/${data.logo}`);
      } else {
        setPreviewLogo("/images/logo_placeholder.png");
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file change
  const handleLogoChange = (file) => {
    if (file) {
      setFormData({ ...formData, logo: file });
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleLogoChange(file);
  };

  const removeLogo = () => {
    setFormData({ ...formData, logo: null });
    setPreviewLogo("/images/logo_placeholder.png");

    const input = document.getElementById("logoInput");
    if (input) input.value = "";
  };

  // drag drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleLogoChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // submit settings
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setErrors({});

    try {
      const data = new FormData();
      data.append("company_name", formData.company_name);
      data.append("company_email", formData.company_email);
      data.append("company_phone", formData.company_phone);
      data.append("company_address", formData.company_address);
      data.append("invoice_prefix", formData.invoice_prefix);
      data.append("invoice_footer", formData.invoice_footer);
      data.append("tin", formData.tin);
      data.append("currency", formData.currency);
      data.append("currency_symbol", formData.currency_symbol);
      data.append("primary_color", formData.primary_color);
      data.append("secondary_color", formData.secondary_color);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      const res = await fetch(`${apiBase}/api/company-settings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: data,
        credentials: "include",
      });

      const response = await res.json();

      if (!res.ok) {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          setErrors({ general: response.message || "Something went wrong" });
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to save settings",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message || "Settings updated successfully!",
      });

      getSettings();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setSaving(false);
    }
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
                  <h3>Application</h3>
                  <p className="mb-2">Manage company invoice settings</p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Settings </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">Application</a>
                </div>
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row">
            <AdminSettingsMenu />

            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Company Settings</h4>
                </div>

                <div className="card-body">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {/* LOGO PREVIEW */}
                        <div className="col-md-12 mb-20 d-flex justify-content-center">
                          <div
                            style={{
                              position: "relative",
                              width: "120px",
                              height: "120px",
                            }}
                          >
                            <img
                              src={previewLogo}
                              alt="Logo Preview"
                              width={120}
                              height={120}
                              className="rounded-circle border"
                              style={{ objectFit: "cover" }}
                            />

                            {!isDefaultLogo && (
                              <button
                                type="button"
                                onClick={removeLogo}
                                className="btn btn-danger btn-sm"
                                style={{
                                  position: "absolute",
                                  top: "-5px",
                                  right: "-5px",
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                  padding: "0px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                title="Remove Logo"
                              >
                                <i className="ri-close-line"></i>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* COMPANY NAME */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                          />
                          {errors.company_name && (
                            <small className="text-danger">
                              {errors.company_name[0]}
                            </small>
                          )}
                        </div>

                        {/* COMPANY EMAIL */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Company Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="company_email"
                            value={formData.company_email}
                            onChange={handleChange}
                          />
                        </div>

                        {/* COMPANY PHONE */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Company Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="company_phone"
                            value={formData.company_phone}
                            onChange={handleChange}
                          />
                        </div>

                        {/* TIN */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">TIN</label>
                          <input
                            type="text"
                            className="form-control"
                            name="tin"
                            value={formData.tin}
                            onChange={handleChange}
                          />
                        </div>

                        {/* ADDRESS */}
                        <div className="col-md-12 mb-16">
                          <label className="form-label">Company Address</label>
                          <textarea
                            className="form-control"
                            name="company_address"
                            rows="3"
                            value={formData.company_address}
                            onChange={handleChange}
                          ></textarea>
                        </div>

                        {/* INVOICE PREFIX */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Invoice Prefix</label>
                          <input
                            type="text"
                            className="form-control"
                            name="invoice_prefix"
                            value={formData.invoice_prefix}
                            onChange={handleChange}
                          />
                        </div>

                        {/* FOOTER */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Invoice Footer</label>
                          <input
                            type="text"
                            className="form-control"
                            name="invoice_footer"
                            value={formData.invoice_footer}
                            onChange={handleChange}
                          />
                        </div>

                        {/* CURRENCY */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Currency</label>
                          <input
                            type="text"
                            className="form-control"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                          />
                        </div>

                        {/* SYMBOL */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Currency Symbol</label>
                          <input
                            type="text"
                            className="form-control"
                            name="currency_symbol"
                            value={formData.currency_symbol}
                            onChange={handleChange}
                          />
                        </div>

                        {/* PRIMARY COLOR */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Primary Color</label>
                          <input
                            type="color"
                            className="form-control form-control-color"
                            name="primary_color"
                            value={formData.primary_color}
                            onChange={handleChange}
                          />
                        </div>

                        {/* SECONDARY COLOR */}
                        <div className="col-md-6 mb-16">
                          <label className="form-label">Secondary Color</label>
                          <input
                            type="color"
                            className="form-control form-control-color"
                            name="secondary_color"
                            value={formData.secondary_color}
                            onChange={handleChange}
                          />
                        </div>

                        {/* LOGO UPLOAD */}
                        <div className="col-md-12 mb-16">
                          <label className="form-label">Company Logo</label>

                          <div
                            className={`border rounded p-4 text-center ${
                              dragActive
                                ? "border-primary bg-light"
                                : "border-secondary"
                            }`}
                            style={{ cursor: "pointer" }}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() =>
                              document.getElementById("logoInput").click()
                            }
                          >
                            <i className="ri-upload-cloud-line fs-30 text-primary"></i>
                            <p className="mb-0 mt-2">
                              Drag & drop logo here <br /> or{" "}
                              <strong>click to upload</strong>
                            </p>

                            {formData.logo && (
                              <p className="mt-2 text-success mb-0">
                                Selected: {formData.logo.name}
                              </p>
                            )}
                          </div>

                          <input
                            type="file"
                            id="logoInput"
                            className="d-none"
                            accept="image/*"
                            onChange={handleFileInput}
                          />
                        </div>

                        {/* SUBMIT */}
                        <div className="col-md-4 d-grid gap-2 mt-3">
                          <button
                            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                            type="submit"
                            disabled={saving}
                          >
                            {saving && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            {saving ? "Saving..." : "Save Settings"}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
