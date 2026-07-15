"use client";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  pageSizeOptions?: number[];
  totalItems: number;
};

function getVisiblePageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    items.push("ellipsis-start");
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < totalPages - 1) {
    items.push("ellipsis-end");
  }

  items.push(totalPages);
  return items;
}

export function Pagination({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
  pageSizeOptions = [5, 10, 20],
  totalItems,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageItems = getVisiblePageItems(safeCurrentPage, totalPages);

  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <select
        value={pageSize}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
        className="h-9 w-[105px] cursor-pointer rounded-md border border-[#d0d5dd] bg-white px-3 text-xs font-medium text-[#344054] outline-none"
        aria-label="Rows per page"
      >
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>

      <div className="flex h-9 items-center overflow-hidden rounded-md border border-[#d0d5dd] text-xs font-medium text-[#344054]">
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
          className="h-full cursor-pointer border-r border-[#eaecf0] bg-white px-3 disabled:cursor-not-allowed disabled:text-[#98a2b3]"
        >
          Previous
        </button>

        {pageItems.map((item) =>
          typeof item === "number" ? (
            <button
              type="button"
              key={item}
              onClick={() => onPageChange(item)}
              className={`h-full cursor-pointer border-r border-[#eaecf0] px-3 last:border-r-0 ${
                item === safeCurrentPage ? "bg-[#eff6ff] text-[#2563eb]" : "bg-white"
              }`}
              aria-current={item === safeCurrentPage ? "page" : undefined}
            >
              {item}
            </button>
          ) : (
            <span
              key={item}
              className="flex h-full items-center border-r border-[#eaecf0] bg-white px-3 text-[#667085]"
            >
              ...
            </span>
          ),
        )}

        <button
          type="button"
          disabled={safeCurrentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, safeCurrentPage + 1))}
          className="h-full cursor-pointer bg-white px-3 disabled:cursor-not-allowed disabled:text-[#98a2b3]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
