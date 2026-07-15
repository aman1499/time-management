"use client";

import { FormEvent, useMemo, useState } from "react";
import { ModalShell } from "./ModalShell";
import { TimesheetEntry, TimesheetInput, timesheetStatuses } from "@/lib/types";
import {
  TimesheetErrors,
  hasTimesheetErrors,
  validateTimesheetInput,
} from "@/lib/validation";

type Props = {
  entry?: TimesheetEntry;
  isSaving: boolean;
  /** Suggested week number when adding a brand-new entry. */
  nextWeekNumber?: number;
  onClose: () => void;
  onSave: (input: TimesheetInput) => Promise<TimesheetErrors | void>;
};

export function TimesheetModal({
  entry,
  isSaving,
  nextWeekNumber,
  onClose,
  onSave,
}: Props) {
  const initialValues = useMemo<TimesheetInput>(
    () => ({
      weekNumber: entry?.weekNumber ?? nextWeekNumber ?? 1,
      date: entry?.date ?? "",
      status: entry?.status ?? "Incomplete",
      hours: entry?.hours ?? 0,
      notes: entry?.notes ?? "",
    }),
    [entry, nextWeekNumber],
  );
  const [values, setValues] = useState<TimesheetInput>(initialValues);
  const [project, setProject] = useState("Homepage Development");
  const [workType, setWorkType] = useState("Bug fixes");
  const [errors, setErrors] = useState<TimesheetErrors>({});

  const isEditing = Boolean(entry);

  function setField<Key extends keyof TimesheetInput>(
    key: Key,
    value: TimesheetInput[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear the field-level error as soon as the user edits it.
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValues: TimesheetInput = {
      ...values,
      notes: values.notes.trim() || `${project} - ${workType}`,
    };
    const nextErrors = validateTimesheetInput(nextValues);

    if (hasTimesheetErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }

    const serverErrors = await onSave(nextValues);

    if (serverErrors) {
      setErrors(serverErrors);
    }
  }

  return (
    <ModalShell onClose={onClose} title={isEditing ? "Edit Entry" : "Add New Entry"}>
      <form className="space-y-3 px-3 py-3" onSubmit={handleSubmit} noValidate>
        <div className="flex gap-2">
          <label className="block flex-1 space-y-1">
            <span className="text-[9px] font-semibold text-[#344054]">Week # *</span>
            <input
              type="number"
              min={1}
              max={53}
              value={values.weekNumber}
              onChange={(event) => setField("weekNumber", Number(event.target.value))}
              className="h-8 w-full rounded border border-[#d0d5dd] px-2 text-[10px] text-[#344054] outline-none focus:border-[#2563eb]"
            />
            {errors.weekNumber ? (
              <span className="block text-[9px] font-medium text-rose-600">
                {errors.weekNumber}
              </span>
            ) : null}
          </label>

          <label className="block flex-1 space-y-1">
            <span className="text-[9px] font-semibold text-[#344054]">Week starting *</span>
            <input
              type="date"
              value={values.date}
              onChange={(event) => setField("date", event.target.value)}
              className="h-8 w-full rounded border border-[#d0d5dd] px-2 text-[10px] text-[#344054] outline-none focus:border-[#2563eb]"
            />
            {errors.date ? (
              <span className="block text-[9px] font-medium text-rose-600">
                {errors.date}
              </span>
            ) : null}
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-[9px] font-semibold text-[#344054]">Status *</span>
          <select
            value={values.status}
            onChange={(event) =>
              setField("status", event.target.value as TimesheetInput["status"])
            }
            className="h-8 w-full cursor-pointer rounded border border-[#d0d5dd] bg-white px-2 text-[10px] text-[#667085] outline-none focus:border-[#2563eb]"
          >
            {timesheetStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-[9px] font-semibold text-[#344054]">Select Project *</span>
          <select
            value={project}
            onChange={(event) => setProject(event.target.value)}
            className="h-8 w-full cursor-pointer rounded border border-[#d0d5dd] bg-white px-2 text-[10px] text-[#667085] outline-none focus:border-[#2563eb]"
          >
            <option>Homepage Development</option>
            <option>Landing Page</option>
            <option>Dashboard QA</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-[9px] font-semibold text-[#344054]">Type of Work *</span>
          <select
            value={workType}
            onChange={(event) => setWorkType(event.target.value)}
            className="h-8 w-full cursor-pointer rounded border border-[#d0d5dd] bg-white px-2 text-[10px] text-[#667085] outline-none focus:border-[#2563eb]"
          >
            <option>Bug fixes</option>
            <option>Feature work</option>
            <option>Design polish</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-[9px] font-semibold text-[#344054]">Task description *</span>
          <textarea
            rows={4}
            value={values.notes}
            onChange={(event) => setField("notes", event.target.value)}
            className="w-full resize-none rounded border border-[#d0d5dd] px-2 py-2 text-[10px] text-[#344054] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb]"
            placeholder="Write text here ..."
          />
          {errors.notes ? (
            <span className="text-[9px] font-medium text-rose-600">{errors.notes}</span>
          ) : null}
        </label>

        <div className="space-y-1">
          <p className="text-[9px] font-semibold text-[#344054]">Hours *</p>
          <div className="inline-flex h-7 overflow-hidden rounded border border-[#d0d5dd]">
            <button
              type="button"
              aria-label="Decrease hours"
              className="w-7 cursor-pointer bg-[#f9fafb] text-xs text-[#667085]"
              onClick={() => setField("hours", Math.max(0, values.hours - 1))}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max="80"
              aria-label="Hours"
              value={values.hours}
              onChange={(event) => setField("hours", Number(event.target.value))}
              className="w-9 border-x border-[#d0d5dd] text-center text-[10px] outline-none"
            />
            <button
              type="button"
              aria-label="Increase hours"
              className="w-7 cursor-pointer bg-[#f9fafb] text-xs text-[#667085]"
              onClick={() => setField("hours", Math.min(80, values.hours + 1))}
            >
              +
            </button>
          </div>
          {errors.hours ? (
            <span className="block text-[9px] font-medium text-rose-600">{errors.hours}</span>
          ) : null}
        </div>

        <div className="-mx-3 mt-2 flex border-t border-[#eaecf0] px-3 pt-3">
          <button
            type="submit"
            disabled={isSaving}
            className="h-8 flex-1 cursor-pointer rounded bg-[#2563eb] text-[10px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#93b4f6]"
          >
            {isSaving ? "Saving..." : isEditing ? "Save changes" : "Add entry"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-8 flex-1 cursor-pointer text-[10px] font-semibold text-[#344054]"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
