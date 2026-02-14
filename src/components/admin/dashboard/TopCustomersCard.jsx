import StatWidgetSkeleton from "../../StatWidgetSkeleton";

export default function TopCustomersCard({ customers = [], loading }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Top Customers</h4>
        </div>

        <div className="card-body">
          {loading ? (
            <StatWidgetSkeleton />
          ) : customers.length === 0 ? (
            <p className="text-muted mb-0">No customer data available</p>
          ) : (
            <ul className="list-group">
              {customers.slice(0, 5).map((customer, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{customer.name}</strong>
                    <br />
                    <small className="text-muted">
                      {customer.invoices} invoices
                    </small>
                  </span>

                  <span className="text-primary">
                    <strong>₵{customer.total}</strong>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
