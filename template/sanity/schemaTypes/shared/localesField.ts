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
