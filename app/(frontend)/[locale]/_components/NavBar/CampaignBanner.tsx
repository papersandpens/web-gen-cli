"use client";

import { useBannerStore } from "@/app/store/useBannerStore";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const CampaignBanner = () => {
  const t = useTranslations("nav");
  const { isOpen, closeBanner } = useBannerStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render anything until after hydration
  if (!isHydrated) return null;

  // After hydration, check the banner state
  if (!isOpen) return null;

  return (
    <div className="bg-[#000] text-white px-4 py-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <div className="w-6 h-6 bg-white/10 rounded" />
          </div>
          <p className="text-sm">
            {t("banner.title")}{" "}
            <span className="hidden sm:inline">{t("banner.description")}</span>
          </p>
        </div>
        <button
          onClick={closeBanner}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label={t("banner.close")}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
