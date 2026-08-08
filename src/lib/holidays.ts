export type HolidayTheme =
  | "summer"
  | "halloween"
  | "christmas"
  | "winter"
  | "easter"
  | "maytime";

export type Holiday = {
  id: string;
  label: string;
  shortLabel: string;
  theme: HolidayTheme;
  tagline: string;
  /** Midnight UK time on the first day of the holiday. */
  startsAt: Date;
  /** 8:30am UK time on the first day back at school. */
  endsAt: Date;
};

/**
 * Converts a wall-clock date/time in Europe/London to the correct UTC
 * instant, automatically accounting for BST/GMT so times stay correct
 * across the DST changeover.
 */
function londonWallTimeToUTC(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/London",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(guess).map((part) => [part.type, part.value])
  ) as Record<string, string>;
  const guessedAsUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return new Date(guess.getTime() + (guess.getTime() - guessedAsUTC));
}

const midnightUK = (year: number, month: number, day: number) =>
  londonWallTimeToUTC(year, month, day, 0, 0);

const eightThirtyUK = (year: number, month: number, day: number) =>
  londonWallTimeToUTC(year, month, day, 8, 30);

/**
 * Dates below are transcribed from the CHHS 2026-27 term calendar image.
 * Double-check the exact break-up/return dates (especially inset days)
 * against the official school calendar and adjust here if anything is off.
 */
export const HOLIDAYS: Holiday[] = [
  {
    id: "summer-2026",
    label: "Summer Holiday",
    shortLabel: "Summer",
    theme: "summer",
    tagline: "Six weeks of sunshine before term starts",
    startsAt: midnightUK(2026, 7, 22),
    endsAt: eightThirtyUK(2026, 9, 2),
  },
  {
    id: "october-half-term",
    label: "October Half Term",
    shortLabel: "Half Term",
    theme: "halloween",
    tagline: "A spooky week off school",
    startsAt: midnightUK(2026, 10, 24),
    endsAt: eightThirtyUK(2026, 11, 2),
  },
  {
    id: "christmas",
    label: "Christmas Holiday",
    shortLabel: "Christmas",
    theme: "christmas",
    tagline: "The big winter break",
    startsAt: midnightUK(2026, 12, 19),
    endsAt: eightThirtyUK(2027, 1, 5),
  },
  {
    id: "february-half-term",
    label: "February Half Term",
    shortLabel: "Feb Half Term",
    theme: "winter",
    tagline: "A frosty week off",
    startsAt: midnightUK(2027, 2, 13),
    endsAt: eightThirtyUK(2027, 2, 22),
  },
  {
    id: "easter",
    label: "Easter Holiday",
    shortLabel: "Easter",
    theme: "easter",
    tagline: "Spring break and egg hunts",
    startsAt: midnightUK(2027, 3, 27),
    endsAt: eightThirtyUK(2027, 4, 12),
  },
  {
    id: "may-half-term",
    label: "May Half Term",
    shortLabel: "May Half Term",
    theme: "maytime",
    tagline: "Blossom and a bank holiday week",
    startsAt: midnightUK(2027, 5, 29),
    endsAt: eightThirtyUK(2027, 6, 7),
  },
];

export const DEFAULT_HOLIDAY_ID = HOLIDAYS[0].id;

export function getHolidayById(id: string): Holiday | undefined {
  return HOLIDAYS.find((holiday) => holiday.id === id);
}

/** The holiday currently underway, or otherwise the next one coming up. */
export function getAutoHoliday(now: Date = new Date()): Holiday {
  const time = now.getTime();

  const current = HOLIDAYS.find(
    (holiday) => time >= holiday.startsAt.getTime() && time < holiday.endsAt.getTime()
  );
  if (current) return current;

  const upcoming = HOLIDAYS.filter((holiday) => holiday.startsAt.getTime() > time).sort(
    (a, b) => a.startsAt.getTime() - b.startsAt.getTime()
  );
  if (upcoming.length > 0) return upcoming[0];

  return HOLIDAYS[HOLIDAYS.length - 1];
}
