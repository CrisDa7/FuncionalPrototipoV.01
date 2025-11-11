const fs = require('fs')
const path = require('path')

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', '.git'].includes(e.name)) continue
      walk(full, cb)
    } else if (/\.(ts|tsx|js|jsx)$/.test(e.name)) {
      cb(full)
    }
  }
}

function fixFile(file) {
  let src = fs.readFileSync(file, 'utf8')
  const orig = src
  // Replace imports like 'package@1.2.3' or "@scope/pkg@1.2.3" with 'package' / '@scope/pkg'
  // Regex: match ' or " then group package@version then closing quote
  src = src.replace(/(['\"])((?:@[^\/\'\"]+\/[^\'\"]+|[^\'\"]+?)@\d+(?:\.\d+){0,2})(['\"])/g, (m, q1, pkgVer, q2) => {
    // Remove the last @version suffix
    const ix = pkgVer.lastIndexOf('@')
    if (ix <= 0) return m // safety
    const pkg = pkgVer.slice(0, ix)
    return q1 + pkg + q2
  })

  if (src !== orig) {
    fs.writeFileSync(file, src, 'utf8')
    console.log('Fixed imports in', file)
  }
}

const root = path.resolve(__dirname, '..')
walk(root, fixFile)
console.log('Done')
