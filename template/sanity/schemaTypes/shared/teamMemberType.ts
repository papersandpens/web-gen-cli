import { BiUser } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { createLocalizedField } from "../../helpers/createLocalizedField";
import { localesField } from "./localesField";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: BiUser,
  fields: [
    localesField,
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField(
      createLocalizedField("bio", "text", {
        title: "Biography",
        validation: (Rule: any) => Rule.required(),
      })
    ),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
