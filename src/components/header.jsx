export default function Header() {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="header-content">
                <div className="header-left">
                  <div className="brand-logo">
                    <a className="mini-logo" href="index.html">
                      <img src="images/logo.png" alt="" width="40" />
                    </a>
                  </div>
                  <div className="search">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Here..."
                        />
                        <span className="input-group-text px-12">
                          <i className="ri-search-line"></i>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="header-right">
                  <div className="dark-light-toggle">
                    <span className="dark">
                      <i className="ri-moon-line"></i>
                    </span>
                    <span className="light">
                      <i className="ri-sun-line"></i>
                    </span>
                  </div>
                  <div className="nav-item dropdown notification dropdown">
                    <div data-bs-toggle="dropdown">
                      <div className="notify-bell icon-menu">
                        <span>
                          <i className="ri-notification-2-line"></i>
                        </span>
                      </div>
                    </div>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu notification-list dropdown-menu dropdown-menu-right"
                    >
                      <div className="lists">
                        <a
                          className="d-block pt-10 pb-10 border-bottom"
                          href="#"
                        >
                          <div className="d-flex align-items-center">
                            <span className="me-16 icon  bg-success-lighten text-success">
                              <i className="ri-check-line"></i>
                            </span>
                            <div>
                              <h6 className="mb-0 fs-14">
                                Device confirmation completed
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04
                              </span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="d-block pt-10 pb-10 border-bottom"
                          href="#"
                        >
                          <div className="d-flex align-items-center">
                            <span className="me-16 icon  bg-danger-lighten text-danger">
                              <i className="ri-close-line"></i>
                            </span>
                            <div>
                              <h6 className="mb-0 fs-14">
                                2FA verification failed
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04
                              </span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="d-block pt-10 pb-10 border-bottom"
                          href="#"
                        >
                          <div className="d-flex align-items-center">
                            <span className="me-16 icon  bg-warning-lighten text-warning">
                              <i className="ri-question-mark"></i>
                            </span>
                            <div>
                              <h6 className="mb-0 fs-14">
                                Phone verification pending
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04
                              </span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="d-block pt-10 pb-10 border-bottom"
                          href="#"
                        >
                          <div className="d-flex align-items-center">
                            <span className="me-16 icon  bg-warning-lighten text-warning">
                              <i className="ri-question-mark"></i>
                            </span>
                            <div>
                              <h6 className="mb-0 fs-14">
                                Phone verification pending
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04
                              </span>
                            </div>
                          </div>
                        </a>
                        <a href="notification.html">
                          See more<i className="ri-arrow-right-s-line"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown profile_log dropdown">
                    <div data-bs-toggle="dropdown">
                      <div className="user icon-menu active">
                        <span className="thumb">
                          <img src="images/avatar/1.png" alt="" />
                        </span>
                      </div>
                    </div>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu dropdown-menu dropdown-menu-right"
                    >
                      <div className="user-email">
                        <div className="user">
                          <span className="thumb">
                            <img src="images/avatar/1.png" alt="" />
                          </span>
                          <div>
                            <h5>Fiaz Abdullah</h5>
                            <span>codeefly@gmail.com</span>
                          </div>
                        </div>
                      </div>
                      <a
                        className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top  undefined"
                        href="profile.html"
                      >
                        <span className="fs-18 text-primary me-10">
                          <i className="ri-user-line"></i>
                        </span>
                        Profile
                      </a>
                      <a
                        className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top  undefined"
                        href="settings-profile.html"
                      >
                        <span className="fs-18 text-primary me-10">
                          <i className="ri-settings-3-line"></i>
                        </span>
                        Settings
                      </a>
                      <a
                        className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top  undefined"
                        href="settings-activity.html"
                      >
                        <span className="fs-18 text-primary me-10">
                          <i className="ri-time-line"></i>
                        </span>
                        Activity
                      </a>
                      <a
                        className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top  undefined"
                        href="lock.html"
                      >
                        <span className="fs-18 text-primary me-10">
                          <i className="ri-lock-line"></i>
                        </span>
                        Lock
                      </a>
                      <a
                        className="dropdown-item ps-20 pe-20 pt-10 pb-10 d-flex align-items-center border-top  text-danger"
                        href="signin.html"
                      >
                        <span className="fs-18 text-primary me-10">
                          <i className="ri-logout-circle-line"></i>
                        </span>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
