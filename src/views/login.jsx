import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../routes/AuthContext";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext not found. Wrap app with AuthProvider.");
  }

  const { fetchUser, setUser } = auth;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      await fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const response = await fetch(`${apiBaseUrl}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN") || ""),
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors || { general: data.message });
        return;
      }

      setUser(data.user);

      await fetchUser();

      setTimeout(() => {
        navigate(data.redirect_url, { replace: true });
      }, 0);
    } catch (err) {
      setError({ general: err.message || "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authincation section-padding">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-5 col-md-6">
            <div className="mini-logo text-center mb-35">
              <a href="index.html">
                <img src="images/logo.jpeg" width={150} alt="" />
              </a>
            </div>

            <div className="card">
              <div className="card-header justify-content-center">
                <h4 className="card-title">Sign in</h4>
              </div>

              {error.general && (
                <small className="alert alert-danger text-center">
                  {error.general}
                </small>
              )}

              <div className="card-body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* EMAIL */}
                    <div className="col-12 mb-16">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        autoComplete="off"
                      />

                      {error.email && (
                        <small className="text-danger">{error.email[0]}</small>
                      )}
                    </div>

                    {/* PASSWORD */}
                    <div className="col-12 mb-16">
                      <label className="form-label">Password</label>

                      <div className="input-group">
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          onChange={handleChange}
                        />

                        <button
                          type="button"
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={
                              showPassword ? "ri-eye-off-line" : "ri-eye-line"
                            }
                          ></i>
                        </button>
                      </div>

                      {error.password && (
                        <small className="text-danger">
                          {error.password[0]}
                        </small>
                      )}
                    </div>

                    {/* REMEMBER */}
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          name="remember"
                          onChange={handleChange}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <label className="form-check-label">Remember me</label>
                      </div>
                    </div>

                    <div className="col-6 text-end">
                      <a href="reset.html">Forgot Password?</a>
                    </div>
                  </div>

                  <div className="mt-16 d-grid gap-2">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary mr-2"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                  </div>
                </form>

                <p className="mt-16 mb-0">{/* recaptcha */}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
