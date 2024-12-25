import { BiUser } from "react-icons/bi";
import { defineField, defineType } from "sanity";
import { localesField } from '../utils/sharedFields'
import { createI18nField } from '../utils/validationUtils'

export default defineType({
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
    defineField(createI18nField('bio', 'text', { rows: 3 })),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage'
    }
  }
});
