import {FEATURES} from '../config'
import {Rule} from 'sanity'

export const vietnameseValidation = (rule: Rule) => {
  return FEATURES.REQUIRE_VIETNAMESE ? rule.required() : rule
} 