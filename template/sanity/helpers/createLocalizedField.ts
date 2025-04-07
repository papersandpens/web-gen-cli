import { ValidationContext } from "sanity";
import { LOCALES } from "../schemaTypes/config";
import { isLanguageEnabled } from "./isLanguageEnabled";
import { Document } from "./types";

// Define types for validation rule and context
export type ValidationRule = {
  custom: (
    validationFn: (value: any, context: ValidationContext) => true | string
  ) => void;
};

export const createLocalizedField = (
  fieldName: string,
  fieldType: string,
  options: Record<string, any> = {}
) => {
  const { validation, hidden, ...restOptions } = options;
  return {
    name: fieldName,
    title: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
    type: "object",
    options: {
      collapsed: false,
    },
    fields: [
      {
        name: "en",
        title: "English",
        type: fieldType,
        hidden: ({ document }: { document: Document }) => {
          if (hidden) return hidden({ document });
          return false;
        },
        validation: (Rule: ValidationRule) =>
          Rule.custom((value: any, context: ValidationContext) => {
            if (!isLanguageEnabled(context.document, LOCALES.EN)) return true;
            if (hidden && hidden({ document })) return true;

            if (validation) {
              const customRule = validation(Rule);
              if (customRule && !value) return "This field is required";
            }

            return value ? true : "Required for English content";
          }),
        ...restOptions,
      },
      {
        name: "vi",
        title: "Vietnamese",
        type: fieldType,
        hidden: ({ document }: { document: Document }) => {
          const isLangEnabled = isLanguageEnabled(document, LOCALES.VI);

          // If hidden function is not provided, show field only if language is enabled
          if (!hidden) return !isLangEnabled;

          // If hidden function exists, show field only if both language is enabled
          // and hidden function returns false
          return !isLangEnabled || hidden({ document });
        },
        validation: (Rule: ValidationRule) =>
          Rule.custom((value: any, context: ValidationContext) => {
            if (!isLanguageEnabled(context.document, LOCALES.VI)) return true;
            if (hidden && hidden({ document })) return true;

            if (validation) {
              const customRule = validation(Rule);
              if (customRule && !value) return "This field is required";
            }

            return true;
          }),
        ...restOptions,
      },
    ],
  };
};
