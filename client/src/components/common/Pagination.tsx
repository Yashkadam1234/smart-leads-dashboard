import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const getPageNumbers = (
  currentPage: number,
  totalPages: number
): Array<number | "..."> => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const pages: Array<number | "..."> = [1];

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(
    currentPage,
    totalPages
  );

  return (
    <nav
      className="mt-6 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={
          currentPage <= 1 || isLoading
        }
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="
          flex items-center gap-2
          rounded-xl
          border border-white/10
          px-4 py-2
          text-sm text-slate-300
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50
          hover:border-cyan-400/40
        "
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 text-slate-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            disabled={isLoading}
            onClick={() =>
              onPageChange(page)
            }
            aria-current={
              page === currentPage
                ? "page"
                : undefined
            }
            className={`
              min-w-10
              rounded-xl
              border
              px-3 py-2
              text-sm
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
              ${
                page === currentPage
                  ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                  : "border-white/10 text-slate-300 hover:border-cyan-400/40"
              }
            `}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        disabled={
          currentPage >= totalPages ||
          isLoading
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="
          flex items-center gap-2
          rounded-xl
          border border-white/10
          px-4 py-2
          text-sm text-slate-300
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50
          hover:border-cyan-400/40
        "
      >
        Next
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}