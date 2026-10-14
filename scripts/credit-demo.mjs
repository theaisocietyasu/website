#!/usr/bin/env node
/**
 * Writes an author + license notice into a demo's HTML file: tags in <head> (author, copyright, license link,
 * a comment with the terms) and a small credit line pinned to the bottom of the page. Running it again replaces
 * the earlier notice, so it is safe to re-run after changing the author or license.
 *
 *   node scripts/credit-demo.mjs public/demos/<slug>.html "Joshua Tom" "CC BY-NC-ND 4.0" [year]
 *
 * The license must be one of the names in lib/licenses.json. Use the same author, license and year as the
 * demo's entry in DEMOS (lib/site.ts); the /demos build warns when a file's notice doesn't match.
 */
import { readFileSync, writeFileSync } from "node:fs"

const LICENSES = JSON.parse(readFileSync(new URL("../lib/licenses.json", import.meta.url), "utf8"))
const [file, author, license, year = String(new Date().getFullYear())] = process.argv.slice(2)

if (!file || !author || !license) {
  console.error('Usage: node scripts/credit-demo.mjs public/demos/<slug>.html "Author Name" "CC BY-NC-ND 4.0" [year]')
  process.exit(1)
}
if (!(license in LICENSES)) {
  console.error(`Unknown license "${license}". Use one of: ${Object.keys(LICENSES).join(", ")}`)
  process.exit(1)
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const { url, terms } = LICENSES[license]
const owner = `© ${year} ${author}`
const sentence = url ? `${owner}. Licensed under ${license} (${url}): ${terms}.` : `${owner}. All rights reserved: ${terms}.`

const START = "<!-- demo-credit:start -->"
const END = "<!-- demo-credit:end -->"

const head = [
  START,
  `<!-- ${sentence.replace(/--/g, "–")} Third-party data inside keeps its own license. -->`,
  `<meta name="author" content="${esc(author)}">`,
  `<meta name="copyright" content="${esc(owner)}">`,
  url ? `<link rel="license" href="${url}">` : "",
  `<style>.demo-credit{position:fixed;left:50%;bottom:3px;transform:translateX(-50%);z-index:2147483000;font:10px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.02em;white-space:nowrap;color:rgba(217,221,228,.45);text-decoration:none}a.demo-credit:hover{color:rgba(217,221,228,.9)}</style>`,
  END,
]
  .filter(Boolean)
  .join("\n")

const label = url ? `${esc(owner)} · ${license}` : `${esc(owner)} · all rights reserved`
const body = [
  START,
  url
    ? `<a class="demo-credit" href="${url}" target="_blank" rel="license noopener">${label}</a>`
    : `<span class="demo-credit">${label}</span>`,
  END,
].join("\n")

let html = readFileSync(file, "utf8")
html = html.replace(new RegExp(`\\n?${START}[\\s\\S]*?${END}`, "g"), "")

// Head: right after <meta charset> (or <head>), near the top, before any scripts. Body: before the last </body>.
const anchor = /<meta charset=[^>]*>/i.exec(html) ?? /<head[^>]*>/i.exec(html)
if (!anchor) throw new Error(`${file}: no <head> found`)
const at = anchor.index + anchor[0].length
html = `${html.slice(0, at)}\n${head}${html.slice(at)}`

const close = html.toLowerCase().lastIndexOf("</body>")
if (close < 0) throw new Error(`${file}: no </body> found`)
html = `${html.slice(0, close)}${body}\n${html.slice(close)}`

writeFileSync(file, html)
console.log(`${file}: ${sentence}`)
