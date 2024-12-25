import { client } from "@/sanity/lib/client";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./_components/LanguageSwitcher";
import { Navigation } from "./_components/Navigation";

export default async function Home() {
  const authors = await client.fetch(AUTHORS_QUERY);
  const t = await getTranslations("home");

  return (
    <div>
      <span>{JSON.stringify(authors)}</span>

      <Navigation />
      <LanguageSwitcher />

      <div>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <p>{t("greeting", { name: "John" })}</p>
      </div>
    </div>
  );
}
