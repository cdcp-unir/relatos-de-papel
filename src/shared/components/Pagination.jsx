export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="join">
      <button
        className="join-item btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        «
      </button>

      <button
        className="join-item btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {pages[0] > 1 && (
        <button className="join-item btn btn-sm btn-disabled">...</button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm ${
            page === currentPage ? "btn-primary" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <button className="join-item btn btn-sm btn-disabled">...</button>
      )}

      <button
        className="join-item btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>

      <button
        className="join-item btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        »
      </button>
    </div>
  );
}