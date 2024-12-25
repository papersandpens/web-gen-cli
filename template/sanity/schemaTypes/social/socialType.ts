import { BiLink } from 'react-icons/bi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social Links',
  type: 'document',
  icon: BiLink,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url'
    },
    prepare({ title, subtitle }) {
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle
      }
    }
  }
}) 