import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Nursing Platform CMS",

  projectId: "4fnznls9",
  dataset: "production",

  plugins: [
    deskTool({
      // Support for preview drafts
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...S.documentTypeListItems(),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
