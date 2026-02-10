import Notification from "./notification";

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

                  <Notification />

                  <div className="dropdown profile_log dropdown">
                    <div data-bs-toggle="dropdown">
                      <div className="user icon-menu active">
                        <span className="thumb">
                          <img src="/images/avatar/1.png" alt="" />
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
                            <img src="/images/avatar/1.png" alt="" />
                          </span>
                          <div>
                            <h5>Fiaz Abdullah</h5>
                            <span>codeefly@gmail.com</span>
                          </div>
                        </div>
                      </div>
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
