import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Digital Product",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "mainImage",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "content",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Guide", value: "guide" },
          { title: "Template", value: "template" },
          { title: "Checklist", value: "checklist" },
          { title: "Course", value: "course" },
          { title: "Bundle", value: "bundle" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "downloadUrl",
      title: "Download Link",
      type: "url",
    }),

    defineField({
      name: "isAvailable",
      title: "Available for Purchase",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],

  preview: {
    select: {
      title: "name",
      price: "price",
      type: "productType",
    },
    prepare({ title, price, type }) {
      return {
        title,
        subtitle: `${type} - $${price}`,
      };
    },
  },
});
