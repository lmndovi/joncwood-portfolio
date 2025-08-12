import { type SchemaTypeDefinition } from "sanity";
import artwork from "./artwork";
import contactPage from "./contactPage";
import aboutPage from "./aboutPage";
import exhibitionPage from "./exhibitionPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artwork, contactPage, aboutPage, exhibitionPage],
};
