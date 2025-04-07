import { BiQuestionMark } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from "../../helpers/createLocalizedField";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  icon: BiQuestionMark,
  fields: [
    defineField(createLocalizedField("title", "string")),
    defineField(createLocalizedField("description", "text")),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "ctaButton",
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField(createLocalizedField("question", "string")),
            defineField(createLocalizedField("answer", "text")),
          ],
          preview: {
            select: {
              title: "question.en",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "ctaSection",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
});
