"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { HOLIDAYS, type Holiday } from "@/lib/holidays";
import { cn } from "@/lib/utils";

export function HolidaySelector({
  selected,
  onSelect,
  dark,
}: {
  selected: Holiday;
  onSelect: (id: string) => void;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed top-4 left-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg transition-colors sm:text-sm",
          dark
            ? "border-white/15 bg-black/40 text-white/90 hover:bg-black/55"
            : "border-black/10 bg-white/70 text-slate-800 hover:bg-white/90"
        )}
      >
        <span>{selected.shortLabel}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-full left-0 mt-2 w-56 overflow-hidden rounded-xl border shadow-xl backdrop-blur-md",
              dark
                ? "border-white/15 bg-black/70 text-white/90"
                : "border-black/10 bg-white/90 text-slate-800"
            )}
          >
            {HOLIDAYS.map((holiday) => {
              const isSelected = holiday.id === selected.id;
              return (
                <button
                  key={holiday.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelect(holiday.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors",
                    dark ? "hover:bg-white/10" : "hover:bg-black/5",
                    isSelected && (dark ? "bg-white/10" : "bg-black/5")
                  )}
                >
                  <span className="flex flex-col">
                    <span className="font-medium">{holiday.label}</span>
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-wide",
                        dark ? "text-white/50" : "text-slate-500"
                      )}
                    >
                      {holiday.tagline}
                    </span>
                  </span>
                  {isSelected && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
