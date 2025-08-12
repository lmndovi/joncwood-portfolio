import { type SchemaTypeDefinition } from "sanity";
import artwork from "./artwork";
import contactPage from "./contactPage";
import aboutPage from "./aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artwork, contactPage, aboutPage],
};
