import {visit} from 'unist-util-visit'
import {h} from 'hastscript'

const reg = [
  new RegExp(/^info\s{0,}\w{0,}$/ig),
  new RegExp(/^tip\s{0,}\w{0,}$/ig),
  new RegExp(/^caution\s{0,}\w{0,}$/ig),
  new RegExp(/^danger\s{0,}\w{0,}$/ig),
  new RegExp(/^note\s{0,}\w{0,}$/ig),
]
/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export default function admonition() {
  return (tree) => {
    visit(tree, (node) => {
      console.log(node)
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const testRes =  reg.some((exp) => {
          return exp.test(node.name)
        })
        if (!testRes) return
        const data = node.data || (node.data = {})
        const tagName = node.type === 'textDirective' ? 'span' : 'div'
        node.attributes.class = 'admonition-' + node.name
        data.hName = tagName
        data.hProperties = h(tagName, node.attributes).properties
      }
    })
  }
}
