import Spinner from "../../Spinner";

export default function OverdueInvoicesCard({ overdueInvoices = [], loading }) {
  return (
    <div className="col-md-4">
      <div className="card border-danger">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="card-header">
              <h4 className="card-title text-danger">Overdue Invoices</h4>
            </div>

            <div className="card-body">
              {overdueInvoices.length === 0 ? (
                <p className="text-muted mb-0">No overdue invoices 🎉</p>
              ) : (
                <ul className="list-group">
                  {overdueInvoices.slice(0, 5).map((inv, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{inv.invoice_number}</strong>
                        <br />
                        <small className="text-danger">
                          Due: {inv.due_date}
                        </small>
                      </div>

                      <span className="text-danger">
                        <strong>₵{inv.total}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
