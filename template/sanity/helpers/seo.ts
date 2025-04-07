import { LOCALES } from "@/sanity/schemaTypes/config";
import { SanityAssetSourceData, SanityImageMetadata } from "@/sanity/types";
import { Metadata } from "next";
import { groq } from "next-sanity";
import { urlFor } from "../image";
import { LocaleValues, localizeContent } from "./localizeContent";

type SEOData = {
  metaTitle: {
    en?: string;
    vi?: string;
    no?: string;
  } | null;
  metaDescription: {
    en?: string;
    vi?: string;
    no?: string;
  } | null;
  keywords: {
    en?: Array<string>;
    vi?: Array<string>;
    no?: Array<string>;
  } | null;
  canonicalUrl: string | null;
  openGraph: {
    title: {
      en?: string;
      vi?: string;
      no?: string;
    } | null;
    description: {
      en?: string;
      vi?: string;
      no?: string;
    } | null;
    type: "article" | "website" | null;
  } | null;
  ogImage: {
    asset: {
      _id: string;
      _type: "sanity.imageAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    } | null;
    alt: {
      en?: string;
      vi?: string;
      no?: string;
    } | null;
  } | null;
  robotDirectives: {
    noIndex: boolean | null;
    noFollow: boolean | null;
    noArchive: boolean | null;
  } | null;
};

export const generateSeoMetadata = ({
  seo,
  locale,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL,
  defaultOgImage = "/images/default-og.jpg",
  pathname,
}: {
  seo: SEOData;
  locale: LocaleValues;
  baseUrl?: string;
  defaultOgImage?: string;
  pathname?: string;
}): Metadata => {
  if (!seo) return {};

  const title = localizeContent(seo.metaTitle, locale, LOCALES.EN);
  const description = localizeContent(seo.metaDescription, locale, LOCALES.EN);
  const keywords = localizeContent(
    seo.keywords as any,
    locale,
    LOCALES.EN
  ) as unknown as string[];
  const ogImageAlt = localizeContent(seo?.ogImage?.alt, locale, LOCALES.EN);
  const ogTitle =
    localizeContent(seo.openGraph?.title, locale, LOCALES.EN) ?? title;
  const ogDescription =
    localizeContent(seo.openGraph?.description, locale, LOCALES.EN) ??
    description;

  const ogImageUrl = seo.ogImage?.asset
    ? urlFor(seo.ogImage).url()
    : `${baseUrl}${defaultOgImage}`;

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    robots: {
      index: !seo.robotDirectives?.noIndex,
      follow: !seo.robotDirectives?.noFollow,
      nocache: seo.robotDirectives?.noArchive ?? false,
    },
    alternates: {
      canonical: seo.canonicalUrl ?? `${baseUrl}/${locale}/${pathname}`,
    },
    openGraph: {
      title: ogTitle ?? "",
      description: ogDescription ?? "",
      type: seo.openGraph?.type ?? "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? ogTitle ?? "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? "",
      description: ogDescription ?? "",
      images: [ogImageUrl],
    },
  };
};

export const seoFragment = `
  "seo": seo {
    "metaTitle": metaTitle,
    "metaDescription": metaDescription,
    "keywords": keywords,
    "canonicalUrl": canonicalUrl,
    "openGraph": openGraph {
      "title": title,
      "description": description,
      "type": type
    },
    "ogImage": ogImage {
      "asset": asset->,
      "alt": alt
    },
    "robotDirectives": robotDirectives {
      "noIndex": noIndex,
      "noFollow": noFollow,
      "noArchive": noArchive
    },
  }
`;

// For static pages (home, about, etc.)
export const getPageSeoQuery = (documentType: string) => groq`
*[_type == "${documentType}"][0] {
  ${seoFragment}
}`;

// For dynamic pages (blogs, resources, news)
export const getDynamicPageSeoQuery = (documentType: string) => groq`
*[_type == "${documentType}" && metadata.slug[$locale].current == $slug][0] {
  ${seoFragment}
}`;

export const defaultSEOSettings = {
  title: "CompanyName | Tagline",
  description: "Description",
  organization: {
    name: "CompanyName - Tagline",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/companyname",
      // Add other social media URLs
    ],
  },
} as const;

// Add JSON-LD Types
type JsonLDBase = {
  title: string;
  description: string;
  image?: any;
  datePublished?: string;
  dateModified?: string;
  url: string;
  locale: LocaleValues;
};

type JsonLDAuthor = {
  name: string;
  image?: any;
  bio?: string;
};

type ArticleJsonLDProps = JsonLDBase & {
  authorName: string;
};

type BlogPostJsonLDProps = JsonLDBase & {
  author?: JsonLDAuthor;
  tags?: string[];
};

type ResourceJsonLDProps = JsonLDBase & {
  fileFormat?: string;
  fileUrl?: string;
};

// Add JSON-LD Generation Functions
export const generateJsonLD = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: defaultSEOSettings.organization.name,
    url: defaultSEOSettings.organization.url,
    logo: {
      "@type": "ImageObject",
      url: defaultSEOSettings.organization.logo,
    },
    sameAs: defaultSEOSettings.organization.sameAs,
  }),

  article: (props: ArticleJsonLDProps) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.title,
    description: props.description,
    image: props.image?.asset
      ? urlFor(props.image.asset).width(1200).height(630).url()
      : defaultSEOSettings.organization.logo,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    url: props.url,
    inLanguage: props.locale,
    author: {
      "@type": "Person",
      name: props.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: defaultSEOSettings.organization.name,
      url: defaultSEOSettings.organization.url,
      logo: {
        "@type": "ImageObject",
        url: defaultSEOSettings.organization.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": props.url,
    },
  }),

  blogPost: (props: BlogPostJsonLDProps) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: props.title,
    description: props.description,
    image: props.image?.asset
      ? urlFor(props.image.asset).width(1200).height(630).url()
      : defaultSEOSettings.organization.logo,
    author: props.author
      ? {
          "@type": "Person",
          name: props.author.name,
          image: props.author.image ? urlFor(props.author.image).url() : null,
          description: props.author.bio,
        }
      : null,
    keywords: props.tags?.join(", ") || "",
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    url: props.url,
    inLanguage: props.locale,
    publisher: {
      "@type": "Organization",
      name: defaultSEOSettings.organization.name,
      url: defaultSEOSettings.organization.url,
      logo: {
        "@type": "ImageObject",
        url: defaultSEOSettings.organization.logo,
      },
    },
  }),

  resource: (props: ResourceJsonLDProps) => ({
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: props.title,
    description: props.description,
    image: props.image?.asset?.url || defaultSEOSettings.organization.logo,
    fileFormat: props.fileFormat,
    uploadDate: props.datePublished,
    dateModified: props.dateModified,
    url: props.url,
    inLanguage: props.locale,
    provider: {
      "@type": "Organization",
      name: defaultSEOSettings.organization.name,
      url: defaultSEOSettings.organization.url,
    },
  }),
};
