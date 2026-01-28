import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuredGuidanceSection",
  title: "Featured Guidance",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "articles",
      title: "Guidance Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
});
