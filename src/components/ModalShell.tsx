"use client";

import { ReactNode } from "react";

type ModalShellProps = {
  children: ReactNode;
  onClose: () => void;
  title: string;
};

export function ModalShell({ children, onClose, title }: ModalShellProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#475467]/95 p-4">
      <div className="w-full max-w-[326px] overflow-hidden rounded-md bg-white shadow-xl">
        <div className="flex h-11 items-center justify-between border-b border-[#eaecf0] px-3">
          <h2 className="text-[11px] font-bold text-[#101828]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-6 w-6 cursor-pointer place-items-center text-sm leading-none text-[#98a2b3]"
            aria-label="Close modal"
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
