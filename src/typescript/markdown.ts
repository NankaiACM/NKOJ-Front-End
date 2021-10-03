import MarkdownIt from 'markdown-it'
import MarkdownItMathjax from 'markdown-it-mathjax'
import MarkdownItLatex from 'markdown-it-latex'

const markdownIt = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
markdownIt.use(MarkdownItMathjax)
markdownIt.use(MarkdownItLatex)
export default markdownIt
