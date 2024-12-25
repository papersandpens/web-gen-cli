"use client";
import { Button } from "@/components/ui/button";
import { Globe, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const SecondaryNav = () => {
  const t = useTranslations("nav");

  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/newsroom" className="text-sm hover:text-gray-600">
              {t("secondary.newsroom")}
            </Link>
            <Link href="/event" className="text-sm hover:text-gray-600">
              {t("secondary.event")}
            </Link>
            <Link href="/career" className="text-sm hover:text-gray-600">
              {t("secondary.career")}
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Globe className="w-4 h-4" />
            </button>
            <Button variant="outline" size="sm">
              {t("secondary.signIn")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
