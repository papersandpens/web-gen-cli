import { client } from "@/sanity/client";
import { LocaleValues } from "@/sanity/helpers/localizeContent";
import {
  defaultSEOSettings,
  generateSeoMetadata,
  getPageSeoQuery,
} from "@/sanity/helpers/seo";

type Props = {
  params: Promise<{ locale: LocaleValues }>;
};

export const generateMetadata = async (props: Props) => {
  const params = await props.params;

  const { locale } = params;

  try {
    const data = await client.fetch(getPageSeoQuery("homePage"));

    if (!data?.seo) {
      return defaultSEOSettings;
    }

    return generateSeoMetadata({
      seo: data.seo,
      locale,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      defaultOgImage: "/images/default-og.jpg",
      pathname: "/",
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    // Return default metadata on error
    return defaultSEOSettings;
  }
};

export default async function Home() {
  return <div>Hello world!</div>;
}
