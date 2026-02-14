import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import CompanySettings from "../../../controllers/CompanySettingsController";
import formatMoney from "../../../utils/FormatMoney";

export default function TotalRevenue() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [companySettings, setCompanySettings] = useState({});
  const [stats, setStats] = useState({
    total_revenue: 0,
    paid_revenue: 0,
    pending_revenue: 0,
    overdue_revenue: 0,
  });

  // Fetch company settings (currency symbol)
  useEffect(() => {
    CompanySettings(setLoading, apiBase, setCompanySettings);
  }, [apiBase]);

  // Fetch revenue stats
  useEffect(() => {
    const fetchRevenueStats = async () => {
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
            total_revenue: Number(data.total_revenue) || 0,
            paid_revenue: Number(data.paid_revenue) || 0,
            pending_revenue: Number(data.pending_revenue) || 0,
            overdue_revenue: Number(data.overdue_revenue) || 0,
          });
        }
      } catch (err) {
        console.error("Fetch revenue stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueStats();
  }, [apiBase]);

  const total = stats.total_revenue;

  const paidPercent = total > 0 ? (stats.paid_revenue / total) * 100 : 0;
  const pendingPercent = total > 0 ? (stats.pending_revenue / total) * 100 : 0;
  const overduePercent = total > 0 ? (stats.overdue_revenue / total) * 100 : 0;

  const collectedPercent = total > 0 ? Math.round(paidPercent) : 0;

  return (
    <div className="col-lg-4 col-sm-12">
      <div className="stat-widget p-20 mb-160 mb-30">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="d-flex align-items-center mb-20">
              <span className="icon">
                <i className="ri-money-dollar-circle-line text-danger bg-danger-lighten fs-30 py-12 px-12 rounded me-20"></i>
              </span>

              <div>
                <p className="mb-0">
                  <strong>Total Revenue</strong>
                </p>

                <h3 className="mb-0">
                  {companySettings.currency_symbol}
                  {formatMoney(stats.total_revenue)}
                </h3>
              </div>
            </div>

            <p className="mb-7">
              <strong className="text-success">
                Paid: {companySettings.currency_symbol}
                {formatMoney(stats.paid_revenue)}
              </strong>
            </p>

            <p className="mb-7">
              <strong className="text-warning">
                Pending: {companySettings.currency_symbol}
                {formatMoney(stats.pending_revenue)}
              </strong>
            </p>

            <p>
              <strong className="text-danger">
                Overdue: {companySettings.currency_symbol}
                {formatMoney(stats.overdue_revenue)}
              </strong>
            </p>

            {/* STACKED PROGRESS BAR */}
            <div className="progress d-flex" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${paidPercent}%` }}
                title={`Paid: ${companySettings.currency_symbol}${formatMoney(
                  stats.paid_revenue,
                )} (${paidPercent.toFixed(1)}%)`}
              ></div>

              <div
                className="progress-bar bg-warning"
                style={{ width: `${pendingPercent}%` }}
                title={`Pending: ${companySettings.currency_symbol}${formatMoney(
                  stats.pending_revenue,
                )} (${pendingPercent.toFixed(1)}%)`}
              ></div>

              <div
                className="progress-bar bg-danger"
                style={{ width: `${overduePercent}%` }}
                title={`Overdue: ${companySettings.currency_symbol}${formatMoney(
                  stats.overdue_revenue,
                )} (${overduePercent.toFixed(1)}%)`}
              ></div>
            </div>

            {/* PERCENTAGES UNDER PROGRESS BAR */}
            <div className="d-flex justify-content-between mt-2">
              <small className="text-success">
                {paidPercent.toFixed(1)}% Paid
              </small>

              <small className="text-warning">
                {pendingPercent.toFixed(1)}% Pending
              </small>

              <small className="text-danger">
                {overduePercent.toFixed(1)}% Overdue
              </small>
            </div>

            <small className="text-muted d-block mt-10">
              {collectedPercent}% of revenue collected
            </small>
          </>
        )}
      </div>
    </div>
  );
}
