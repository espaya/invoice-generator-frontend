import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import CompanySettings from "../controllers/CompanySettingsController";
import { PATHS } from "../router";
import ReCAPTCHA from "react-google-recaptcha";

export default function ResetPassword() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [companySettings, setCompanySettings] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [form, setForm] = useState({
    email: "",
  });

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const logo = companySettings?.logo;

  // ==========================
  // LOAD COMPANY SETTINGS
  // ==========================
  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, []);

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // SUBMIT RESET REQUEST
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      // Recaptcha required in production
      if (!isLocalhost && !captchaToken) {
        setError({ general: "Please complete the captcha." });
        setLoading(false);
        return;
      }

      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${apiBase}/api/password/reset/request`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN") || ""),
        },
        body: JSON.stringify({
          email: form.email,
          recaptcha_token: isLocalhost ? "localhost" : captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.errors || { general: data.message || "Request failed" });

        setCaptchaToken(null);
        if (captchaRef.current) {
          captchaRef.current.reset();
        }

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Reset code sent to your email!",
      });

      setForm({ email: "" });

    } catch (err) {
      setError({ general: err.message || "Something went wrong" });

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authincation section-padding">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-4 col-md-5">
            <div className="mini-logo text-center my-12">
              <Link to={PATHS.HOME}>
                <img
                  src={
                    logo
                      ? `${apiBase}/storage/${logo}`
                      : "/images/logo_placeholder.png"
                  }
                  alt="Logo"
                  width={120}
                />
              </Link>
            </div>

            <div className="card mt-25">
              <div className="card-header justify-content-center">
                <h4 className="card-title">Reset Password</h4>
              </div>

              {error.general && (
                <div className="text-danger text-center mx-3 mt-3">
                  {error.general}
                </div>
              )}

              <div className="card-body">
                <form method="POST" className="g-3" onSubmit={handleSubmit}>
                  {/* EMAIL */}
                  <div className="mb-16">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />

                    {error.email && (
                      <small className="text-danger text-center mt-10">
                        {error.email[0]}
                      </small>
                    )}
                  </div>

                  {/* CAPTCHA */}
                  {!isLocalhost && (
                    <div className="d-flex justify-content-center mt-20">
                      <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                      />
                    </div>
                  )}

                  {/* SUBMIT */}
                  <div className="mt-16">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      {loading ? "Sending Code..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="new-account mt-16 text-center pb-3">
                <p className="mb-0">
                  Remember your password?
                  <Link to={PATHS.HOME} className="text-primary ms-5">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
