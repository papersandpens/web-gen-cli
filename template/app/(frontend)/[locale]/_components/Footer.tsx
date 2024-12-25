import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("footer");

  const socialLinks = [
    { href: "https://facebook.com/nti", icon: "facebook", label: "Facebook" },
    {
      href: "https://instagram.com/nti",
      icon: "instagram",
      label: "Instagram",
    },
    { href: "https://twitter.com/nti", icon: "twitter", label: "Twitter" },
    {
      href: "https://linkedin.com/company/nti",
      icon: "linkedin",
      label: "LinkedIn",
    },
    { href: "https://youtube.com/nti", icon: "youtube", label: "YouTube" },
  ];

  return (
    <footer className="border-t my-8 md:my-12 lg:my-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="lg:col-span-1">
            <div className="w-32 h-8 bg-gray-200 rounded flex items-center justify-center">
              Logo
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("quickLinks.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link href="/mission" className="hover:underline">
                  {t("quickLinks.mission")}
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:underline">
                  {t("quickLinks.getInvolved")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:underline">
                  {t("quickLinks.events")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  {t("quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t("resources.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:underline">
                  {t("resources.blog")}
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:underline">
                  {t("resources.caseStudies")}
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="hover:underline">
                  {t("resources.webinars")}
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  {t("resources.faqs")}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  {t("resources.careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="font-semibold mb-4">{t("stayConnected.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/newsletter" className="hover:underline">
                  {t("stayConnected.newsletter")}
                </Link>
              </li>
              <li>
                <Link href="/social" className="hover:underline">
                  {t("stayConnected.socialMedia")}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:underline">
                  {t("stayConnected.community")}
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:underline">
                  {t("stayConnected.support")}
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:underline">
                  {t("stayConnected.feedback")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4">{t("subscribe.title")}</h3>
            <p className="text-sm mb-4">{t("subscribe.description")}</p>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder={t("subscribe.placeholder")}
                className="w-full"
              />
              <Button className="w-full">{t("subscribe.button")}</Button>
              <p className="text-xs text-gray-500">
                {t("subscribe.disclaimer")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">{t("legal.copyright")}</div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:underline"
              >
                {t("legal.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:underline"
              >
                {t("legal.terms")}
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:underline"
              >
                {t("legal.cookies")}
              </Link>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">{social.label}</span>
                  <i className={`fab fa-${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
