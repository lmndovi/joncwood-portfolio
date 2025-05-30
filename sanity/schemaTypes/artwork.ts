import { defineField, defineType } from "sanity";

export default defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Work", value: "WORK" },
          { title: "Sketch", value: "SKETCH" },
          { title: "Object", value: "OBJECT" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured in Carousel",
      type: "boolean",
      description: "Show this artwork in the homepage carousel",
      initialValue: false,
    }),
    defineField({
      name: "featuredOrder",
      title: "Featured Order",
      type: "number",
      description: "Order in the carousel (lower numbers appear first)",
      hidden: ({ document }) => !document?.featured,
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "mainImage",
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year,
        media,
      };
    },
  },
});
