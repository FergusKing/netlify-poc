const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const markdown = require('metalsmith-markdown')
const dataMarkdown = require('metalsmith-data-markdown')
const contentful = require('contentful-metalsmith')

require('dotenv').config()

Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .use(contentful({
    space_id: process.env.CMS_SPACE_ID,
    access_token: process.env.CMS_ACCESS_TOKEN,
    common: {
      featured_author: {
        limit: 1,
        filter: {
          'sys.id[in]': '5JQ715oDQW68k8EiEuKOk8'
        }
      }
    },
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(assets({
    source: 'assets/',
    destination: 'assets/'
  }))
  .use(assets({
    source: 'root-assets/',
    destination: ''
  }))
  .use(markdown())
  .use(dataMarkdown({
    removeAttributeAfterwards: true
  }))
  .build(function (err) {
    if (err) throw err

    console.log('Successfully build metalsmith')
  })
