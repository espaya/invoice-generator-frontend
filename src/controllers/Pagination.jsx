export default function Pagination({ currentPage, lastPage, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= lastPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-20 d-flex justify-content-center gap-2">
      <button
        className="btn btn-sm btn-outline-primary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo; Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-sm btn-outline-primary"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  );
}
