import { defineField, defineType } from "sanity";
import { localesField } from "../utils/sharedFields";
import { createI18nField } from "../utils/validationUtils";

export default defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    localesField,
    defineField(createI18nField("title", "string")),
    defineField(
      createI18nField("slug", "slug", {
        options: {
          source: (doc: any) => doc.title?.[doc.locales?.[0] || "en"],
          maxLength: 96,
        },
      })
    ),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField(
      createI18nField("content", "array", {
        of: [
          {
            type: "block",
            styles: [
              { title: "Normal", value: "normal" },
              { title: "H1", value: "h1" },
              { title: "H2", value: "h2" },
              { title: "H3", value: "h3" },
              { title: "H4", value: "h4" },
            ],
            lists: [
              { title: "Bullet", value: "bullet" },
              { title: "Number", value: "number" },
            ],
          },
        ],
      })
    ),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Set to true if this is the current version",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      updatedAt: "lastUpdated",
      isActive: "isActive",
    },
    prepare({ title, updatedAt, isActive }) {
      return {
        title,
        subtitle: `${isActive ? "Active" : "Inactive"} - Last updated: ${new Date(updatedAt).toLocaleDateString()}`,
      };
    },
  },
});
