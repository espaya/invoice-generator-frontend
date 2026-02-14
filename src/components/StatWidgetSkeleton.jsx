export default function StatWidgetSkeleton() {
  return (
    <>
      {/* ICON + TITLE */}
      <div className="d-flex align-items-center mb-20">
        <span className="icon me-20">
          <span
            className="placeholder rounded"
            style={{ width: "55px", height: "55px", display: "block" }}
          ></span>
        </span>

        <div className="placeholder-glow w-100">
          <span className="placeholder col-6 mb-2"></span>
          <h3 className="mb-0">
            <span className="placeholder col-4"></span>
          </h3>
        </div>
      </div>

      {/* TEXT */}
      <div className="placeholder-glow mb-10">
        <span className="placeholder col-10"></span>
      </div>

      <div className="placeholder-glow mb-20">
        <span className="placeholder col-7"></span>
      </div>

      {/* PROGRESS */}
      <div className="progress mb-2">
        <div
          className="progress-bar placeholder"
          style={{ width: "100%" }}
        ></div>
      </div>

      <div className="placeholder-glow">
        <span className="placeholder col-6"></span>
      </div>
    </>
  );
}
