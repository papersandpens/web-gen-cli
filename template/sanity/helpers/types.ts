import { SanityDocument } from "sanity";

export type Document = {
  locales?: string[];
} & SanityDocument;
