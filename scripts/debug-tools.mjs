import { readFileSync } from 'fs'
let c = readFileSync('src/lib/seed-data.ts', 'utf-8')

// Count entries with and without slug
const entries = c.match(/\n  \{\s*\n    id: '[^']+'/g) || []
const slugs = c.match(/slug: '([^']+)'/g) || []

console.log(`Entries found: ${entries.length}`)
console.log(`Slugs found: ${slugs.length}`)
console.log(`Difference: ${entries.length - slugs.length}`)

// Find entries without a slug after the id line
const lines = c.split('\n')
let inEntry = false
let hasSlug = false
let entryId = ''
let missingSlugs = []
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('  {') && lines[i+1]?.includes("id: 'tool-")) {
    inEntry = true
    hasSlug = false
    entryId = lines[i+1].match(/id: '([^']+)'/)?.[1] || ''
  }
  if (inEntry && lines[i].includes("slug: '")) {
    hasSlug = true
  }
  if (inEntry && (lines[i].trim() === '}' || lines[i].trim() === '},')) {
    if (!hasSlug) missingSlugs.push(entryId)
    inEntry = false
  }
}

console.log(`\nMissing slugs: ${missingSlugs.length}`)
missingSlugs.slice(0, 10).forEach(id => console.log(`  ${id}`))
