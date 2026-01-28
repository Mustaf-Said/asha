import { defineType, defineField } from "sanity";

export default defineType({
  name: "resourceListSection",
  title: "Resource List Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Resource Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "link", title: "Link", type: "url" },
            {
              name: "type",
              title: "Resource Type",
              type: "string",
              options: {
                list: [
                  { title: "Document", value: "document" },
                  { title: "Video", value: "video" },
                  { title: "Link", value: "link" },
                  { title: "Tool", value: "tool" },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
});
