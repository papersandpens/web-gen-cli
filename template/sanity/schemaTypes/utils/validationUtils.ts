import { SanityDocument } from "next-sanity";
import { ValidationContext } from "sanity";
import { LOCALES } from "../config";

type Document = {
  locales?: string[];
} & SanityDocument;

// Define types for validation rule and context
type ValidationRule = {
  custom: (
    validationFn: (value: any, context: ValidationContext) => true | string
  ) => void;
};

export const isLanguageEnabled = (
  document: Document | undefined,
  language: string
): boolean => {
  return (
    Array.isArray(document?.locales) && document.locales.includes(language)
  );
};

export const createI18nField = (
  fieldName: string,
  fieldType: string,
  options: Record<string, any> = {}
) => ({
  name: fieldName,
  title: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
  type: "object",
  fields: [
    {
      name: "en",
      title: "English",
      type: fieldType,
      hidden: ({ document }: { document: Document }) =>
        !isLanguageEnabled(document, LOCALES.EN),
      validation: (Rule: ValidationRule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          if (!isLanguageEnabled(context.document, LOCALES.EN)) return true;
          return value ? true : "Required for English content";
        }),
      ...options,
    },
    {
      name: "vi",
      title: "Vietnamese",
      type: fieldType,
      hidden: ({ document }: { document: Document }) =>
        !isLanguageEnabled(document, LOCALES.VI),
      validation: (Rule: ValidationRule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          if (!isLanguageEnabled(context.document, LOCALES.VI)) return true;
          return value ? true : "Required for Vietnamese content";
        }),
      ...options,
    },
  ],
});
