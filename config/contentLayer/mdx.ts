import type { MDXOptions } from 'contentlayer2/core'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkDirective  from'remark-directive'
import remarkGfm from 'remark-gfm'
import { visit } from "unist-util-visit"

const mdx: MDXOptions = {
  remarkPlugins: [
    remarkGfm,
    [remarkDirective],
  ],
  rehypePlugins: [
    rehypeSlug,
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "pre") {
          const [codeEl] = node.children
          if (codeEl.tagName !== "code") {
            return
          }
          node.__rawString__ = codeEl.children?.[0].value
          node.__src__ = node.properties?.__src__
        }
      })
    },
    [
      rehypePrettyCode,
      {
        theme: "github-dark",
        onVisitLine(node) {
          if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }]
          }
        },
      },
    ],
    () => (tree) => {
      visit(tree, (node) => {
        // showLineNumbers
        if (node?.type === "element" && node?.tagName === "code") {
          if ("data-theme" in node.properties) {
            node.properties["data-line-numbers-max-digits"] = "3"
            node.properties["data-line-numbers"] = ""
          }
        }
        if (node?.type === "element" && node?.tagName === "figure") {
          if (!("data-rehype-pretty-code-figure" in node.properties)) {
            return
          }
          const preElement = node.children.at(-1)
          if (preElement.tagName !== "pre") {
            return
          }
          preElement.properties["__withMeta__"] = node.children.at(0).tagName === "div"
          preElement.properties["__rawString__"] = node.__rawString__

          if (node.__src__) {
            preElement.properties["__src__"] = node.__src__
          }
        }
      })
    },
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["subheading-anchor"],
          ariaLabel: "Link to section",
        },
      },
    ],
  ],
};

export default mdx;
