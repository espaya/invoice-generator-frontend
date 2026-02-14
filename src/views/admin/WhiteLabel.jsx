import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import AdminSettingsMenu from "../../components/admin/admin_settings_menu";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import { useWhiteLabel } from "../../context/WhiteLabelContext";
import CompanySettings from "../../controllers/CompanySettingsController";
import StatWidgetSkeleton from "../../components/StatWidgetSkeleton";

export default function WhiteLabel() {
  const apiBase = import.meta.env.VITE_API_URL;

  const { customCss, setCustomCss, loadingWhiteLabel } = useWhiteLabel();
  const [companySettings, setCompanySettings] = useState({});

  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounceTimer = useRef(null);

  // ==========================
  // FETCH COMPANY SETTINGS
  // ==========================
  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // ==========================
  // LOAD CSS FROM DB INTO FIELD
  // ==========================
  useEffect(() => {
    if (companySettings?.custom_css !== undefined) {
      setCustomCss(companySettings.custom_css || "");
      setHasTyped(false); // prevents autosave on load
      setSaveStatus("idle");
    }
  }, [companySettings, setCustomCss]);

  // ==========================
  // AUTO SAVE FUNCTION
  // ==========================
  const saveCss = async (css) => {
    setSaveStatus("saving");

    try {
      const res = await fetch(
        `${apiBase}/api/admin/company-settings/white-label`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
          body: JSON.stringify({
            custom_css: css,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save custom css");
      }

      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      setSaveStatus("error");

      Swal.fire("Error", err.message || "Failed to save CSS", "error");
    }
  };

  // ==========================
  // DEBOUNCE AUTO SAVE (ONLY AFTER USER TYPES)
  // ==========================
  useEffect(() => {
    if (loadingWhiteLabel) return;

    // 🚫 prevent saving immediately on page load
    if (!hasTyped) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      saveCss(customCss);
    }, 1000);

    return () => clearTimeout(debounceTimer.current);
  }, [customCss, hasTyped, loadingWhiteLabel]);

  const getStatusText = () => {
    if (saveStatus === "saving") return "Saving...";
    if (saveStatus === "saved") return "Saved ✔";
    if (saveStatus === "error") return "Save Failed ❌";
    return "";
  };

  const getStatusClass = () => {
    if (saveStatus === "saving") return "text-warning";
    if (saveStatus === "saved") return "text-success";
    if (saveStatus === "error") return "text-danger";
    return "text-muted";
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
                  <h3>White Label</h3>
                  <p className="mb-2">Customize app theme and branding</p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Settings </a>
                  <span>
                    <i className="ri-arrow-right-s-line" />
                  </span>
                  <a href="#">White Label</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <AdminSettingsMenu />

            <div className="col-md-9">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Custom CSS</h4>

                  {!loading && hasTyped && (
                    <small className={getStatusClass()}>
                      {getStatusText()}
                    </small>
                  )}
                </div>

                <div className="card-body">
                  {loading ? (
                    <StatWidgetSkeleton />
                  ) : (
                    <>
                      <textarea
                        placeholder=".btn-primary { background: red; }"
                        className="form-control"
                        rows={12}
                        value={customCss}
                        onChange={(e) => {
                          setHasTyped(true);
                          setSaveStatus("idle");
                          setCustomCss(e.target.value);
                        }}
                        style={{
                          fontFamily: "monospace",
                          fontSize: "14px",
                        }}
                      ></textarea>

                      <small className="text-muted d-block mt-2">
                        Auto-save starts after you begin typing.
                      </small>
                    </>
                  )}
                </div>
              </div>

              <div className="alert alert-info mt-3">
                <strong>Example:</strong>
                <pre className="mb-0 mt-2">
                  {`:root {
  --primary: #ff0000;
}

.btn-primary {
  background: var(--primary) !important;
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
