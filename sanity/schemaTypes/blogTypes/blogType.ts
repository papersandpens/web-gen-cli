import {BiBook} from 'react-icons/bi'
import {defineField, defineType} from 'sanity'
import {vietnameseValidation} from '../utils/validationUtils'

type SpanChild = {
  _type: 'span'
  text?: string
}

type Block = {
  _type: 'block'
  children: SpanChild[]
}

type Image = {
  _type: 'image'
}

type ContentBlock = Block | Image

export default defineType({
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  icon: BiBook,
  fields: [
    // Title in both languages
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'vi', title: 'Vietnamese', type: 'string', validation: vietnameseValidation},
      ],
    }),

    // Slug field
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Slug',
          type: 'slug',
          options: {
            source: 'title.en',
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'vi',
          title: 'Vietnamese Slug',
          type: 'slug',
          options: {
            source: 'title.vi',
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // Featured Image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),

    // Description in both languages
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'text', rows: 3},
        {name: 'vi', title: 'Vietnamese', type: 'text', rows: 3},
      ],
    }),

    // Content in both languages
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{type: 'block'}, {type: 'image'}],
        },
        {
          name: 'vi',
          title: 'Vietnamese',
          type: 'array',
          of: [{type: 'block'}, {type: 'image'}],
        },
      ],
    }),

    // SEO and Metadata
    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'object',
          fields: [
            {name: 'en', title: 'English', type: 'string'},
            {name: 'vi', title: 'Vietnamese', type: 'string'},
          ],
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'object',
          fields: [
            {name: 'en', title: 'English', type: 'text', rows: 2},
            {name: 'vi', title: 'Vietnamese', type: 'text', rows: 2},
          ],
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        },
      ],
    }),

    // Additional Metadata
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'publishedAt',
      media: 'featuredImage',
      content: 'content.en',
      slug: 'slug.en',
    },
    prepare({
      title,
      subtitle,
      media,
      content,
      slug,
    }: {
      title: string
      subtitle: string
      media: any
      content?: ContentBlock[]
      slug: string
    }) {
      const readingTime = content
        ? Math.ceil(
            content.reduce((acc: number, block: ContentBlock) => {
              if (block._type === 'block') {
                return (
                  acc +
                  block.children
                    .filter((child): child is SpanChild => child._type === 'span')
                    .reduce(
                      (wordCount, span) => wordCount + (span.text?.split(/\s+/).length || 0),
                      0,
                    )
                )
              }
              return acc
            }, 0) / 200,
          )
        : 0

      return {
        title,
        subtitle: `${readingTime} min read · ${subtitle ? new Date(subtitle).toLocaleDateString() : ''}`,
        media,
        slug,
      }
    },
  },
})
