import { TimesheetEntry, TimesheetInput } from "./types";
import { TimesheetErrors } from "./validation";

export const timesheetQueryKey = ["timesheets"] as const;

type TimesheetsResponse = {
  data: TimesheetEntry[];
};

type TimesheetResponse = {
  data?: TimesheetEntry;
  errors?: TimesheetErrors;
  message?: string;
};

export class TimesheetValidationError extends Error {
  constructor(public errors: TimesheetErrors) {
    super("Timesheet validation failed.");
  }
}

async function parseTimesheetResponse(response: Response) {
  const result = (await response.json()) as TimesheetResponse;

  if (response.status === 422) {
    throw new TimesheetValidationError(result.errors ?? {});
  }

  if (!response.ok || !result.data) {
    throw new Error(result.message ?? "Unable to save timesheet.");
  }

  return result.data;
}

export async function fetchTimesheets() {
  const response = await fetch("/api/timesheets", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to load timesheets.");
  }

  const result = (await response.json()) as TimesheetsResponse;
  return result.data;
}

export async function createTimesheet(input: TimesheetInput) {
  const response = await fetch("/api/timesheets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return parseTimesheetResponse(response);
}

export async function updateTimesheet(id: string, input: TimesheetInput) {
  const response = await fetch(`/api/timesheets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return parseTimesheetResponse(response);
}
