import { BiQuestionMark } from 'react-icons/bi'
import { defineField, defineType } from 'sanity'
import { localesField } from '../utils/sharedFields'
import { createI18nField } from '../utils/validationUtils'

export default defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  icon: BiQuestionMark,
  fields: [
    localesField,
    defineField(createI18nField('question', 'string')),
    defineField(createI18nField('answer', 'array', {
      of: [{ type: 'block' }]
    })),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'question.en',
      subtitle: 'priority'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Priority: ${subtitle}`
      }
    }
  }
}) 