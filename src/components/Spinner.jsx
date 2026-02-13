export default function Spinner() {
  return (
    <>
      <div className="row">
        {/* LOGO SKELETON */}
        <div className="col-md-12 mb-20 d-flex justify-content-center">
          <div
            className="placeholder rounded-circle"
            style={{ width: "120px", height: "120px" }}
          ></div>
        </div>

        {/* INPUT SKELETONS */}
        {[...Array(8)].map((_, i) => (
          <div className="col-md-6 mb-16" key={i}>
            <div className="placeholder-glow">
              <span className="placeholder col-4 mb-2"></span>
              <span
                className="placeholder col-12"
                style={{ height: "38px" }}
              ></span>
            </div>
          </div>
        ))}

        {/* TEXTAREA SKELETON */}
        <div className="col-md-12 mb-16">
          <div className="placeholder-glow">
            <span className="placeholder col-4 mb-2"></span>
            <span
              className="placeholder col-12"
              style={{ height: "90px" }}
            ></span>
          </div>
        </div>

        {/* FILE UPLOAD SKELETON */}
        <div className="col-md-12 mb-16">
          <div className="placeholder-glow">
            <span className="placeholder col-4 mb-2"></span>
            <div
              className="placeholder col-12"
              style={{ height: "120px", borderRadius: "10px" }}
            ></div>
          </div>
        </div>

        {/* BUTTON SKELETON */}
        <div className="col-md-4 mt-3">
          <span
            className="placeholder col-12"
            style={{ height: "40px" }}
          ></span>
        </div>
      </div>
    </>
  );
}
