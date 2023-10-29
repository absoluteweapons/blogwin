import type { TinaField } from "tinacms";
export function blog_postFields() {
  return [
    {
      type: "string",
      name: "layout",
      label: "layout",
    },
    {
      type: "string",
      name: "title",
      label: "Post Title",
    },
    {
      type: "datetime",
      name: "date",
      label: "Post Date",
    },
    {
      type: "image",
      name: "cover",
      label: "Cover Image",
    },
    {
      type: "boolean",
      name: "draft",
      label: "Draft",
    },
    {
      type: "string",
      name: "meta_description",
      label: "Meta Description",
      ui: {
        component: "textarea",
      },
    },
  ] as TinaField[];
}
