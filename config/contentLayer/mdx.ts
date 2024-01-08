import type { MDXOptions } from 'contentlayer/core'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkDirective  from'remark-directive'
import remarkGfm from 'remark-gfm'

const mdx: MDXOptions = {
  remarkPlugins: [
    remarkGfm,
    [remarkDirective],
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: "github-dark",
        onVisitLine(node) {
          if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }]
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className.push("line--highlighted")
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ["word--highlighted"]
        },
      },
    ],
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
