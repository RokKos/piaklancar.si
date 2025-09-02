import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "../src/assets/images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "published",
            label: "Published Date",
            required: true,
            ui: { dateFormat: "YYYY-MM-DD" }
          },
          {
            type: "datetime",
            name: "updated",
            label: "Updated Date",
            required: false,
            ui: { dateFormat: "YYYY-MM-DD" }
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
          },
          {
            type: "image",
            name: "image",
            label: "Post Cover Image",
            // Point this at your images folder
            ui: {
              // This will auto-populate with image files from src/assets/images
              directory: "src/assets/images",
              previewSrc: true,
            }
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft?",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Main Content",
            isBody: true, // Ensures WYSIWYG editing for the Markdown content
          },
        ]
        ,
      },
    ],
  },
});
