import { readFileSync, writeFileSync } from 'fs'

const SEED_PATH = 'src/lib/seed-data.ts'
const GEN_PATH = 'generated-content.json'

const seedContent = readFileSync(SEED_PATH, 'utf-8')
const generated = JSON.parse(readFileSync(GEN_PATH, 'utf-8'))

// Find the generatedContent array start
const startMarker = 'export const generatedContent: GeneratedContent[] = ['
const startIdx = seedContent.indexOf(startMarker)
if (startIdx === -1) {
  console.error('Could not find generatedContent array')
  process.exit(1)
}

// From the start of the array, find the matching closing bracket
// by counting bracket depth
let depth = 0
let endIdx = startIdx + startMarker.length
let foundStart = false

for (let i = startIdx + startMarker.length; i < seedContent.length; i++) {
  if (seedContent[i] === '[') {
    depth++
    foundStart = true
  } else if (seedContent[i] === ']') {
    if (depth === 0) {
      endIdx = i
      break
    }
    depth--
  }
}

console.log(`GeneratedContent array: ${startIdx} -> ${endIdx}`)

// Construct the new entries
const newEntries = generated.map(g => g.entry).join(',\n')

// Check if there's already content before the closing ]
const arrayContent = seedContent.slice(startIdx + startMarker.length, endIdx).trim()
const needsComma = arrayContent.length > 0 && !arrayContent.endsWith(',')

// Insert new entries before the closing ]
const before = seedContent.slice(0, endIdx)
const after = seedContent.slice(endIdx)
const prefix = needsComma ? ',\n' : '\n'

const updated = before + prefix + newEntries + '\n' + after

writeFileSync(SEED_PATH, updated)
console.log(`✅ Appended ${generated.length} entries to seed-data.ts at position ${endIdx}`)
