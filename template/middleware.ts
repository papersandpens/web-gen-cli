import { defaultLocale, locales } from "@/i18n/settings";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  defaultLocale,

  // Used for automatic language detection
  localeDetection: true,

  // If the locale is not in the list of supported ones,
  // redirect to the default locale
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en)/:path*"],
};
