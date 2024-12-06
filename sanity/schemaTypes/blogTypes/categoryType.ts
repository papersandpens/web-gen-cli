import {BiCategory} from 'react-icons/bi'
import {defineField, defineType} from 'sanity'
import {vietnameseValidation} from '../utils/validationUtils'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: BiCategory,
  fields: [
    // Name in both languages
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'vi', title: 'Vietnamese', type: 'string', validation: vietnameseValidation},
      ],
    }),
    // Description in both languages
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text', rows: 2},
        {name: 'vi', title: 'Vietnamese', type: 'text', rows: 2},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'description.en',
    },
  },
})
