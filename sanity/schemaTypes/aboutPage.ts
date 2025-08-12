// sanity/schemaTypes/aboutPage.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "ABOUT JON",
    }),
    defineField({
      name: "about",
      title: "About",
      type: "array",
      of: [{ type: "block" }], // rich text for flexibility
      initialValue: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "This is where Jon's story will go...",
            },
          ],
        },
      ],
    }),
  ],
});
