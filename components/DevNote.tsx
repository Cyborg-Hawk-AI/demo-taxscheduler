"use client";

import { Info } from "lucide-react";
import { useState } from "react";

interface DevNoteProps {
  note: string;
  label?: string;
}

export default function DevNote({ note, label = "DEV NOTE" }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
        aria-label="Developer note"
      >
        <Info className="w-3 h-3" />
        {label}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute z-50 top-full left-0 mt-2 w-72 p-3 rounded-lg bg-surface-700 border border-amber-500/30 shadow-xl text-xs text-gray-300 leading-relaxed">
            <p className="font-semibold text-amber-400 mb-1">{label}</p>
            {note}
          </div>
        </>
      )}
    </span>
  );
}
