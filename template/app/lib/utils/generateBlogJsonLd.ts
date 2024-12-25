// app/lib/utils/generateBlogJsonLd.ts
import { Blog } from "@/sanity/types";

type GenerateBlogJsonLdProps = {
  blog: Blog;
  baseUrl: string;
  locale?: string;
};

// Quite messy type casting here, because of the way Sanity types are defined.
export const generateBlogJsonLd = ({
  blog,
  baseUrl,
  locale = "en",
}: GenerateBlogJsonLdProps) => {
  // Ensure we have fallbacks for required fields
  const title =
    (blog.title as Record<string, string>)?.[locale] ||
    (blog.title as Record<string, string>)?.en ||
    "";

  const description =
    (blog.seoDescription as Record<string, string>)?.[locale] ||
    (blog.seoDescription as Record<string, string>)?.en ||
    "";

  const slug =
    (blog.slug as Record<string, { current: string }>)?.[locale]?.current ||
    (blog.slug as Record<string, { current: string }>)?.en?.current ||
    "";

  const imageUrl =
    (blog.featuredImage?.asset as unknown as { url: string })?.url ||
    `${baseUrl}/images/default-blog.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: blog.createdAt || "",
    dateModified: blog._updatedAt || blog.createdAt || "",
    url: `${baseUrl}/${slug}`,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name:
        (blog.author as unknown as { name: string })?.name ||
        "Placeholder Org Name | Placeholder Tagline",
    },
    publisher: {
      "@type": "Organization",
      name: "Placeholder Org Name | Placeholder Tagline",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/nti-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${slug}`,
    },
  };
};
