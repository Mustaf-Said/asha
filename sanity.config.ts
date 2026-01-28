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
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Pages group
            S.listItem()
              .title("Pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Homepage")
                      .child(
                        S.document()
                          .schemaType("home")
                          .documentId("home")
                      ),
                    S.divider(),
                    S.documentTypeListItem("page").title("All Pages"),
                  ])
              ),

            S.divider(),

            // Content group
            S.listItem()
              .title("Content")
              .child(
                S.list()
                  .title("Content")
                  .items([
                    S.documentTypeListItem("article").title("Articles"),
                    S.documentTypeListItem("discussion").title("Discussions"),
                    S.documentTypeListItem("category").title("Categories"),
                  ])
              ),

            S.divider(),

            // Shop
            S.documentTypeListItem("product").title("Products"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
