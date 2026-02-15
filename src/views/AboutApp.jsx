import Header from "../components/header";
import { Link } from "react-router-dom";
import { PATHS } from "../router";
import { useEffect, useState } from "react";
import CompanySettings from "../controllers/CompanySettingsController";
import StatWidgetSkeleton from "../components/StatWidgetSkeleton";
import AdminSidebar from "../components/admin/admin_sidebar";

export default function AboutApp() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [companySettings, setCompanySettings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // ==========================
  // LICENSE DATA (FROM DB)
  // ==========================
  const licensedTo = companySettings?.company_name || "Unknown Company";
  const supportEmail =
    companySettings?.company_email || "support@invoicify.com";
  const supportPhone = companySettings?.company_phone || "N/A";

  // These can be added later to your company_settings table
  const licenseStatus = companySettings?.license_status || "Active";
  const licenseKey = companySettings?.license_key || "INV-XXXX-XXXX-XXXX";
  const licenseExpiry = companySettings?.license_expiry || "Unlimited";

  // Mask license key for security
  const maskedLicenseKey =
    licenseKey && licenseKey.length > 8
      ? `${licenseKey.substring(0, 4)}-XXXX-XXXX-${licenseKey.substring(
          licenseKey.length - 4,
        )}`
      : licenseKey;

  const isExpired =
    licenseExpiry !== "Unlimited" &&
    licenseExpiry &&
    new Date(licenseExpiry) < new Date();

  const licenseBadgeClass = isExpired ? "bg-danger" : "bg-success";
  const licenseBadgeText = isExpired ? "Expired" : "Active";

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <AdminSidebar />

        <div className="content-body">
          <div className="container">
            {/* PAGE TITLE */}
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>About Invoicify</h3>
                    <p className="mb-2">
                      Learn more about the Invoicify invoice management
                      platform.
                    </p>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="breadcrumbs">
                    <Link to={PATHS.HOME}>Home </Link>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <span>About</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT CONTENT */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">About Invoicify</h4>
                  </div>

                  <div className="card-body">
                    {loading ? (
                      <StatWidgetSkeleton />
                    ) : (
                      <div className="recent-notification">
                        <div className="lists">
                          {/* WHAT IS INVOICIFY */}
                          <div className="d-block pt-10 pb-10 border-bottom">
                            <div className="d-flex align-items-center">
                              <span className="me-16 icon bg-primary-lighten text-primary">
                                <i className="ri-information-line" />
                              </span>

                              <div>
                                <h6 className="mb-0 fs-14">
                                  What is Invoicify?
                                </h6>
                                <span className="fs-13 text-muted">
                                  Invoicify is a professional invoice generation
                                  and billing platform built to help businesses
                                  create invoices, manage customers, and track
                                  payments with ease.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* CORE FEATURES */}
                          <div className="d-block pt-10 pb-10 border-bottom">
                            <div className="d-flex align-items-center">
                              <span className="me-16 icon bg-success-lighten text-success">
                                <i className="ri-check-line" />
                              </span>

                              <div>
                                <h6 className="mb-0 fs-14">Core Features</h6>
                                <span className="fs-13 text-muted">
                                  Create invoices, manage customers, export PDF
                                  invoices, track invoice status, and maintain
                                  transaction records in one platform.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* ADMIN MANAGEMENT */}
                          <div className="d-block pt-10 pb-10 border-bottom">
                            <div className="d-flex align-items-center">
                              <span className="me-16 icon bg-warning-lighten text-warning">
                                <i className="ri-admin-line" />
                              </span>

                              <div>
                                <h6 className="mb-0 fs-14">
                                  Admin Control & User Management
                                </h6>
                                <span className="fs-13 text-muted">
                                  Administrators can monitor users, view invoice
                                  activity, apply restrictions
                                  (blocked/suspended), and manage platform-wide
                                  settings.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* SECURITY */}
                          <div className="d-block pt-10 pb-10 border-bottom">
                            <div className="d-flex align-items-center">
                              <span className="me-16 icon bg-danger-lighten text-danger">
                                <i className="ri-shield-check-line" />
                              </span>

                              <div>
                                <h6 className="mb-0 fs-14">
                                  Security & Authentication
                                </h6>
                                <span className="fs-13 text-muted">
                                  Invoicify includes secure authentication,
                                  session protection, role-based access,
                                  reCAPTCHA support, and password reset flows.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* WHITE LABEL */}
                          <div className="d-block pt-10 pb-10 border-bottom">
                            <div className="d-flex align-items-center">
                              <span className="me-16 icon bg-info-lighten text-info">
                                <i className="ri-palette-line" />
                              </span>

                              <div>
                                <h6 className="mb-0 fs-14">
                                  White Label & Branding
                                </h6>
                                <span className="fs-13 text-muted">
                                  Customize your invoices and app appearance
                                  using logos, theme colors, invoice footer
                                  text, and custom CSS for client branding.
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* ==========================
    LICENSE INFORMATION GRID
