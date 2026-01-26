import { defineType, defineField } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
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
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),

    // Translated titles & excerpts
    defineField({
      name: "title_so",
      title: "Title (Somali)",
      type: "string",
      description: "Automatically translated from English; editors can adjust.",
    }),
    defineField({
      name: "title_ar",
      title: "Title (Arabic)",
      type: "string",
      description: "Automatically translated from English; editors can adjust.",
    }),
    defineField({
      name: "excerpt_so",
      title: "Excerpt (Somali)",
      type: "text",
      rows: 3,
      description: "Automatically translated from English; editors can adjust.",
    }),
    defineField({
      name: "excerpt_ar",
      title: "Excerpt (Arabic)",
      type: "text",
      rows: 3,
      description: "Automatically translated from English; editors can adjust.",
    }),

    // ✅ ADD THIS
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Auto-translated content fields
    defineField({
      name: "soContent",
      title: "Somali Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Automatically translated from English; editors can adjust.",
    }),
    defineField({
      name: "arContent",
      title: "Arabic Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Automatically translated from English; editors can adjust.",
    }),

    defineField({
      name: "translationMeta",
      title: "Translation Metadata",
      type: "object",
      fields: [
        defineField({ name: "autoTranslatedAt", title: "Auto Translated At", type: "datetime" }),
        defineField({ name: "sourceLang", title: "Source Language", type: "string" }),
      ],
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),

    // SEO
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
    }),
  ],
});
