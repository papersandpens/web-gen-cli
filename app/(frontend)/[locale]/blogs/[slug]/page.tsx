import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";

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
    author->{ name }
  }
`;

export default async function BlogPost({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = await client.fetch<BlogPost>(getBlogPost, {
    locale: params.locale,
    slug: params.slug,
  });

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
