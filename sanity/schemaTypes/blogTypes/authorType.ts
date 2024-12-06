import {BiUser} from 'react-icons/bi'
import {defineField, defineType} from 'sanity'
import {vietnameseValidation} from '../utils/validationUtils'

export default defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: BiUser,
  fields: [
    // Name in both languages
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Author image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Bio in both languages
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text', rows: 3},
        {name: 'vi', title: 'Vietnamese', type: 'text', rows: 3},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
