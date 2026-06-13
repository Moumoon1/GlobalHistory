import type { HistoricalRegion } from "../../types/history";
import { getLearningRegionsForPeriod } from "../learningRegions";
import { regions1500To1550 } from "./1500-1550";

const regionsByPeriod: Record<string, HistoricalRegion[]> = {
  "1500-1550": regions1500To1550
};

export function getRegionsForPeriod(periodId: string): HistoricalRegion[] {
  const learningRegions = getLearningRegionsForPeriod(periodId);
  return learningRegions.length > 0 ? learningRegions : regionsByPeriod[periodId] ?? [];
}
