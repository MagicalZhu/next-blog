import { makeSource } from "contentlayer/source-files"
import mdx from './config/contentLayer/mdx';
import Post from './config/contentLayer/posts';

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
  mdx
})
