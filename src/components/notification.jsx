export default function Notification() {
  return (
    <>
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
            <a className="d-block pt-10 pb-10 border-bottom" href="#">
              <div className="d-flex align-items-center">
                <span className="me-16 icon  bg-success-lighten text-success">
                  <i className="ri-check-line"></i>
                </span>
                <div>
                  <h6 className="mb-0 fs-14">Device confirmation completed</h6>
                  <span className="fs-13 text-muted">020-11-04</span>
                </div>
              </div>
            </a>
            <a className="d-block pt-10 pb-10 border-bottom" href="#">
              <div className="d-flex align-items-center">
                <span className="me-16 icon  bg-danger-lighten text-danger">
                  <i className="ri-close-line"></i>
                </span>
                <div>
                  <h6 className="mb-0 fs-14">2FA verification failed</h6>
                  <span className="fs-13 text-muted">020-11-04</span>
                </div>
              </div>
            </a>
            <a className="d-block pt-10 pb-10 border-bottom" href="#">
              <div className="d-flex align-items-center">
                <span className="me-16 icon  bg-warning-lighten text-warning">
                  <i className="ri-question-mark"></i>
                </span>
                <div>
                  <h6 className="mb-0 fs-14">Phone verification pending</h6>
                  <span className="fs-13 text-muted">020-11-04</span>
                </div>
              </div>
            </a>
            <a className="d-block pt-10 pb-10 border-bottom" href="#">
              <div className="d-flex align-items-center">
                <span className="me-16 icon  bg-warning-lighten text-warning">
                  <i className="ri-question-mark"></i>
                </span>
                <div>
                  <h6 className="mb-0 fs-14">Phone verification pending</h6>
                  <span className="fs-13 text-muted">020-11-04</span>
                </div>
              </div>
            </a>
            <a href="notification.html">
              See more<i className="ri-arrow-right-s-line"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
