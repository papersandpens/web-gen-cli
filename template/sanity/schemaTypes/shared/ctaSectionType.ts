import { BiMessageSquareDetail } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from "../../helpers/createLocalizedField";

export const ctaSectionType = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  icon: BiMessageSquareDetail,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      fields: [defineField(createLocalizedField("alt", "string"))],
      options: {
        hotspot: true,
      },
    }),
    defineField(createLocalizedField("title", "string")),
    defineField(createLocalizedField("description", "text")),
    defineField({
      name: "ctas",
      title: "Call to Actions",
      type: "array",
      description:
        "Add up to 2 call-to-action buttons. The first button will be treated as primary, the second as secondary.",
      validation: (Rule) => Rule.max(2).unique(),
      of: [
        {
          type: "ctaButton",
          // Override the default variant based on array position
          options: {
            editModal: "dialog",
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      ctaCount: "ctas.length",
    },
    prepare({ title, ctaCount = 0 }) {
      return {
        title: title?.en || "CTA Section",
        subtitle: `${ctaCount} button${ctaCount === 1 ? "" : "s"}`,
      };
    },
  },
});
