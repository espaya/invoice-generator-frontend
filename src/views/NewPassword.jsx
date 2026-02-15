import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import CompanySettings from "../controllers/CompanySettingsController";
import { PATHS } from "../router";
import ReCAPTCHA from "react-google-recaptcha";

export default function NewPassword() {
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [companySettings, setCompanySettings] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
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
  // SUBMIT RESET PASSWORD
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      if (!token || !email) {
        setError({ general: "Reset token or email is missing." });
        setLoading(false);
        return;
      }

      // captcha required only in production
      if (!isLocalhost && !captchaToken) {
        setError({ general: "Please complete the captcha." });
        setLoading(false);
        return;
      }

      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(`${apiBase}/api/password/reset/confirm`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN") || ""),
        },
        body: JSON.stringify({
          token,
          email,
          password: form.password,
          password_confirmation: form.password_confirmation,
          recaptcha_token: isLocalhost ? "localhost" : captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.errors || { general: data.message || "Reset failed" });

        setCaptchaToken(null);
        if (captchaRef.current) captchaRef.current.reset();

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Password reset successful",
      });

      navigate(PATHS.HOME);
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
                <form className="g-3" onSubmit={handleSubmit}>
                  {/* Password */}
                  <div className="mb-16">
                    <label className="form-label">New Password</label>

                    <div className="input-group">
                      <input
                        type={showCurrent ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowCurrent((prev) => !prev)}
                      >
                        <i
                          className={
                            showCurrent ? "ri-eye-off-line" : "ri-eye-line"
                          }
                        />
                      </button>
                    </div>

                    {error.password && (
                      <small className="text-danger d-block mt-2">
                        {error.password[0]}
                      </small>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-16">
                    <label className="form-label">Confirm New Password</label>

                    <div className="input-group">
                      <input
                        type={showNew ? "text" : "password"}
                        className="form-control"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowNew((prev) => !prev)}
                      >
                        <i
                          className={
                            showNew ? "ri-eye-off-line" : "ri-eye-line"
                          }
                        />
                      </button>
                    </div>

                    {error.password_confirmation && (
                      <small className="text-danger d-block mt-2">
                        {error.password_confirmation[0]}
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
                      {loading ? "Resetting..." : "Submit"}
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

            {/* DEBUG INFO */}
            {/* <p className="text-muted mt-3 text-center">
              Token: {token} <br /> Email: {email}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
