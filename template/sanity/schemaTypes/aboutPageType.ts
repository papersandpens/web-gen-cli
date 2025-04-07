import { BiFile } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from "../helpers/createLocalizedField";
import { localesField } from "./shared/localesField";

// This page is a sample code for reference only !!!
export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  options: {
    singleton: true,
  } as any,
  icon: BiFile,
  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
  groups: [
    {
      name: "hero",
      title: "Hero Section",
    },
    {
      name: "ourStory",
      title: "Our Story Section",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    localesField,
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        defineField(createLocalizedField("subtitle", "string")),
        defineField(createLocalizedField("title", "string")),
        defineField(createLocalizedField("description", "text")),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          validation: (Rule) => Rule.required(),
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "ctaList",
          title: "CTA List",
          type: "array",
          validation: (Rule) => Rule.max(2),
          of: [{ type: "ctaButton" }],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      group: "seo",
    }),
  ],
});
