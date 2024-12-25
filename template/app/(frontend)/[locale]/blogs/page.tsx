import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import { Metadata } from "next";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  _id: string;
  title: { [key: string]: string };
  slug: { [key: string]: { current: string } };
  shortDescription: { [key: string]: string };
  featuredImage: { asset: any; alt: string };
  createdAt: string;
  seoKeywords?: { [key: string]: string[] };
};

const getBlogPosts = groq`
  *[_type == "blog"] | order(createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    createdAt,
    seoKeywords
  }
`;

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "Placeholder domain (eg. domain.com)";

  return {
    title: "Blog | Placeholder Org Name",
    description: "Placeholder description",
    alternates: {
      canonical: `${baseUrl}/${locale}/blogs`,
    },
    openGraph: {
      title: "Blog | Placeholder Org Name",
      description: "Placeholder description",
      url: `${baseUrl}/${locale}/blogs`,
      siteName: "Placeholder Org Name | Placeholder Tagline",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Placeholder Org Name",
      description: "Placeholder description",
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "NTI Blog",
        description: "Placeholder description",
        url: `${baseUrl}/${locale}/blogs`,
        publisher: {
          "@type": "Organization",
          name: "Placeholder Org Name | Placeholder Tagline",
          url: baseUrl,
        },
      }),
    },
  };
}

export default async function BlogsPage({ params }: Props) {
  const posts = await client.fetch<BlogPost[]>(getBlogPosts);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/${params.locale}/blogs/${post.slug[params.locale].current}`}
            className="group hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden border border-gray-200"
          >
            {post.featuredImage && (
              <div className="aspect-video relative">
                <Image
                  src={urlFor(post.featuredImage).url()}
                  alt={post.featuredImage.alt || ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {post.title[params.locale]}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                {post.shortDescription[params.locale]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
