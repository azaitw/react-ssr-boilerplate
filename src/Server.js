import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import App from './App'
import api from './api'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Access static files copied by Webpack
app.use('/assets', express.static(path.join(__dirname, '../dist/assets')))

// SEO
app.use('/robots.txt', express.static(path.join(__dirname, '../dist/assets/robots.txt')))

// Access js files generated by webpack
app.get(/\.js$/, express.static(path.join(__dirname, '../dist')))

// Server-side rendering with styled-components
app.get('*', (req, res) => {
  const sheet = new ServerStyleSheet()
  const render = ({ pageObj, result }) => {
    return fs.readFile(path.join(__dirname, '../dist/index.html'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('An error occurred')
      }

      // Render react app with renderToString and collect rendered styles
      const body = renderToString(sheet.collectStyles(<Router location={req.url} context={{}}><App pageObj={pageObj} result={result} /></Router>))

      // Aggregate rendered styles
      const styleTags = sheet.getStyleTags()

      // Insert rendered html, style tag, and fetched data (saved as window.INIT_DATA) into html page
      const output = data.replace(
        '<body><div id="app"></div>',
        `<body>${styleTags}<div id="app">${body}</div><script>window.INIT_DATA = ${JSON.stringify({ pageObj, result })}</script>`
      )
      return res.send(output)
    })
  }
  const pageObj = api.getPage(req.url)

  // Routing and the corresponding API calls
  if (pageObj.page === 'home') {
    api.getItems()
      .then(result =>
        render({ pageObj, result })
      )
  } else if (pageObj.page === 'item') {
    // Redirect to home page if data is not available
    api.getItem()
      .then(result =>
        (result)
          ? render({ pageObj, result })
          : res.redirect('/')
      )
  } else {
    return res
      .status(404)
      .send('Not found')
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
