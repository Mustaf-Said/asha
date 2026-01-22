import { defineType, defineField } from "sanity";

export default defineType({
  name: "discussion",
  title: "Community Discussion",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Discussion Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "content",
      title: "Initial Post",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "replyCount",
      title: "Number of Replies",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "isPinned",
      title: "Pin to Top",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "replies",
      title: "Replies",
      type: "array",
      of: [
        {
          type: "object",
          name: "reply",
          title: "Reply",
          fields: [
            defineField({
              name: "text",
              title: "Reply Text",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "author",
              title: "Author",
              type: "string",
            }),
            defineField({
              name: "createdAt",
              title: "Created At",
              type: "datetime",
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category.title",
    },
    prepare({ title, category }) {
      return {
        title,
        subtitle: category || "No category",
      };
    },
  },
});
