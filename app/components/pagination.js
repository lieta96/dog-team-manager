export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const visiblePages = new Set([1, totalPages, currentPage]);
  if (currentPage - 1 > 1) visiblePages.add(currentPage - 1);
  if (currentPage + 1 < totalPages) visiblePages.add(currentPage + 1);
  const sorted = [...visiblePages].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    pages.push(sorted[i]);
    if (sorted[i + 1] && sorted[i + 1] !== sorted[i] + 1) {
      pages.push("...");
    }
  }
  if (totalPages > 1)
    return (
      <div className="flex justify-center gap-8 items-center">
        <button
          className="button-tertiary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {pages.map((p, index) =>
            typeof p === "string" ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(p)}
                className={`px-2 py-1 rounded cursor-pointer ${
                  p === currentPage ? "bg-secondary font-bold" : ""
                }`}
              >
                {p}
              </button>
            )
          )}
        </span>
        <button
          className="button-tertiary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
}
