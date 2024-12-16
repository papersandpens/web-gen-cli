"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useRef } from "react";

export const MainNav = () => {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu("programs");
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300); // 300ms delay before closing
  };

  const menuItems = {
    programs: [
      {
        title: "AI for Everyone",
        items: ["GenAI for Everyone", "Page Two", "Page Three", "Page Four"],
      },
      {
        title: "Intermediate",
        items: ["Page Five", "Page Six", "Page Seven", "Page Eight"],
      },
      {
        title: "Advance",
        items: ["Page Nine", "Page Ten", "Page Eleven", "Page Twelve"],
      },
    ],
  };

  const menuAnimation = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 10,
    },
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  };

  const menuItemAnimation = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, delay: 0.1 },
  };

  return (
    <div className="border-b relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <div className="w-32 h-8">Logo</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-600">
              {t("main.home")}
            </Link>
            <Link href="/about-us" className="hover:text-gray-600">
              {t("main.aboutUs")}
            </Link>
            <Link href="/insights" className="hover:text-gray-600">
              {t("main.insights")}
            </Link>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-gray-600">
                {t("main.programs")}
              </button>
              <AnimatePresence>
                {activeMenu === "programs" && (
                  <motion.div
                    className="absolute left-0 w-screen bg-white shadow-lg"
                    style={{
                      top: "calc(100% + 1px)",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    {...menuAnimation}
                  >
                    <div className="container mx-auto px-4 py-8">
                      <div className="grid grid-cols-3 gap-8">
                        {menuItems.programs.map((section, idx) => (
                          <motion.div key={idx} {...menuItemAnimation}>
                            <h3 className="font-semibold mb-4">
                              {section.title}
                            </h3>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href="#"
                                    className="hover:text-gray-600"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="default">{t("main.getStarted")}</Button>
          </div>

          {/* Mobile Navigation */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 lg:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            <Link href="/" className="block py-2 hover:text-gray-600">
              {t("main.home")}
            </Link>
            <Link href="/about-us" className="block py-2 hover:text-gray-600">
              {t("main.aboutUs")}
            </Link>
            <Link href="/insights" className="block py-2 hover:text-gray-600">
              {t("main.insights")}
            </Link>
            <div className="py-2">
              <button
                className="flex items-center justify-between w-full"
                onClick={() =>
                  setActiveMenu(activeMenu === "programs" ? null : "programs")
                }
              >
                <span>{t("main.programs")}</span>
                <span className="transform transition-transform duration-200">
                  {activeMenu === "programs" ? "−" : "+"}
                </span>
              </button>
              {activeMenu === "programs" && (
                <div className="mt-2 ml-4 space-y-4">
                  {menuItems.programs.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-semibold">{section.title}</h3>
                      <ul className="space-y-2 ml-4">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href="#"
                              className="block py-1 hover:text-gray-600"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-4">
              <Button className="w-full">{t("main.getStarted")}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
