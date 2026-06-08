import type { HistoricalRegion } from "../../types/history";
import { regions1500To1550 } from "./1500-1550";

const regionsByPeriod: Record<string, HistoricalRegion[]> = {
  "1500-1550": regions1500To1550
};

export function getRegionsForPeriod(periodId: string): HistoricalRegion[] {
  return regionsByPeriod[periodId] ?? [];
}
