import { createLocalizedField } from "@/sanity/helpers/createLocalizedField";
import { BiUser } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { localesField } from "./localesField";

export const authorType = defineType({
  name: "author",
  title: "Authors",
  type: "document",
  icon: BiUser,
  fields: [
    localesField,
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField(
      createLocalizedField("role", "string", {
        validation: (Rule: any) => Rule.required(),
      })
    ),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Optional company logo to display alongside author information",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.en",
      media: "avatar",
    },
  },
});
