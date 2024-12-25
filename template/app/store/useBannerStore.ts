// app/(frontend)/[locale]/_components/store/useBannerStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BannerState {
  isOpen: boolean;
  lastClosedAt: number | null;
  closeBanner: () => void;
  resetBanner: () => void;
}

export const useBannerStore = create<BannerState>()(
  persist(
    (set) => ({
      isOpen: true,
      lastClosedAt: null,
      closeBanner: () => set({ isOpen: false, lastClosedAt: Date.now() }),
      resetBanner: () => set({ isOpen: true, lastClosedAt: null }),
    }),
    {
      name: "campaign-banner",
      onRehydrateStorage: () => (state) => {
        // Check if banner should be shown again (after 24 hours)
        if (state?.lastClosedAt) {
          const dayInMs = 24 * 60 * 60 * 1000;
          if (Date.now() - state.lastClosedAt > dayInMs) {
            state.resetBanner();
          }
        }
      },
    }
  )
);
