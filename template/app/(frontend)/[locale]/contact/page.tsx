import { LocaleKey } from "@/i18n/settings";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "./_components/ContactForm";
import FaqSection from "./_components/FaqSection";
import LocationsSection from "./_components/LocationsSection";

type Props = {
  params: { locale: LocaleKey };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "contact",
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nti.edu";

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${baseUrl}/${params.locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        vi: `${baseUrl}/vi/contact`,
      },
    },
  };
}

export const revalidate = 3600;

export default async function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-12 lg:gap-16">
        {/* Contact Form Section */}
        <section>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            {t("title")}
          </h1>
          <ContactForm />
        </section>

        {/* Locations Section */}
        <LocationsSection />

        {/* FAQs Section */}
        <FaqSection locale={locale} />
      </div>
    </main>
  );
}
