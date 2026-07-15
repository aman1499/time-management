import { TimesheetEntry } from "./types";

export type DateFilter = "all" | "jan-1-14" | "jan-15-31";

export function formatTimesheetRange(date: string) {
  const start = new Date(`${date}T00:00:00`);
  const end = new Date(start);
  end.setDate(start.getDate() + 4);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.toLocaleString("en-US", { month: "long" });
  const endMonth = end.toLocaleString("en-US", { month: "long" });
  const year = end.getFullYear();

  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth}, ${year}`;
  }

  return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${year}`;
}

export function getTimesheetActionLabel(entry: TimesheetEntry) {
  if (entry.status === "Missing") {
    return "Create";
  }

  if (entry.status === "Incomplete") {
    return "Update";
  }

  return "View";
}

export function matchesDateFilter(entry: TimesheetEntry, dateFilter: DateFilter) {
  const entryTime = new Date(`${entry.date}T00:00:00`).getTime();

  if (dateFilter === "jan-1-14") {
    return (
      entryTime >= new Date("2024-01-01T00:00:00").getTime() &&
      entryTime <= new Date("2024-01-14T23:59:59").getTime()
    );
  }

  if (dateFilter === "jan-15-31") {
    return (
      entryTime >= new Date("2024-01-15T00:00:00").getTime() &&
      entryTime <= new Date("2024-01-31T23:59:59").getTime()
    );
  }

  return true;
}
