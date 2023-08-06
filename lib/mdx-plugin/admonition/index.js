import {visit} from 'unist-util-visit'
import {h} from 'hastscript'
/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export default function admonition() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (!['info', 'tip', 'caution','danger', 'note'].includes(node.name)) return
        const data = node.data || (node.data = {})
        const tagName = node.type === 'textDirective' ? 'span' : 'div'
        node.attributes.class = 'admonition-' +node.name
        data.hName = tagName
        data.hProperties = h(tagName, node.attributes).properties
      }
    })
  }
}
