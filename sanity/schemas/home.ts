import { defineType, defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "featuredArticles",
      title: "Featured Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
});
