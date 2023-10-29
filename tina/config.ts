import { defineConfig } from "tinacms";
import { blog_postFields } from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch,
  clientId: "05ad6941-8eb2-430c-9cbe-c0a73a34dcf3", // Get this from tina.io
  token: "0cbe2733f896f0da87396e220110dd96ed277410", // Get this from tina.io
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "_dist",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "_dist",
    },
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Posts",
        name: "posts",
        path: "_src/posts",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...blog_postFields(),
        ],
      },
    ],
  },
});
