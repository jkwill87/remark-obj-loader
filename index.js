var frontMatter = require('front-matter')
var Remark = require('remark')
var vfileReporter = require('vfile-reporter')
var loaderUtils = require('loader-utils')
var RemarkHtmlPlugin = require('remark-html')

module.exports = loader

function loader(content) {
  const remark = Remark()
  // parse markdown using frontmatter to split body and attribute sections
  const markdown = frontMatter(content)
  // register plugins
  const plugins = loaderUtils.getOptions(this).plugins || []
  for (const plugin of plugins) {
    remark.use(plugin)
  }
  remark.use(RemarkHtmlPlugin)
  // process markdown body
  const processor = (error, file) => {
    const callback = this.async()
    try {
      if (error) {
        callback(vfileReporter(error))
        return
      }
      const attrs = markdown.attributes
      const html = file.contents
      // serialize into an object
      callback(null, `module.exports = ${JSON.stringify({ attrs, html })}`)
    }
    catch (error) {
      callback(error)
    }
  }
  remark.process(markdown.body, processor)
}
