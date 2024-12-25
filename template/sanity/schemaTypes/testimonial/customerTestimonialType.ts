import { BiMessageAltDetail } from 'react-icons/bi'
import { defineField, defineType } from 'sanity'
import { localesField } from '../utils/sharedFields'
import { createI18nField } from '../utils/validationUtils'

export default defineType({
  name: 'customerTestimonial',
  title: 'Customer Testimonials',
  type: 'document',
  icon: BiMessageAltDetail,
  fields: [
    localesField,
    defineField(createI18nField('quote', 'text')),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string'
    }),
    defineField({
      name: 'authorCompany',
      title: 'Author Company',
      type: 'string'
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'carouselOrder',
      title: 'Carousel Order',
      type: 'number'
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url'
    })
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote.en',
      media: 'authorImage'
    }
  }
}) 