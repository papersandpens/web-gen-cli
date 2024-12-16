import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { LocaleKey } from "@/i18n/settings";
import { client } from "@/sanity/lib/client";
import { Faq } from "@/sanity/types";
import { AlertCircle } from "lucide-react";
import { groq, PortableText } from "next-sanity";
import { getTranslations } from "next-intl/server";

async function getFaqs() {
  const query = groq`
      *[_type == "faq"] | order(priority desc) {
        _id,
        "question": question,
        "answer": answer,
        priority
      }
    `;

  return client.fetch<Faq[]>(query);
}

export default async function FaqSection({ locale }: { locale: LocaleKey }) {
  const t = await getTranslations("contact.faq");

  try {
    const faqs = await getFaqs();

    if (!faqs?.length) {
      return (
        <section className="pt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">{t("title")}</h2>
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t("alerts.noFaqs")}</AlertDescription>
          </Alert>
        </section>
      );
    }

    return (
      <section className="pt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{t("title")}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq._id} value={faq._id}>
              <AccordionTrigger>
                {faq.question?.[locale] ?? ""}
              </AccordionTrigger>
              <AccordionContent>
                <PortableText value={faq.answer?.[locale] ?? []} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  } catch (error) {
    return (
      <section className="pt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">{t("title")}</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("alerts.error")}</AlertDescription>
        </Alert>
      </section>
    );
  }
}

// Loading component
export function FaqSectionSkeleton() {
  return (
    <section className="pt-8">
      <Skeleton className="h-8 w-32 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
