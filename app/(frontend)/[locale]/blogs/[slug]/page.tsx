import { generateBlogJsonLd } from "@/app/lib/utils/generateBlogJsonLd";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { groq } from "next-sanity";
import Image from "next/image";

type Props = {
  params: { locale: string; slug: string };
};

type BlogPost = {
  title: { [key: string]: string };
  content: { [key: string]: any };
  featuredImage: { asset: any; alt: string };
  createdAt: string;
  author: { name: string };
  slug: { [key: string]: string };
};

const getBlogPost = groq`
  *[_type == "blog" && slug[$locale].current == $slug][0] {
    title,
    content,
    featuredImage,
    createdAt,
    author->{ name },
    seoDescription,
    seoKeywords,
    shortDescription
  }
`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await client.fetch(getBlogPost, { locale, slug });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://newturing.ai";

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Generate JSON-LD for this specific blog post
  const blogJsonLd = generateBlogJsonLd({
    blog: post,
    baseUrl,
    locale,
  });

  return {
    title: post.title[locale],
    description:
      post.seoDescription?.[locale] || post.shortDescription?.[locale] || "",
    keywords: post.seoKeywords?.[locale] || [],
    alternates: {
      canonical: `${baseUrl}/${locale}/blogs/${slug}`,
    },
    openGraph: {
      title: post.title[locale],
      description:
        post.seoDescription?.[locale] || post.shortDescription?.[locale] || "",
      url: `${baseUrl}/${locale}/blogs/${slug}`,
      siteName: "NTI - The New Turing Institute",
      locale: locale,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name || "NTI",
      images: [
        {
          url: urlFor(post.featuredImage).url(),
          alt: post.featuredImage.alt || post.title[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title[locale],
      description:
        post.seoDescription?.[locale] || post.shortDescription?.[locale] || "",
      images: [urlFor(post.featuredImage).url()],
    },
    other: {
      "script:ld+json": JSON.stringify(blogJsonLd),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = await client.fetch<BlogPost>(getBlogPost, {
    locale: params.locale,
    slug: params.slug,
  });

  console.log("post", post);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title[params.locale]}</h1>
      <div className="flex items-center gap-4 text-gray-600 mb-8">
        <p>{post.author.name}</p>
        <span>•</span>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>

      {post.featuredImage && (
        <div className="relative mb-8 max-w-3xl w-full !h-[400px]">
          <Image
            src={urlFor(post.featuredImage).url()}
            alt={post.featuredImage.alt || ""}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.content[params.locale]} />
      </div>
    </article>
  );
}
