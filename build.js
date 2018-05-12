const metalsminth = require('metalsmith')
const assets = require('metalsmith-assets')
const templates = require('metalsmith-templates')
const markdown = require('metalsmith-markdown')
const dataMarkdown = require('metalsmith-data-markdown')
const contentful = require('contentful-metalsmith')



metalsminth(__dirname)
    .source('src')
    .destination('build')
    .use(
        contentful({
            space_id: process.env.CMS_SPACE_ID,
            access_token: process.env.CMS_ACCESS_TOKEN
        })
    )
    .use(
        templates({
            engine: "jade"
        })
    )
    .use(markdown())
    .use(
        dataMarkdown({
            removeAttributeAfterwards: true
        })
    )
    .build(function(err){
        if (err) throw err

        console.log('build sucessfull')
    })
