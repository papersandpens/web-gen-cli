import { type SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "./aboutPageType";
import * as sharedSchemas from "./shared";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Pages
    aboutPageType,

    // Shared
    ...Object.values(sharedSchemas),
  ],
};
