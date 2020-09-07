import path from 'path'
import fs from 'fs'

import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'

import App from '../App'

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
    const appMarkup = ReactDOMServer.renderToString(<App />);

    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('something went wrong;', err);
            return res.status(500).send('server error')
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`)
        )
    })
})

app.use(express.static('./build'))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})



