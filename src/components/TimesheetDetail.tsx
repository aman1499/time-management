"use client";

import { AppFooter } from "./AppFooter";
import { formatTimesheetRange } from "@/lib/timesheet-view";
import { TimesheetEntry } from "@/lib/types";

type TimesheetDetailProps = {
  entry: TimesheetEntry;
  onAddEntry: () => void;
  onBack: () => void;
};

export function TimesheetDetail({ entry, onAddEntry, onBack }: TimesheetDetailProps) {
  const days = ["Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25"];
  const taskCounts = [2, 3, 3, 3, 0];

  return (
    <>
      <section className="rounded-lg border border-[#d0d5dd] bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 cursor-pointer text-xs font-semibold text-[#2563eb]"
        >
          Back
        </button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold tracking-normal text-[#111827]">
              This week&apos;s timesheet
            </h1>
            <p className="mt-2 text-xs text-[#667085]">{formatTimesheetRange(entry.date)}</p>
          </div>
          <div className="w-40">
            <div className="mb-1 flex justify-between text-[10px] font-semibold text-[#344054]">
              <span>{entry.hours}/40 hrs</span>
              <span>100%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[#eaecf0]">
              <div className="h-full w-full bg-[#f97316]" />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {days.map((day, dayIndex) => (
            <div key={day} className="grid gap-4 sm:grid-cols-[64px_1fr]">
              <p className="pt-2 text-xs font-bold text-[#344054]">{day}</p>
              <div className="space-y-2">
                {Array.from({ length: taskCounts[dayIndex] }).map((_, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="flex h-9 items-center justify-between rounded border border-[#eaecf0] bg-white px-3 text-xs"
                  >
                    <span className="font-medium text-[#344054]">Homepage Development</span>
                    <span className="text-[#98a2b3]">
                      4 hrs{" "}
                      <span className="ml-2 rounded bg-[#eff6ff] px-2 py-1 text-[#2563eb]">
                        Project Name
                      </span>
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={onAddEntry}
                  className="h-9 w-full cursor-pointer rounded border border-dashed border-[#d0d5dd] bg-[#eff6ff] text-xs font-semibold text-[#2563eb]"
                >
                  + Add new task
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AppFooter />
    </>
  );
}
