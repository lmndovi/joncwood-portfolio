import { type SchemaTypeDefinition } from "sanity";
import artwork from "./artwork";
import contactPage from "./contactPage";
import shopPage from "./shopPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artwork, contactPage, shopPage],
};
