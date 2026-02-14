import Spinner from "../../Spinner";

export default function DueSoonInvoicesCard({ invoices = [], loading }) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Invoices Due Soon</h4>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="card-body">
            {invoices.length === 0 ? (
              <p className="text-muted mb-0">No upcoming invoices</p>
            ) : (
              <ul className="list-group">
                {invoices.slice(0, 5).map((inv, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{inv.invoice_number}</strong>
                      <br />
                      <small className="text-muted">Due: {inv.due_date}</small>
                    </div>

                    <span className="text-warning">
                      <strong>₵{inv.total}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
