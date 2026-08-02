"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <Card className="w-20 sm:w-28 border-border/60 bg-card/60 backdrop-blur-sm py-0">
      <CardContent className="flex flex-col items-center justify-center gap-1 px-2 py-4 sm:py-6">
        <div className="relative h-10 sm:h-14 w-full overflow-hidden text-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={padded}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center font-mono text-3xl sm:text-5xl font-semibold tabular-nums"
            >
              {padded}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full flex-col items-center gap-8"
    >
      <Badge variant="secondary" className="px-3 py-1 text-xs tracking-wide">
        {formattedTarget}
      </Badge>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Countdown to September
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md">
          Every second counting down to September 2nd at 8:30 AM.
        </p>
      </div>

      <Separator className="w-24" />

      {timeLeft?.isComplete ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-semibold"
        >
          🎉 It&apos;s here!
        </motion.p>
      ) : (
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <TimeUnit value={timeLeft?.days ?? 0} label="Days" />
          <TimeUnit value={timeLeft?.hours ?? 0} label="Hours" />
          <TimeUnit value={timeLeft?.minutes ?? 0} label="Minutes" />
          <TimeUnit value={timeLeft?.seconds ?? 0} label="Seconds" />
        </div>
      )}
    </motion.div>
  );
}
