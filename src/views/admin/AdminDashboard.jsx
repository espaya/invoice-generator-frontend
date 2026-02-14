import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import TotalClients from "../../components/admin/dashboard/TotalClients";
import TotalInvoices from "../../components/admin/dashboard/TotalInvoices";
import TotalRevenue from "../../components/admin/dashboard/TotalRevenue";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import InvoiceAnalytics from "../../components/admin/dashboard/InvoiceAnalytics";
import TopCustomersCard from "../../components/admin/dashboard/TopCustomersCard";
import DueSoonInvoicesCard from "../../components/admin/dashboard/DueSoonInvoicesCard";
import OverdueInvoicesCard from "../../components/admin/dashboard/OverDueInvoicesCard";
import Cookies from "js-cookie";
import AdminSidebar from "../../components/admin/admin_sidebar";

export default function AdminDashboard() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const [topCustomers, setTopCustomers] = useState([]);
  const [dueSoonInvoices, setDueSoonInvoices] = useState([]);
  const [overdueInvoices, setOverdueInvoices] = useState([]);

  const getDashboardSummary = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/admin/dashboard-summary`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Dashboard Error:", data.message);
        return;
      }

      setTopCustomers(data.top_customers || []);
      setDueSoonInvoices(data.due_soon_invoices || []);
      setOverdueInvoices(data.overdue_invoices || []);
    } catch (err) {
      console.log("Dashboard fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <AdminSidebar />

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
              <TotalClients />
              <TotalInvoices />
              <TotalRevenue />
              <div className="row">
                <QuickActions />
                <InvoiceAnalytics />
              </div>

              <div className="row">
                <TopCustomersCard customers={topCustomers} loading={loading} />
                <DueSoonInvoicesCard invoices={dueSoonInvoices} loading={loading} />
                <OverdueInvoicesCard overdueInvoices={overdueInvoices} loading={loading} />
              </div>
            </div>

            {/* END ROW */}
          </div>
        </div>
      </div>
    </>
  );
}
