import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

const AUTHORS_QUERY = `*[_type == 'author'][0...12]{
  _id,
  name,
  image
}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const authors = await client.fetch<SanityDocument[]>(
    AUTHORS_QUERY,
    {},
    options
  );

  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>

      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Authors</h1>
        <ul className="flex flex-col gap-y-4">
          {authors.map((author) => {
            const authorImageUrl = author.image
              ? urlFor(author.image)?.width(550).height(310).url()
              : null;

            return (
              <li className="hover:underline" key={author._id}>
                <h2 className="text-xl font-semibold">{author.name}</h2>
                {authorImageUrl && (
                  <img src={authorImageUrl} alt={author.name} />
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
