import { BiQuestionMark } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { localesField } from "../utils/sharedFields";
import { createI18nField } from "../utils/validationUtils";

export default defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  icon: BiQuestionMark,
  fields: [
    localesField,
    defineField(createI18nField("question", "string")),
    defineField(
      createI18nField("answer", "array", {
        of: [{ type: "block" }],
      })
    ),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      description:
        "Set the display order of FAQs. Higher numbers appear first (e.g., 10 appears before 1). Use 0 for default priority.",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).integer(),
    }),
  ],
  preview: {
    select: {
      title: "question.en",
      subtitle: "priority",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Priority: ${subtitle}`,
      };
    },
  },
});
