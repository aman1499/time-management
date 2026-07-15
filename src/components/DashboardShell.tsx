"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { DashboardHeader } from "./DashboardHeader";
import { TimesheetDetail } from "./TimesheetDetail";
import { TimesheetList } from "./TimesheetList";
import { TimesheetModal } from "./TimesheetModal";
import {
  createTimesheet,
  fetchTimesheets,
  TimesheetValidationError,
  timesheetQueryKey,
  updateTimesheet,
} from "@/lib/timesheet-api";
import { TimesheetEntry, TimesheetInput } from "@/lib/types";
import { TimesheetErrors } from "@/lib/validation";

export function DashboardShell({ userName }: { userName: string }) {
  const queryClient = useQueryClient();
  const [activeEntry, setActiveEntry] = useState<TimesheetEntry | undefined>();
  const [detailEntry, setDetailEntry] = useState<TimesheetEntry | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const timesheetsQuery = useQuery({
    queryKey: timesheetQueryKey,
    queryFn: fetchTimesheets,
  });
  const saveMutation = useMutation({
    mutationFn: (input: TimesheetInput) =>
      activeEntry ? updateTimesheet(activeEntry.id, input) : createTimesheet(input),
    onError: (err) => {
      if (err instanceof TimesheetValidationError) {
        return;
      }

      setError(err instanceof Error ? err.message : "Something went wrong.");
    },
    onSuccess: async (entry) => {
      if (detailEntry?.id === entry.id) {
        setDetailEntry(entry);
      }

      closeModal();
      await queryClient.invalidateQueries({ queryKey: timesheetQueryKey });
    },
  });
  const entries = timesheetsQuery.data ?? [];
  const listError =
    error ||
    (timesheetsQuery.error instanceof Error ? timesheetsQuery.error.message : "");
  const nextWeekNumber =
    entries.reduce((max, entry) => Math.max(max, entry.weekNumber), 0) + 1;

  function handleTimesheetAction(entry: TimesheetEntry) {
    if (entry.status === "Completed") {
      setDetailEntry(entry);
      return;
    }

    setActiveEntry(entry);
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setActiveEntry(undefined);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setActiveEntry(undefined);
  }

  async function saveTimesheet(input: TimesheetInput): Promise<TimesheetErrors | void> {
    setError("");

    try {
      await saveMutation.mutateAsync(input);
    } catch (err) {
      if (err instanceof TimesheetValidationError) {
        return err.errors;
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111827]">
      <DashboardHeader
        onBrandClick={() => setDetailEntry(undefined)}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
        userName={userName}
      />

      <div className="mx-auto w-full max-w-[1160px] px-4 py-7">
        {detailEntry ? (
          <TimesheetDetail
            entry={detailEntry}
            onBack={() => setDetailEntry(undefined)}
            onAddEntry={() => {
              setActiveEntry(detailEntry);
              setIsModalOpen(true);
            }}
          />
        ) : (
          <TimesheetList
            entries={entries}
            error={listError}
            isLoading={timesheetsQuery.isLoading}
            onAction={handleTimesheetAction}
            onAddEntry={openCreateModal}
          />
        )}
      </div>

      {isModalOpen ? (
        <TimesheetModal
          entry={activeEntry}
          isSaving={saveMutation.isPending}
          nextWeekNumber={nextWeekNumber}
          onClose={closeModal}
          onSave={saveTimesheet}
        />
      ) : null}
    </main>
  );
}
