const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;

function getMSKDateParts(date: Date): { year: number; month: number; day: number } {
  const utc = date.getTime();
  const msk = new Date(utc + MSK_OFFSET_MS);
  return { year: msk.getUTCFullYear(), month: msk.getUTCMonth(), day: msk.getUTCDate() };
}

export function startOfDayMSK(date: Date): Date {
  const { year, month, day } = getMSKDateParts(date);
  const mskMidnightUTC = Date.UTC(year, month, day) - MSK_OFFSET_MS;
  return new Date(mskMidnightUTC);
}

export function endOfDayMSK(date: Date): Date {
  const start = startOfDayMSK(date);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
}

export type DateRangePreset = "today" | "24h" | "week" | "month" | "all" | "custom";

export function getRangeMSK(
  preset: DateRangePreset,
  customFrom?: string,
  customTo?: string
): { from: Date; to: Date } {
  const now = new Date();
  const todayStart = startOfDayMSK(now);
  const todayEnd = endOfDayMSK(now);

  if (preset === "custom" && customFrom && customTo) {
    const from = new Date(customFrom + "T00:00:00+03:00");
    const to = new Date(customTo + "T23:59:59.999+03:00");
    return { from, to };
  }

  if (preset === "today") {
    return { from: todayStart, to: todayEnd };
  }

  if (preset === "24h") {
    const from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return { from, to: now };
  }

  if (preset === "week") {
    const weekStart = new Date(todayStart.getTime() - 6 * 24 * 60 * 60 * 1000);
    return { from: weekStart, to: todayEnd };
  }

  if (preset === "month") {
    const { year, month } = getMSKDateParts(now);
    const monthStartUTC = Date.UTC(year, month, 1) - MSK_OFFSET_MS;
    return { from: new Date(monthStartUTC), to: todayEnd };
  }

  if (preset === "all") {
    const farPast = new Date(2020, 0, 1);
    return { from: farPast, to: todayEnd };
  }

  return { from: todayStart, to: todayEnd };
}

export function isDateInRange(dateIso: string, from: Date, to: Date): boolean {
  const t = new Date(dateIso).getTime();
  return t >= from.getTime() && t <= to.getTime();
}
