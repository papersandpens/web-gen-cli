import { client } from "@/sanity/lib/client";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const authors = await client.fetch(AUTHORS_QUERY);
  return <div>{JSON.stringify(authors)}</div>;
}
