"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HolidaySelector } from "@/components/holiday-selector";
import { getAutoHoliday, getHolidayById, type Holiday } from "@/lib/holidays";
import { THEME_CONFIG } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useStoredHolidayId } from "@/lib/use-stored-holiday";

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

function formatUkDateTime(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value])
  );

  return `${parts.weekday} ${parts.day} ${parts.month} ${parts.year} at ${parts.hour}:${parts.minute} (UK time)`;
}

function TimeUnit({
  value,
  label,
  cardClassName,
  digitGradient,
  labelClassName,
}: {
  value: number;
  label: string;
  cardClassName: string;
  digitGradient: string;
  labelClassName: string;
}) {
  const padded = value.toString().padStart(2, "0");

  return (
    <Card
      className={cn(
        "w-16 sm:w-24 border shadow-lg backdrop-blur-sm py-0",
        cardClassName
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-1 px-2 py-3 sm:py-5">
        <div className="relative h-8 sm:h-12 w-full overflow-hidden text-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={padded}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={cn(
                "absolute inset-0 flex items-center justify-center font-mono text-2xl sm:text-4xl font-semibold tabular-nums bg-gradient-to-b bg-clip-text text-transparent",
                digitGradient
              )}
            >
              {padded}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className={cn("text-[9px] sm:text-[11px] uppercase tracking-widest", labelClassName)}>
          {label}
        </span>
      </CardContent>
    </Card>
  );
}

function FloatingBlob({ className, duration }: { className: string; duration: number }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function CountdownRow({
  title,
  target,
  reachedLabel,
  theme,
}: {
  title: string;
  target: Date;
  reachedLabel: string;
  theme: (typeof THEME_CONFIG)[keyof typeof THEME_CONFIG];
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Badge className={cn("px-3 py-1 text-[10px] tracking-wide sm:text-xs", theme.badgeClassName)}>
        {title} · {formatUkDateTime(target)}
      </Badge>

      {timeLeft?.isComplete ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn("text-lg font-semibold sm:text-xl", theme.labelClassName)}
        >
          {reachedLabel}
        </motion.p>
      ) : (
        <div className="flex items-center justify-center gap-1.5 sm:gap-3">
          <TimeUnit
            value={timeLeft?.days ?? 0}
            label="Days"
            cardClassName={theme.cardClassName}
            digitGradient={theme.digitGradient}
            labelClassName={theme.labelClassName}
          />
          <TimeUnit
            value={timeLeft?.hours ?? 0}
            label="Hours"
            cardClassName={theme.cardClassName}
            digitGradient={theme.digitGradient}
            labelClassName={theme.labelClassName}
          />
          <TimeUnit
            value={timeLeft?.minutes ?? 0}
            label="Minutes"
            cardClassName={theme.cardClassName}
            digitGradient={theme.digitGradient}
            labelClassName={theme.labelClassName}
          />
          <TimeUnit
            value={timeLeft?.seconds ?? 0}
            label="Seconds"
            cardClassName={theme.cardClassName}
            digitGradient={theme.digitGradient}
            labelClassName={theme.labelClassName}
          />
        </div>
      )}
    </div>
  );
}

export function Countdown() {
  const [storedId, setStoredId] = useStoredHolidayId();

  const holiday: Holiday = useMemo(
    () => (storedId ? getHolidayById(storedId) ?? getAutoHoliday() : getAutoHoliday()),
    [storedId]
  );
  const theme = THEME_CONFIG[holiday.theme];
  const [IconA, IconB, IconC] = theme.icons;

  return (
    <div className={cn("relative flex min-h-screen w-full flex-col overflow-hidden", theme.pageBackground)}>
      <title>{theme.pageTitle}</title>
      <HolidaySelector selected={holiday} onSelect={setStoredId} dark={theme.dark} />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-24">
        <FloatingBlob className={cn("-top-24 -left-24 h-72 w-72", theme.iconClassName, "opacity-40")} duration={10} />
        <FloatingBlob className={cn("-bottom-24 -right-16 h-80 w-80", theme.iconClassName, "opacity-30")} duration={12} />
        <FloatingBlob className={cn("top-1/3 right-1/4 h-56 w-56", theme.iconClassName, "opacity-25")} duration={14} />

        <motion.div
          key={holiday.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex w-full flex-col items-center gap-8"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
            <IconA className={cn("size-10", theme.iconClassName)} strokeWidth={1.5} />
          </motion.div>

          <div className="flex flex-col items-center gap-2 text-center">
            <h1
              className={cn(
                "font-heading bg-gradient-to-r bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-6xl",
                theme.headingGradient
              )}
            >
              {theme.heading}
            </h1>
            <p className={cn("max-w-md text-sm sm:text-base", theme.labelClassName)}>{theme.description}</p>
          </div>

          <Separator className={cn("w-24", theme.separatorClassName)} />

          <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-14">
            <CountdownRow
              title="Starts in"
              target={holiday.startsAt}
              reachedLabel={`🎉 ${holiday.label} has started!`}
              theme={theme}
            />
            <CountdownRow
              title="Back to school"
              target={holiday.endsAt}
              reachedLabel={theme.completeMessage}
              theme={theme}
            />
          </div>

          <div className={cn("flex items-center gap-6", theme.iconClassName)}>
            <IconA className="size-5" strokeWidth={1.5} />
            <IconB className="size-5" strokeWidth={1.5} />
            <IconC className="size-5" strokeWidth={1.5} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
