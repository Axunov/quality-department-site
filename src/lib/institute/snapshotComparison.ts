import type { Snapshot } from "./types";

// Same-day rows are corrections, not another period. Only compare the same
// population and show institute-wide totals, never subgroup deltas.
export function compareSnapshots(current: Snapshot, previous: Snapshot | null) {
  if (!previous || current.kind !== previous.kind || previous.asOf >= current.asOf) return null;
  if (current.kind === "students" && (previous.kind !== "students" || current.year !== previous.year)) return null;
  if ([current.total, previous.total].some(n => !Number.isSafeInteger(n) || n < 10)) return null;
  return { currentDate: current.asOf, previousDate: previous.asOf, currentTotal: current.total, previousTotal: previous.total, change: current.total - previous.total };
}
