import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TimesheetModal } from "./TimesheetModal";
import { TimesheetEntry } from "@/lib/types";

afterEach(cleanup);

const incompleteEntry: TimesheetEntry = {
  id: "ts-test-1",
  weekNumber: 3,
  date: "2024-01-15",
  status: "Incomplete",
  hours: 28,
  notes: "Needs final task entry.",
};

describe("TimesheetModal", () => {
  it("seeds the status from the edited entry instead of forcing Completed", () => {
    render(
      <TimesheetModal
        entry={incompleteEntry}
        isSaving={false}
        onClose={vi.fn()}
        onSave={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    const status = screen.getByLabelText(/status/i) as HTMLSelectElement;
    expect(status.value).toBe("Incomplete");
    expect(screen.getByText("Edit Entry")).toBeTruthy();
  });

  it("blocks submission and shows a validation error when the date is empty", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);

    render(
      <TimesheetModal
        entry={undefined}
        isSaving={false}
        nextWeekNumber={13}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    // Brand-new entry starts with an empty date, so submitting is invalid.
    fireEvent.click(screen.getByRole("button", { name: /add entry/i }));

    expect(await screen.findByText(/valid week date/i)).toBeTruthy();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("submits a valid payload with the chosen field values", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);

    render(
      <TimesheetModal
        entry={incompleteEntry}
        isSaving={false}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await vi.waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        weekNumber: 3,
        date: "2024-01-15",
        status: "Incomplete",
      }),
    );
  });
});
