// sanity/schemaTypes/exhibitionPage.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "exhibitionPage",
  title: "Exhibition Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "EXHIBITION",
    }),
    defineField({
      name: "flyerImage",
      title: "Flyer Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
