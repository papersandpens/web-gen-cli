import { LOCALES } from "../schemaTypes/config";

/**
 * Type representing the available locale values from the LOCALES config
 */
export type LocaleValues = (typeof LOCALES)[keyof typeof LOCALES];

/**
 * Generic type for fields that can be localized in any of the available locales
 * Makes all locales optional to support partial translations
 */
export type LocalizedField<T> = Partial<Record<LocaleValues, T>>;

/**
 * Helper function to safely access localized content with fallback
 * @param field - The localized field to get content from
 * @param locale - The current locale to use
 * @param fallbackLocale - The fallback locale if current locale is not available (defaults to EN)
 * @returns The localized content or undefined if not available
 */

export const localizeContent = (
  field: LocalizedField<string | null> | null | undefined,
  locale: LocaleValues,
  fallbackLocale: LocaleValues = LOCALES.EN
): string | null => {
  if (!field) return null;
  return field[locale] ?? field[fallbackLocale] ?? null;
};
