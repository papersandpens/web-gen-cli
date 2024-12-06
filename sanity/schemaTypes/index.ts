import { type SchemaTypeDefinition } from "sanity";
import { blogSchemas } from "./blogTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...blogSchemas],
};
