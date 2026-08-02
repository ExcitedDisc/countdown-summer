"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palmtree, Sun, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TARGET_DATE = new Date("2026-09-02T08:30:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: false,
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const padded = value.toString().padStart(2, "0");

  return (
    <Card className="w-20 sm:w-28 border-amber-200/70 bg-white/70 shadow-lg shadow-amber-900/5 backdrop-blur-sm py-0">
      <CardContent className="flex flex-col items-center justify-center gap-1 px-2 py-4 sm:py-6">
        <div className="relative h-10 sm:h-14 w-full overflow-hidden text-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={padded}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center font-mono text-3xl sm:text-5xl font-semibold tabular-nums bg-gradient-to-b from-orange-600 to-amber-500 bg-clip-text text-transparent"
            >
              {padded}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-900/60">
          {label}
        </span>
      </CardContent>
    </Card>
  );
}

function FloatingBlob({
  className,
  duration,
}: {
  className: string;
  duration: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTarget = useMemo(
    () =>
      TARGET_DATE.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    []
  );

  return (
    <>
      <FloatingBlob
        className="-top-24 -left-24 h-72 w-72 bg-amber-300/40"
        duration={10}
      />
      <FloatingBlob
        className="-bottom-24 -right-16 h-80 w-80 bg-sky-300/40"
        duration={12}
      />
      <FloatingBlob
        className="top-1/3 right-1/4 h-56 w-56 bg-orange-300/30"
        duration={14}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex w-full flex-col items-center gap-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="size-10 text-amber-500" strokeWidth={1.5} />
        </motion.div>

        <Badge className="border-amber-200 bg-amber-100 px-3 py-1 text-xs tracking-wide text-amber-800">
          {formattedTarget}
        </Badge>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="bg-gradient-to-r from-amber-600 via-orange-500 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
            The Last Days of Summer
          </h1>
          <p className="max-w-md text-sm text-amber-900/70 sm:text-base">
            Every second counting down until summer holiday ends.
          </p>
        </div>

        <Separator className="w-24 bg-amber-200" />

        {timeLeft?.isComplete ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-semibold text-amber-800"
          >
            🍂 Summer&apos;s over — welcome back!
          </motion.p>
        ) : (
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <TimeUnit value={timeLeft?.days ?? 0} label="Days" />
            <TimeUnit value={timeLeft?.hours ?? 0} label="Hours" />
            <TimeUnit value={timeLeft?.minutes ?? 0} label="Minutes" />
            <TimeUnit value={timeLeft?.seconds ?? 0} label="Seconds" />
          </div>
        )}

        <div className="flex items-center gap-6 text-amber-500/70">
          <Sun className="size-5" strokeWidth={1.5} />
          <Waves className="size-5" strokeWidth={1.5} />
          <Palmtree className="size-5" strokeWidth={1.5} />
        </div>
      </motion.div>
    </>
  );
}
