"use client";

import { StatusBadge } from "./StatusBadge";
import {
  formatTimesheetRange,
  getTimesheetActionLabel,
} from "@/lib/timesheet-view";
import { TimesheetEntry } from "@/lib/types";

type TimesheetTableProps = {
  entries: TimesheetEntry[];
  hasFilteredEntries: boolean;
  isLoading: boolean;
  onAction: (entry: TimesheetEntry) => void;
};

export function TimesheetTable({
  entries,
  hasFilteredEntries,
  isLoading,
  onAction,
}: TimesheetTableProps) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#eaecf0]">
      <table className="w-full min-w-[700px] border-collapse text-left">
        <thead className="bg-[#f9fafb] text-[10px] font-bold uppercase text-[#667085]">
          <tr>
            <th className="w-[100px] px-3 py-4">Week # <span className="ml-4">v</span></th>
            <th className="px-3 py-4">Date <span className="ml-4">v</span></th>
            <th className="px-3 py-4">Status <span className="ml-4">v</span></th>
            <th className="w-[110px] px-3 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eaecf0] text-sm">
          {isLoading ? (
            <tr>
              <td className="px-3 py-6 text-center text-[#667085]" colSpan={4}>
                Loading timesheets...
              </td>
            </tr>
          ) : null}

          {!isLoading && !hasFilteredEntries ? (
            <tr>
              <td className="px-3 py-6 text-center text-[#667085]" colSpan={4}>
                No timesheets match the selected filters.
              </td>
            </tr>
          ) : null}

          {entries.map((entry) => (
            <tr key={entry.id} className="h-[51px] hover:bg-[#f9fafb]">
              <td className="bg-[#f9fafb] px-3 text-sm font-medium text-[#344054]">
                {entry.weekNumber}
              </td>
              <td className="px-3 text-sm text-[#667085]">
                {formatTimesheetRange(entry.date)}
              </td>
              <td className="px-3">
                <StatusBadge status={entry.status} />
              </td>
              <td className="px-3 text-right">
                <button
                  type="button"
                  onClick={() => onAction(entry)}
                  className="cursor-pointer text-sm font-medium text-[#2563eb]"
                >
                  {getTimesheetActionLabel(entry)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
