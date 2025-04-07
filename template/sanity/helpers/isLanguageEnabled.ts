import { LOCALES } from "../schemaTypes/config";
import { Document } from "./types";

export const isLanguageEnabled = (
  document: Document | undefined,
  language: string
): boolean => {
  if (!document) return false;

  // If locales array is empty or undefined, only enable English
  if (!document.locales || document.locales.length === 0) {
    return language === LOCALES.EN;
  }

  // Check if the language is in the locales array
  return document.locales.includes(language);
};
