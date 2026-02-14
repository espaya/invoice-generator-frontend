import { useEffect, useState } from "react";
import Spinner from "../../Spinner";

export default function TotalClients() {
  const apiBase = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    total: 0,
    clients_this_month: 0,
    top_client: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientsStats = async () => {
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
            total: data.total_clients || 0,
            clients_this_month: data.clients_this_month || 0,
            top_client: data.top_client || null,
          });
        }
      } catch (err) {
        console.error("Fetch clients stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientsStats();
  }, [apiBase]);

  const progress =
    stats.total > 0
      ? Math.round((stats.clients_this_month / stats.total) * 100)
      : 0;

  return (
    <div className="col-lg-4 col-sm-12">
      <div className="color-widget stat-widget p-20 mb-160 mb-30">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="d-flex align-items-center mb-20">
              <span className="icon">
                <i className="ri-user-3-line text-primary bg-primary-lighten fs-30 py-12 px-12 rounded me-20"></i>
              </span>

              <div>
                <p className="mb-0">
                  <strong>Total Clients</strong>
                </p>
                <h3 className="mb-0">{stats.total}</h3>
              </div>
            </div>

            <p className="mb-7">
              <strong>
                Top Client:{" "}
                {stats.top_client
                  ? `${stats.top_client.name} (${stats.top_client.invoices_count})`
                  : "No invoices yet"}
              </strong>
            </p>

            <p>
              <strong>Clients This Month: {stats.clients_this_month}</strong>
            </p>

            <div className="progress">
              <div
                className="progress-bar bg-primary"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            <small className="text-muted d-block mt-2">
              {progress}% of clients added this month
            </small>
          </>
        )}
      </div>
    </div>
  );
}
