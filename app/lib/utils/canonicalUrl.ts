import { LOCALES } from '@/sanity/schemaTypes/config'

type GenerateCanonicalUrlProps = {
  locale: string
  slug: string
  type: 'blog' | 'event' | 'legal' // add other content types as needed
  baseUrl: string
}

export const generateCanonicalUrl = ({
  locale,
  slug,
  type,
  baseUrl
}: GenerateCanonicalUrlProps): string => {
  // Remove trailing slash from baseUrl if it exists
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  
  // For default locale (English), we might want to exclude the locale from the URL
  const localePath = locale === LOCALES.EN ? '' : `/${locale}`
  
  // Generate the path based on content type
  const typePath = type === 'legal' ? '' : `/${type}`
  
  return `${cleanBaseUrl}${localePath}${typePath}/${slug}`
} 