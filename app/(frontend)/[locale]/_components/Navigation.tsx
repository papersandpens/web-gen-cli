"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Navigation = () => {
  const t = useTranslations("common.nav");

  return (
    <nav className="flex gap-4">
      <Link href="/">{t("home")}</Link>
      <Link href="/courses">{t("courses")}</Link>
      <Link href="/about">{t("about")}</Link>
    </nav>
  );
};
