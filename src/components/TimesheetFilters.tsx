"use client";

import { DateFilter } from "@/lib/timesheet-view";
import { TimesheetStatus, timesheetStatuses } from "@/lib/types";

type TimesheetFiltersProps = {
  dateFilter: DateFilter;
  onDateFilterChange: (value: DateFilter) => void;
  onStatusFilterChange: (value: TimesheetStatus | "all") => void;
  statusFilter: TimesheetStatus | "all";
};

export function TimesheetFilters({
  dateFilter,
  onDateFilterChange,
  onStatusFilterChange,
  statusFilter,
}: TimesheetFiltersProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <select
        value={dateFilter}
        onChange={(event) => onDateFilterChange(event.target.value as DateFilter)}
        className="h-10 w-[140px] cursor-pointer rounded-md border border-[#d0d5dd] bg-white px-3 text-xs font-medium text-[#667085] outline-none"
        aria-label="Filter by date range"
      >
        <option value="all">Date Range</option>
        <option value="jan-1-14">1 - 14 Jan</option>
        <option value="jan-15-31">15 - 31 Jan</option>
      </select>

      <select
        value={statusFilter}
        onChange={(event) => onStatusFilterChange(event.target.value as TimesheetStatus | "all")}
        className="h-10 w-[130px] cursor-pointer rounded-md border border-[#d0d5dd] bg-white px-3 text-xs font-medium text-[#667085] outline-none"
        aria-label="Filter by status"
      >
        <option value="all">Status</option>
        {timesheetStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
