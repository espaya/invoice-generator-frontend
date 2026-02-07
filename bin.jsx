
    <div id="main-wrapper">
      <div className="position-relative overflow-hidden auth-bg min-vh-100 w-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <div className="card mb-0 bg-body auth-login m-auto w-100">
              <div className="row justify-content-center py-4">
                <div className="col-lg-11">
                  <div className="card-body">
                    <a
                      href="../main/index.html"
                      className="text-nowrap logo-img d-block mb-4 w-100"
                    >
                      <img
                        src="../assets/images/logos/logo.svg"
                        className="dark-logo"
                        alt="Logo-Dark"
                      />
                    </a>

                    <h2 className="lh-base mb-4">Let's get you signed in</h2>

                    {error.general && (
                      <div className="text-danger mb-3">{error.general}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                        />
                        {error.email && (
                          <div className="text-danger mt-2">
                            {error.email[0]}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          onChange={handleChange}
                        />
                        {error.password && (
                          <div className="text-danger mt-2">
                            {error.password[0]}
                          </div>
                        )}
                      </div>

                      <div className="form-check mb-4">
                        <input
                          type="checkbox"
                          name="remember"
                          className="form-check-input"
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          Keep me logged in
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Sign In"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>