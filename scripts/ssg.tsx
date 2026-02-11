import fs from 'fs'
import path from 'path'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from '../src/App'

const distDir = path.resolve('dist')
const indexPath = path.join(distDir, 'index.html')

const template = fs.readFileSync(indexPath, 'utf-8')

const appHtml = renderToString(<StrictMode><App /></StrictMode>)

const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
)

fs.writeFileSync(indexPath, html)

console.log('✅ index.html prerendered')