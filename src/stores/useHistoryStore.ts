import { create } from "zustand";
import type { EventCategory, RegionType } from "../types/history";

type HistoryState = {
  selectedPeriodId: string;
  selectedRegionId: string | null;
  hoveredRegionId: string | null;
  activeCategories: EventCategory[];
  activeRegionTypes: RegionType[];
  setSelectedPeriodId: (periodId: string) => void;
  setSelectedRegionId: (regionId: string | null) => void;
  setHoveredRegionId: (regionId: string | null) => void;
  toggleCategory: (category: EventCategory) => void;
  toggleRegionType: (regionType: RegionType) => void;
  clearFilters: () => void;
};

export const useHistoryStore = create<HistoryState>((set) => ({
  selectedPeriodId: "1500-1550",
  selectedRegionId: null,
  hoveredRegionId: null,
  activeCategories: [],
  activeRegionTypes: [],
  setSelectedPeriodId: (periodId) =>
    set({ selectedPeriodId: periodId, selectedRegionId: null }),
  setSelectedRegionId: (regionId) => set({ selectedRegionId: regionId }),
  setHoveredRegionId: (regionId) => set({ hoveredRegionId: regionId }),
  toggleCategory: (category) =>
    set((state) => ({
      activeCategories: state.activeCategories.includes(category)
        ? state.activeCategories.filter((item) => item !== category)
        : [...state.activeCategories, category]
    })),
  toggleRegionType: (regionType) =>
    set((state) => ({
      activeRegionTypes: state.activeRegionTypes.includes(regionType)
        ? state.activeRegionTypes.filter((item) => item !== regionType)
        : [...state.activeRegionTypes, regionType]
    })),
  clearFilters: () => set({ activeCategories: [], activeRegionTypes: [] })
}));
