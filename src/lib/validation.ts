import { TimesheetInput, TimesheetStatus, timesheetStatuses } from "./types";

export type TimesheetErrors = Partial<Record<keyof TimesheetInput, string>>;

/**
 * Validates a timesheet payload. Written defensively so it is safe to run
 * against untrusted request bodies at the API boundary as well as the client
 * form — missing or wrong-typed fields produce a field error rather than a throw.
 */
export function validateTimesheetInput(input: Partial<TimesheetInput>): TimesheetErrors {
  const errors: TimesheetErrors = {};

  if (
    typeof input.weekNumber !== "number" ||
    !Number.isInteger(input.weekNumber) ||
    input.weekNumber < 1 ||
    input.weekNumber > 53
  ) {
    errors.weekNumber = "Week number must be between 1 and 53.";
  }

  if (!input.date || Number.isNaN(Date.parse(input.date))) {
    errors.date = "Choose a valid week date.";
  }

  if (!timesheetStatuses.includes(input.status as TimesheetStatus)) {
    errors.status = "Choose a valid status.";
  }

  if (
    typeof input.hours !== "number" ||
    !Number.isFinite(input.hours) ||
    input.hours < 0 ||
    input.hours > 80
  ) {
    errors.hours = "Hours must be between 0 and 80.";
  }

  if ((input.notes ?? "").length > 160) {
    errors.notes = "Notes must be 160 characters or less.";
  }

  return errors;
}

export function hasTimesheetErrors(errors: TimesheetErrors) {
  return Object.keys(errors).length > 0;
}
