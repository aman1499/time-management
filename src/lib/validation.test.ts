import { describe, expect, it } from "vitest";
import { validateTimesheetInput } from "./validation";

describe("validateTimesheetInput", () => {
  it("accepts a valid weekly timesheet", () => {
    expect(
      validateTimesheetInput({
        weekNumber: 12,
        date: "2025-03-17",
        status: "Completed",
        hours: 40,
        notes: "Submitted on time.",
      }),
    ).toEqual({});
  });

  it("returns field errors for invalid data", () => {
    const errors = validateTimesheetInput({
      weekNumber: 0,
      date: "not-a-date",
      status: "Missing",
      hours: 90,
      notes: "x".repeat(161),
    });

    expect(errors.weekNumber).toBeDefined();
    expect(errors.date).toBeDefined();
    expect(errors.hours).toBeDefined();
    expect(errors.notes).toBeDefined();
  });
});
