import {
  type ComputedFields,
  defineDocumentType,
} from "contentlayer2/source-files";

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields:ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}


export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
    },
    draft: {
      type: "boolean",
      default: false,
    },
    forward: {
      type: "boolean",
      default: false,
    },
    fav: {
      type: "boolean",
      default: false,
    },
    lock: {
      type: "boolean",
      default: false,
    },
    image: {
      type: "string",
    },
    authors: {
      type: "string",
      default: 'ant',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    categories: {
      type: 'list',
      of: { type: 'string' },
    },
  },
  computedFields,
}))

export default Post;
