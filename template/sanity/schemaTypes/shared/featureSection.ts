import { BiMessageSquareDetail } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from '../../helpers/createLocalizedField';

export const featureSectionType = defineType({
  name: "featureSection",
  title: "Feature Section",
  type: "object",
  icon: BiMessageSquareDetail,
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
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
          options: {
            editModal: "dialog",
          },
        },
      ],
    }),
    // Feature List
    defineField({
      name: "featureList",
      title: "Feature List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField(createLocalizedField("title", "string")),
            defineField(createLocalizedField("description", "text")),
            defineField({
              name: "cta",
              title: "CTA",
              type: "ctaButton",
            }),
          ],
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
