import type { LucideIcon } from "lucide-react";
import {
  Cat,
  CloudSnow,
  Egg,
  Flower,
  Flower2,
  Ghost,
  Gift,
  Palmtree,
  Snowflake,
  Sprout,
  Sun,
  TreePine,
  Waves,
} from "lucide-react";
import type { HolidayTheme } from "@/lib/holidays";

export type ThemeConfig = {
  pageTitle: string;
  heading: string;
  description: string;
  completeMessage: string;
  dark: boolean;
  pageBackground: string;
  headingGradient: string;
  badgeClassName: string;
  cardClassName: string;
  digitGradient: string;
  labelClassName: string;
  separatorClassName: string;
  iconClassName: string;
  icons: [LucideIcon, LucideIcon, LucideIcon];
};

export const THEME_CONFIG: Record<HolidayTheme, ThemeConfig> = {
  summer: {
    dark: false,
    pageTitle: "End of Summer Countdown",
    heading: "The Last Days of Summer",
    description: "Every second counting down until it's time to be back in school.",
    completeMessage: "🎒 Time to be in school!",
    pageBackground: "bg-gradient-to-b from-sky-100 via-amber-50 to-orange-100",
    headingGradient: "from-amber-600 via-orange-500 to-pink-500",
    badgeClassName: "border-amber-200 bg-amber-100 text-amber-800",
    cardClassName: "border-amber-200/70 bg-white/70 shadow-amber-900/5",
    digitGradient: "from-orange-600 to-amber-500",
    labelClassName: "text-amber-900/60",
    separatorClassName: "bg-amber-200",
    iconClassName: "text-amber-500/70",
    icons: [Sun, Waves, Palmtree],
  },
  halloween: {
    dark: true,
    pageTitle: "Halloween Half Term Countdown",
    heading: "Spooky Half Term",
    description: "Counting down to a wickedly good week off school.",
    completeMessage: "🎃 Time to be in school!",
    pageBackground: "bg-gradient-to-b from-slate-950 via-orange-950 to-slate-900",
    headingGradient: "from-orange-500 via-purple-400 to-orange-400",
    badgeClassName: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    cardClassName: "border-orange-500/30 bg-slate-900/70 shadow-orange-950/40",
    digitGradient: "from-orange-400 to-purple-400",
    labelClassName: "text-orange-200/60",
    separatorClassName: "bg-orange-500/30",
    iconClassName: "text-orange-400/70",
    icons: [Ghost, Cat, Ghost],
  },
  christmas: {
    dark: true,
    pageTitle: "Christmas Countdown",
    heading: "Christmas Countdown",
    description: "Counting down to the big winter break.",
    completeMessage: "🎄 Time to be in school!",
    pageBackground: "bg-gradient-to-b from-emerald-950 via-red-950 to-emerald-950",
    headingGradient: "from-red-400 via-amber-300 to-emerald-400",
    badgeClassName: "border-red-400/40 bg-red-500/10 text-red-200",
    cardClassName: "border-emerald-400/30 bg-emerald-950/60 shadow-red-950/40",
    digitGradient: "from-red-400 to-emerald-400",
    labelClassName: "text-emerald-200/60",
    separatorClassName: "bg-emerald-400/30",
    iconClassName: "text-red-300/70",
    icons: [Gift, Snowflake, TreePine],
  },
  winter: {
    dark: false,
    pageTitle: "February Half Term Countdown",
    heading: "Winter Half Term",
    description: "Counting down to a frosty week off school.",
    completeMessage: "❄️ Time to be in school!",
    pageBackground: "bg-gradient-to-b from-slate-100 via-sky-50 to-blue-100",
    headingGradient: "from-sky-600 via-blue-500 to-indigo-400",
    badgeClassName: "border-sky-200 bg-sky-100 text-sky-800",
    cardClassName: "border-sky-200/70 bg-white/70 shadow-sky-900/5",
    digitGradient: "from-sky-600 to-indigo-500",
    labelClassName: "text-sky-900/60",
    separatorClassName: "bg-sky-200",
    iconClassName: "text-sky-500/70",
    icons: [Snowflake, CloudSnow, Snowflake],
  },
  easter: {
    dark: false,
    pageTitle: "Easter Countdown",
    heading: "Easter Countdown",
    description: "Counting down to spring break and egg hunts.",
    completeMessage: "🐣 Time to be in school!",
    pageBackground: "bg-gradient-to-b from-yellow-50 via-pink-50 to-lime-100",
    headingGradient: "from-pink-500 via-yellow-500 to-lime-500",
    badgeClassName: "border-pink-200 bg-pink-100 text-pink-800",
    cardClassName: "border-pink-200/70 bg-white/70 shadow-pink-900/5",
    digitGradient: "from-pink-500 to-lime-500",
    labelClassName: "text-pink-900/60",
    separatorClassName: "bg-pink-200",
    iconClassName: "text-pink-500/70",
    icons: [Egg, Flower2, Egg],
  },
  maytime: {
    dark: false,
    pageTitle: "May Half Term Countdown",
    heading: "May Half Term",
    description: "Counting down to blossom and a bank holiday week.",
    completeMessage: "🌷 Time to be in school!",
    pageBackground: "bg-gradient-to-b from-pink-50 via-lime-50 to-sky-50",
    headingGradient: "from-green-500 via-lime-500 to-pink-400",
    badgeClassName: "border-lime-200 bg-lime-100 text-lime-800",
    cardClassName: "border-lime-200/70 bg-white/70 shadow-lime-900/5",
    digitGradient: "from-green-600 to-pink-500",
    labelClassName: "text-green-900/60",
    separatorClassName: "bg-lime-200",
    iconClassName: "text-green-500/70",
    icons: [Flower, Sprout, Flower2],
  },
};
