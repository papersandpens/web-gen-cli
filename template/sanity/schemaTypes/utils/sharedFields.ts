import { defineField } from "sanity";
import { DEFAULT_LOCALE, LOCALES_OPTIONS } from "../config";

export const localesField = defineField({
  name: "locales",
  title: "Languages",
  type: "array",
  of: [{ type: "string" }],
  options: {
    list: LOCALES_OPTIONS,
    layout: "grid",
  },
  initialValue: [DEFAULT_LOCALE],
  validation: (Rule) => Rule.required().min(1),
});

// Helper function for creating localized fields
export const createLocalizedField = (
  fieldName: string,
  fieldType: string,
  options = {}
) => {
  return defineField({
    name: fieldName,
    type: "object",
    fields: [
      {
        name: "en",
        title: "English",
        type: fieldType,
        validation: (Rule) =>
          Rule.custom((value, context) => {
            const doc = context.document as any;
            return doc?.locales?.includes("en") && !value
              ? "This field is required for English content"
              : true;
          }),
        ...options,
      },
      {
        name: "vi",
        title: "Vietnamese",
        type: fieldType,
        hidden: ({ document }) =>
          !Array.isArray(document?.locales) ||
          !document?.locales.includes("vi"),
        validation: (Rule) =>
          Rule.custom((value, context) => {
            const doc = context.document as any;
            return doc?.locales?.includes("vi") && !value
              ? "This field is required for Vietnamese content"
              : true;
          }),
        ...options,
      },
    ],
  });
};

export const seoFields = [
  defineField({
    name: "seoKeywords",
    title: "SEO Keywords",
    type: "array",
    of: [{ type: "string" }],
    options: { layout: "tags" },
  }),
  defineField({
    name: "ogImage",
    title: "Open Graph Image",
    type: "image",
  }),
];

export const ctaSectionFields = defineField({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    {
      name: "ctaText",
      title: "CTA Text",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "vi", title: "Vietnamese", type: "text" },
      ],
    },
    {
      name: "ctaButtonPrimary",
      title: "Primary Button",
      type: "object",
      fields: [
        {
          name: "buttonText",
          title: "Button Text",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "vi", title: "Vietnamese", type: "string" },
          ],
        },
        { name: "buttonURL", title: "Button URL", type: "url" },
      ],
    },
    {
      name: "ctaButtonSecondary",
      title: "Secondary Button",
      type: "object",
      fields: [
        {
          name: "buttonText",
          title: "Button Text",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "vi", title: "Vietnamese", type: "string" },
          ],
        },
        { name: "buttonURL", title: "Button URL", type: "url" },
      ],
    },
    {
      name: "ctaImage",
      title: "CTA Image",
      type: "image",
    },
  ],
});
