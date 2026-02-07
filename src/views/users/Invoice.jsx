import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function Invoice() {
  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />

        <div className="content-body">
          <div className="container">
            {/* Page Title */}
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Invoices</h3>
                    <p className="mb-2">
                      Welcome to the Invoice management page
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Invoices</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Table */}
            <div className="row">
              <div className="col-12">
                <div className="card transparent">
                  <div className="card-body">
                    <div className="rtable rtable--6cols rtable--collapse">
                      {/* Table Header */}
                      <div className="rtable-row rtable-row--head bg-transparent">
                        <div className="rtable-cell column-heading text-dark">
                          <strong>Invoice ID</strong>
                        </div>
                        <div className="rtable-cell column-heading text-dark">
                          <strong>Customer Name</strong>
                        </div>
                        <div className="rtable-cell column-heading text-dark">
                          <strong>Date</strong>
                        </div>
                        <div className="rtable-cell column-heading text-dark">
                          <strong>Status</strong>
                        </div>
                        <div className="rtable-cell column-heading text-dark">
                          <strong>Amount</strong>
                        </div>
                        <div className="rtable-cell column-heading text-dark">
                          <strong>Actions</strong>
                        </div>
                      </div>

                      {/* Sample Row */}
                      <div className="rtable-row">
                        <div className="rtable-cell">
                          <div className="rtable-cell--content">INV-1001</div>
                        </div>
                        <div className="rtable-cell">
                          <div className="rtable-cell--content">John Doe</div>
                        </div>
                        <div className="rtable-cell">
                          <div className="rtable-cell--content">2026-02-07</div>
                        </div>
                        <div className="rtable-cell">
                          <div className="rtable-cell--content">
                            <span className="badge bg-success">Paid</span>
                          </div>
                        </div>
                        <div className="rtable-cell">
                          <div className="rtable-cell--content">$1,200</div>
                        </div>
                        <div className="rtable-cell">
                          <div className="rtable-cell--content d-flex gap-2">
                            <button className="btn btn-sm btn-primary">
                              <i className="ri-eye-fill"></i>
                            </button>
                            <button className="btn btn-sm btn-info">
                                <i className="ri-download-fill"></i>
                            </button>
                            <button className="btn btn-sm btn-warning">
                                <i className="ri-mail-fill"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Add more rows dynamically as needed */}
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
