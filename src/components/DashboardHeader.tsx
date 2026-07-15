"use client";

type DashboardHeaderProps = {
  onBrandClick: () => void;
  onSignOut: () => void;
  userName: string;
};

export function DashboardHeader({ onBrandClick, onSignOut, userName }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between bg-white px-5 shadow-[0_1px_0_#eaecf0]">
      <div className="flex items-center gap-10">
        <button
          type="button"
          onClick={onBrandClick}
          className="cursor-pointer text-xl font-bold tracking-normal text-[#111827]"
        >
          ticktock
        </button>
        <span className="text-xs font-semibold text-[#111827]">Timesheets</span>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="cursor-pointer text-sm font-medium text-[#344054]"
      >
        {userName || "John Doe"} <span className="text-[#667085]">v</span>
      </button>
    </header>
  );
}
