import { BiSearchAlt } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from "../../helpers/createLocalizedField";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: BiSearchAlt,
  fields: [
    defineField(
      createLocalizedField("metaTitle", "string", {
        validation: (Rule: any) =>
          Rule.required()
            .max(60)
            .warning("Meta titles longer than 60 characters may be truncated"),
      })
    ),
    defineField(
      createLocalizedField("metaDescription", "text", {
        validation: (Rule: any) =>
          Rule.required()
            .max(160)
            .warning(
              "Meta descriptions longer than 160 characters may be truncated"
            ),
      })
    ),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "The canonical URL helps prevent duplicate content issues by telling search engines which version of a page is the 'master' copy. When to use: • If the same content appears under multiple URLs • For printer-friendly versions of pages • When using filter/sort parameters in URLs • For mobile/desktop variants of pages. Leave empty if this is the original page URL.",
    }),
    defineField({
      name: "openGraph",
      title: "Open Graph",
      type: "object",
      description: "Customize social media sharing appearance",
      fields: [
        defineField(
          createLocalizedField("title", "string", {
            description: "Defaults to meta title if not set",
          })
        ),
        defineField(
          createLocalizedField("description", "text", {
            description: "Defaults to meta description if not set",
          })
        ),
        defineField({
          name: "type",
          type: "string",
          options: {
            list: [
              { title: "Website", value: "website" },
              { title: "Article", value: "article" },
            ],
          },
          initialValue: "website",
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Recommended size: 1200x630 pixels",
      options: {
        hotspot: true,
      },
      fields: [
        defineField(
          createLocalizedField("alt", "string", {
            validation: (Rule: any) => Rule.required(),
          })
        ),
      ],
    }),
    defineField({
      name: "robotDirectives",
      title: "Robot Directives",
      type: "object",
      description: "Control how search engines interact with this page",
      fields: [
        defineField({
          name: "noIndex",
          type: "boolean",
          initialValue: false,
          description: "Prevent page from being indexed",
        }),
        defineField({
          name: "noFollow",
          type: "boolean",
          initialValue: false,
          description: "Prevent following links on this page",
        }),
        defineField({
          name: "noArchive",
          type: "boolean",
          initialValue: false,
          description: "Prevent search engines from showing cached versions",
        }),
      ],
    }),
    defineField(
      createLocalizedField("keywords", "array", {
        of: [{ type: "string" }],
        validation: (Rule: any) =>
          Rule.max(10).warning("Focus on fewer, more relevant keywords"),
      })
    ),
  ],
});
