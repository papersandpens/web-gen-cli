import { BiLinkExternal } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from '../../helpers/createLocalizedField';

export const ctaButtonType = defineType({
  name: "ctaButton",
  title: "Call to Action Button",
  type: "object",
  icon: BiLinkExternal,
  fields: [
    {
      name: "variant",
      title: "Style Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Tertiary", value: "tertiary" },
        ],
      },
      initialValue: "primary",
    },
    defineField(createLocalizedField("ctaText", "string")),
    {
      name: "showArrowIcon",
      title: "Show Arrow Icon",
      type: "boolean",
      description: "Show a circle arrow icon at the end of the button",
      initialValue: false,
    },
    {
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      description: "Force opening in new tab (applies to all link types)",
      initialValue: false,
    },
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      description:
        "For internal links, use relative path (e.g., /contact, /about)\nFor external links, use full URL (e.g., https://www.website.com)",
      validation: (Rule: any) =>
        Rule.required().custom((value: string) => {
          if (!value) return "URL is required";

          // Check if external URL (starts with http:// or https://)
          const isExternal = /^https?:\/\//i.test(value);

          // Check if internal URL (starts with /)
          const isInternal = value.startsWith("/");

          if (!isExternal && !isInternal) {
            return "Internal links must start with / (e.g., /contact)\nExternal links must start with http:// or https:// (e.g., https://www.facebook.com)\nSection links must start with # (e.g., #contact-section)";
          }
          return true;
        }),
    }),
  ],
});
