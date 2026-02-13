import React from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import TotalClients from "../../components/user/dashboard/TotalClients";
import TotalInvoices from "../../components/user/dashboard/TotalInvoices";
import TotalRevenue from "../../components/user/dashboard/TotalRevenue";
import QuickActions from "../../components/user/dashboard/QuickActions";
import InvoiceAnalytics from "../../components/user/dashboard/InvoiceAnalytics";

export default function UserDashboard() {
  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />

        <div className="content-body">
          <div className="container">
            {/* PAGE TITLE */}
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Dashboard</h3>
                    <p className="mb-2">
                      Welcome to Invoice Generator Dashboard
                    </p>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home</a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Dashboard</a>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS ROW */}
            <div className="row">
              {/* TOTAL CLIENTS */}
              <TotalClients />

              {/* TOTAL INVOICES */}
              <TotalInvoices />

              {/* TOTAL REVENUE */}
              <TotalRevenue />

              <div className="row">
                {/* QUICK ACTIONS */}
                <QuickActions />

                {/* INVOICE ANALYTICS TABLE */}
                <InvoiceAnalytics />
              </div>
            </div>

            {/* END ROW */}
          </div>
        </div>
      </div>
    </>
  );
}
