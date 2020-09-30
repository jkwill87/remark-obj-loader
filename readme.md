# remark-obj-loader

A markdown loader for WebPack using [remark](https://github.com/remarkjs/remark). It exports an object contain two entries:

- **`html`**: containing the HTML representation of markdown
- **`attrs`**: containing frontmatter attributes


## Installation instructions

- **npm**: `npm install -D remark remark-obj-loader`
- **yarn**: `yarn add -D remark remark-obj-loader`


## Options

remark-obj-loader has a single option: **`plugins`**. Any passed [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) will be applied to the markdown body before being converted into html.


## Configuration Examples

### `webpack.config.js`
``` javascript
const RemarkFencedDivs = require('remark-fenced-divs')
const RemarkUnwrapImages = require('remark-unwrap-images')

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'remark-obj-loader',
            options: {
              plugins: [RemarkFencedDivs, RemarkUnwrapImages]
            }
          }
        ]
      }
    ]
  }
  // ...
}
```

### `vue.config.js`

``` javascript
const RemarkFencedDivs = require('remark-fenced-divs')
const RemarkUnwrapImages = require('remark-unwrap-images')

module.exports = {
  // ...
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('remark-obj-loader')
      .loader('remark-obj-loader')
      .options({
        plugins: [
          RemarkFencedDivs,
          RemarkUnwrapImages
        ]
      })
  },
  // ...
}
```