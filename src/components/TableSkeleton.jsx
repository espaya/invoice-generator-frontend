export default function TableSkeleton() {
  return [...Array(5)].map((_, i) => (
    <div className="rtable-row" key={i}>
      <div className="rtable-cell topic-cell">
        <div className="placeholder-glow">
          <span className="placeholder col-8"></span>
        </div>
      </div>
      <div className="rtable-cell category-cell">
        <div className="placeholder-glow">
          <span className="placeholder col-10"></span>
        </div>
      </div>
      <div className="rtable-cell ranking-cell">
        <div className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </div>
      </div>
      <div className="rtable-cell impression-cell">
        <div className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </div>
      </div>
      <div className="rtable-cell sales-cell">
        <div className="placeholder-glow">
          <span className="placeholder col-5"></span>
        </div>
      </div>
    </div>
  ));
}
