import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "CONTACT JON",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      initialValue:
        "The youngest of 4 and born in Royston, Cambridgeshire, Jonathan Charles Woods is an artist, art therapist, dad and dog lover who has retired to the wilds of Penzance with his wonderful wife Carol.",
    }),
    defineField({
      name: "callToAction",
      title: "Call to Action",
      type: "string",
      initialValue: "His art is very much for sale!",
    }),
    defineField({
      name: "servicesText",
      title: "Services Text",
      type: "text",
      initialValue:
        "Get in touch to find out more about buying, commissioning, exploring his back catalogue or exhibiting Jon's work",
    }),
    defineField({
      name: "emailHeading",
      title: "Email Heading",
      type: "string",
      initialValue: "EMAIL",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      initialValue: "jonwoods55@gmail.com",
    }),
    defineField({
      name: "socialHeading",
      title: "Social Media Heading",
      type: "string",
      initialValue: "FOLLOW",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://instagram.com",
    }),
  ],
});
