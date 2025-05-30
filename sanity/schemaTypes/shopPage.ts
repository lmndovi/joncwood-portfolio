import { defineField, defineType } from "sanity";

export default defineType({
  name: "shopPage",
  title: "Shop Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "SHOP",
    }),
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "text",
      description: "The main heading about Redbubble products",
      initialValue:
        "Currently selling prints, posters, cushions, mugs, stickers and more on Redbubble",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Shop All",
    }),
    defineField({
      name: "redbubbleUrl",
      title: "Redbubble URL",
      type: "url",
      initialValue: "https://www.redbubble.com/people/jonwoodsart/shop",
    }),
    defineField({
      name: "originalArtworkHeading",
      title: "Original Artwork Heading",
      type: "string",
      initialValue: "ORIGINAL ARTWORK",
    }),
    defineField({
      name: "originalArtworkText",
      title: "Original Artwork Text",
      type: "text",
      initialValue:
        "For original artwork, please contact Jonathan at jonwoods55@gmail.com",
    }),
  ],
});
