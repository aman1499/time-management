import { TimesheetStatus } from "@/lib/types";

const statusStyles: Record<TimesheetStatus, string> = {
  Completed: "bg-[#d7f7e8] text-[#047857]",
  Incomplete: "bg-[#fff2ba] text-[#9a6700]",
  Missing: "bg-[#ffe1ef] text-[#be185d]",
};

export function StatusBadge({ status }: { status: TimesheetStatus }) {
  return (
    <span
      className={`inline-flex h-5 items-center rounded-md px-2 text-[10px] font-semibold uppercase ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
