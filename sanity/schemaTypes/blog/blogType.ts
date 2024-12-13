import { defineField, defineType } from "sanity";
import { localesField, seoFields } from "../utils/sharedFields";
import { createI18nField } from "../utils/validationUtils";

export default defineType({
  name: "blog",
  title: "Blog Posts",
  type: "document",
  fields: [
    localesField,
    defineField(createI18nField("title", "string")),
    defineField(
      createI18nField("slug", "slug", {
        options: {
          source: (doc: any) => {
            const currentLocale = doc.locales?.[0] || "en";
            return doc.title?.[currentLocale];
          },
          maxLength: 96,
        },
      })
    ),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            'Describe the image for screen readers and SEO. Example: "Team meeting in conference room"',
        },
      ],
    }),
    defineField(createI18nField("shortDescription", "text", { rows: 3 })),
    defineField(
      createI18nField("content", "array", {
        of: [{ type: "block" }, { type: "image" }],
      })
    ),
    defineField({
      name: "blogTestimonial",
      title: "Blog Testimonial",
      type: "reference",
      to: [{ type: "blogTestimonial" }],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seoNote",
      title: "SEO Guidelines",
      type: "string",
      description: `SEO title will be derived from blog post title. SEO description will be derived from blog post description. Canonical URL will be auto-generated based on slug`,
      components: {
        input: () => null,
      },
      readOnly: true,
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "shortDescription.en",
      media: "featuredImage",
    },
  },
});
