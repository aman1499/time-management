export type TimesheetStatus = "Completed" | "Incomplete" | "Missing";

export type TimesheetEntry = {
  id: string;
  weekNumber: number;
  date: string;
  status: TimesheetStatus;
  hours: number;
  notes: string;
};

export type TimesheetInput = Omit<TimesheetEntry, "id">;

export const timesheetStatuses: TimesheetStatus[] = [
  "Completed",
  "Incomplete",
  "Missing",
];
