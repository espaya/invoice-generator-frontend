import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import StatWidgetSkeleton from "../../StatWidgetSkeleton";

export default function TotalInvoices() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceStats = async () => {
      try {
        const res = await fetch(`${apiBase}/api/admin/invoices/stats`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats({
            total: data.total_invoices || 0,
            paid: data.paid_invoices || 0,
            pending: data.pending_invoices || 0,
            overdue: data.overdue_invoices || 0,
          });
        }
      } catch (err) {
        console.error("Fetch invoices stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceStats();
  }, [apiBase]);

  const paidPercent =
    stats.total > 0 ? Math.round((stats.paid / stats.total) * 100) : 0;

  const pendingPercent =
    stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0;

  const overduePercent =
    stats.total > 0 ? Math.round((stats.overdue / stats.total) * 100) : 0;

  // Enable Bootstrap tooltips
  useEffect(() => {
    if (window.bootstrap) {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]',
      );

      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, [stats]);

  return (
    <div className="col-lg-4 col-sm-12">
      <div className="stat-widget p-20 mb-160 mb-30">
        {loading ? (
          <StatWidgetSkeleton/>
        ) : (
          <>
            <div className="d-flex align-items-center mb-20">
              <span className="icon">
                <i className="ri-file-list-3-line text-warning bg-warning-lighten fs-30 py-12 px-12 rounded me-20"></i>
              </span>

              <div>
                <p className="mb-0">
                  <strong>Total Invoices</strong>
                </p>
                <h3 className="mb-0">{stats.total}</h3>
              </div>
            </div>

            <p className="mb-7">
              <strong className="text-success">Paid: {stats.paid}</strong>
            </p>

            <p className="mb-7">
              <strong className="text-warning">Pending: {stats.pending}</strong>
            </p>

            <p>
              <strong className="text-danger">Overdue: {stats.overdue}</strong>
            </p>

            {/* STACKED PROGRESS BAR WITH TOOLTIP */}
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${paidPercent}%` }}
                role="progressbar"
                aria-valuenow={paidPercent}
                aria-valuemin="0"
                aria-valuemax="100"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Paid: ${stats.paid} invoices (${paidPercent}%)`}
              ></div>

              <div
                className="progress-bar bg-warning"
                style={{ width: `${pendingPercent}%` }}
                role="progressbar"
                aria-valuenow={pendingPercent}
                aria-valuemin="0"
                aria-valuemax="100"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Pending: ${stats.pending} invoices (${pendingPercent}%)`}
              ></div>

              <div
                className="progress-bar bg-danger"
                style={{ width: `${overduePercent}%` }}
                role="progressbar"
                aria-valuenow={overduePercent}
                aria-valuemin="0"
                aria-valuemax="100"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Overdue: ${stats.overdue} invoices (${overduePercent}%)`}
              ></div>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <small className="text-success">{paidPercent}% Paid</small>
              <small className="text-warning">{pendingPercent}% Pending</small>
              <small className="text-danger">{overduePercent}% Overdue</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