========================== */}
                          <div className="row mt-20">
                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                              <div className="d-block pt-10 pb-10 border-bottom">
                                <div className="d-flex align-items-center">
                                  <span className="me-16 icon bg-dark-lighten text-dark">
                                    <i className="ri-building-4-line" />
                                  </span>

                                  <div>
                                    <h6 className="mb-0 fs-14">Licensed To</h6>
                                    <span className="fs-13 text-muted">
                                      {licensedTo}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                              <div className="d-block pt-10 pb-10 border-bottom">
                                <div className="d-flex align-items-center">
                                  <span className="me-16 icon bg-success-lighten text-success">
                                    <i className="ri-shield-star-line" />
                                  </span>

                                  <div>
                                    <h6 className="mb-0 fs-14">
                                      License Status
                                    </h6>

                                    <span
                                      className={`badge ${licenseBadgeClass} mt-1`}
                                    >
                                      {licenseBadgeText}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                              <div className="d-block pt-10 pb-10 border-bottom">
                                <div className="d-flex align-items-center">
                                  <span className="me-16 icon bg-primary-lighten text-primary">
                                    <i className="ri-key-2-line" />
                                  </span>

                                  <div>
                                    <h6 className="mb-0 fs-14">License Key</h6>
                                    <span className="fs-13 text-muted">
                                      {maskedLicenseKey}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                              <div className="d-block pt-10 pb-10 border-bottom">
                                <div className="d-flex align-items-center">
                                  <span className="me-16 icon bg-warning-lighten text-warning">
                                    <i className="ri-calendar-check-line" />
                                  </span>

                                  <div>
                                    <h6 className="mb-0 fs-14">
                                      License Expiry
                                    </h6>
                                    <span className="fs-13 text-muted">
                                      {licenseExpiry}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                              <div className="d-block pt-10 pb-10 border-bottom">
                                <div className="d-flex align-items-center">
                                  <span className="me-16 icon bg-secondary-lighten text-secondary">
                                    <i className="ri-tools-line" />
                                  </span>

                                  <div>
                                    <h6 className="mb-0 fs-14">
                                      Maintenance & Support
                                    </h6>
                                    <span className="fs-13 text-muted">
                                      {supportEmail} <br />
                                      {supportPhone}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                              <div className="d-block pt-10 pb-10">
                                <div className="d-flex align-items-center">
                                  <span className="me-16 icon bg-dark-lighten text-dark">
                                    <i className="ri-code-s-slash-line" />
                                  </span>

                                  <div>
                                    <h6 className="mb-0 fs-14">
                                      System Version
                                    </h6>
                                    <span className="fs-13 text-muted">
                                      Invoicify v1.0 — Built for speed,
                                      simplicity, and scalable business billing.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* FOOTER */}
                          <div className="text-center mt-20">
                            <small className="text-muted">
                              © {new Date().getFullYear()} Invoicify. All rights
                              reserved. Licensed Software. Developed by{" "}
                              <a href="#" className="text-primary">
                                TechDex GH
                              </a>
                            </small>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {!loading && (
                  <div className="d-flex flex-wrap justify-content-center mb-3">
                    <Link
                      onClick={() => window.history.back()}
                      className="btn btn-primary mx-16 my-16 py-8 px-8 bg-primary d-flex align-items-center gap-2"
                    >
                      <i className="ri-arrow-left-line fs-18 text-white" />
                      <span className="text-white">Dashboard</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* END ROW */}
          </div>
        </div>
      </div>
    </>
  );
}
