"use client";

import { useMemo, useState } from "react";
import { AppFooter } from "./AppFooter";
import { Pagination } from "./Pagination";
import { TimesheetFilters } from "./TimesheetFilters";
import { TimesheetTable } from "./TimesheetTable";
import { DateFilter, matchesDateFilter } from "@/lib/timesheet-view";
import { TimesheetEntry, TimesheetStatus } from "@/lib/types";

type TimesheetListProps = {
  entries: TimesheetEntry[];
  error: string;
  isLoading: boolean;
  onAction: (entry: TimesheetEntry) => void;
  onAddEntry: () => void;
};

export function TimesheetList({
  entries,
  error,
  isLoading,
  onAction,
  onAddEntry,
}: TimesheetListProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [statusFilter, setStatusFilter] = useState<TimesheetStatus | "all">("all");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
        return matchesStatus && matchesDateFilter(entry, dateFilter);
      }),
    [dateFilter, entries, statusFilter],
  );
  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedEntries = filteredEntries.slice(firstRowIndex, firstRowIndex + pageSize);

  function updateDateFilter(value: DateFilter) {
    setDateFilter(value);
    setCurrentPage(1);
  }

  function updateStatusFilter(value: TimesheetStatus | "all") {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function updatePageSize(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  return (
    <>
      <section className="rounded-lg border border-[#d0d5dd] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-normal text-[#111827]">Your Timesheets</h1>
          <button
            type="button"
            onClick={onAddEntry}
            className="h-10 cursor-pointer rounded-md bg-[#2563eb] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
          >
            + Add Entry
          </button>
        </div>

        <TimesheetFilters
          dateFilter={dateFilter}
          onDateFilterChange={updateDateFilter}
          onStatusFilterChange={updateStatusFilter}
          statusFilter={statusFilter}
        />

        {error ? (
          <div className="mt-5 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <TimesheetTable
          entries={paginatedEntries}
          hasFilteredEntries={filteredEntries.length > 0}
          isLoading={isLoading}
          onAction={onAction}
        />

        <Pagination
          currentPage={safeCurrentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={updatePageSize}
          pageSize={pageSize}
          totalItems={filteredEntries.length}
        />
      </section>

      <AppFooter />
    </>
  );
}
