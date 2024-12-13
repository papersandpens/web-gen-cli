import { BiCalendarEvent } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import {
  ctaSectionFields,
  localesField,
  seoFields,
} from "../utils/sharedFields";
import { createI18nField } from "../utils/validationUtils";

export default defineType({
  name: "event",
  title: "Events",
  type: "document",
  icon: BiCalendarEvent,
  fields: [
    localesField,
    defineField(createI18nField("title", "string")),
    defineField(
      createI18nField("description", "array", {
        of: [{ type: "block" }, { type: "image" }],
      })
    ),
    defineField({
      name: "date",
      title: "Event Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seatsAvailable",
      title: "Seats Available",
      type: "number",
    }),
    defineField(
      createI18nField("eventSlug", "slug", {
        options: {
          source: (doc: any) => doc.title?.[doc.locales?.[0] || "en"],
          maxLength: 96,
        },
      })
    ),
    ctaSectionFields,
    defineField({
      name: "featureImage",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "date",
      media: "featureImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: new Date(subtitle).toLocaleDateString(),
        media,
      };
    },
  },
});
