import { TimesheetEntry, TimesheetInput } from "./types";
import { hasTimesheetErrors, validateTimesheetInput } from "./validation";

let timesheets: TimesheetEntry[] = [
  {
    id: "ts-2024-01",
    weekNumber: 1,
    date: "2024-01-01",
    status: "Completed",
    hours: 40,
    notes: "Homepage development and weekly review.",
  },
  {
    id: "ts-2024-02",
    weekNumber: 2,
    date: "2024-01-08",
    status: "Completed",
    hours: 40,
    notes: "Homepage development.",
  },
  {
    id: "ts-2024-03",
    weekNumber: 3,
    date: "2024-01-15",
    status: "Incomplete",
    hours: 28,
    notes: "Needs final task entry.",
  },
  {
    id: "ts-2024-04",
    weekNumber: 4,
    date: "2024-01-22",
    status: "Completed",
    hours: 40,
    notes: "Weekly tasks completed.",
  },
  {
    id: "ts-2024-05",
    weekNumber: 5,
    date: "2024-01-29",
    status: "Missing",
    hours: 0,
    notes: "",
  },
  {
    id: "ts-2024-06",
    weekNumber: 6,
    date: "2024-02-05",
    status: "Completed",
    hours: 39,
    notes: "Sprint delivery and regression checks.",
  },
  {
    id: "ts-2024-07",
    weekNumber: 7,
    date: "2024-02-12",
    status: "Incomplete",
    hours: 30,
    notes: "Pending review comments.",
  },
  {
    id: "ts-2024-08",
    weekNumber: 8,
    date: "2024-02-19",
    status: "Completed",
    hours: 40,
    notes: "Dashboard polish and release support.",
  },
  {
    id: "ts-2024-09",
    weekNumber: 9,
    date: "2024-02-26",
    status: "Missing",
    hours: 0,
    notes: "",
  },
  {
    id: "ts-2024-10",
    weekNumber: 10,
    date: "2024-03-04",
    status: "Completed",
    hours: 40,
    notes: "Timesheet QA and handoff.",
  },
  {
    id: "ts-2024-11",
    weekNumber: 11,
    date: "2024-03-11",
    status: "Incomplete",
    hours: 24,
    notes: "Needs missing project task.",
  },
  {
    id: "ts-2024-12",
    weekNumber: 12,
    date: "2024-03-18",
    status: "Completed",
    hours: 38,
    notes: "Client fixes and documentation.",
  },
];

export function listTimesheets() {
  return [...timesheets].sort((a, b) => a.weekNumber - b.weekNumber);
}

export function createTimesheet(input: TimesheetInput) {
  const errors = validateTimesheetInput(input);

  if (hasTimesheetErrors(errors)) {
    return { errors };
  }

  const entry: TimesheetEntry = {
    ...input,
    id: `ts-${Date.now()}`,
  };

  timesheets = [entry, ...timesheets];
  return { entry };
}

export function updateTimesheet(id: string, input: TimesheetInput) {
  const errors = validateTimesheetInput(input);

  if (hasTimesheetErrors(errors)) {
    return { errors };
  }

  const index = timesheets.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return { notFound: true };
  }

  const entry = { ...input, id };
  timesheets = timesheets.map((item) => (item.id === id ? entry : item));

  return { entry };
}

export function deleteTimesheet(id: string) {
  const exists = timesheets.some((entry) => entry.id === id);

  if (!exists) {
    return false;
  }

  timesheets = timesheets.filter((entry) => entry.id !== id);
  return true;
}
