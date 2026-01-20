import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Nursing Platform CMS",

  projectId: "4fnznls9",
  dataset: "production",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
