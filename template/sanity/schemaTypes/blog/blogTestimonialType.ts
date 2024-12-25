import { BiMessageSquareDetail } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { localesField } from "../utils/sharedFields";
import { createI18nField } from "../utils/validationUtils";

export default defineType({
  name: "blogTestimonial",
  title: "Blog Testimonials",
  type: "document",
  icon: BiMessageSquareDetail,
  fields: [
    localesField,
    defineField(createI18nField("quote", "text")),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorTitle",
      title: "Author Title",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "quote.en",
      media: "profileImage",
    },
  },
});
