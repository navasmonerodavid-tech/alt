// Rebuild seed-data.ts cleanly with alternatives for ALL tools
import { readFileSync, writeFileSync } from 'fs'

const SEED_PATH = 'src/lib/seed-data.ts'
let seed = readFileSync(SEED_PATH, 'utf-8')

// Extract header and footer
const genIdx = seed.indexOf('export const generatedContent:')
const catStart = seed.indexOf('export const categories:')
const toolsStart = seed.indexOf('export const tools:')
if (genIdx < 0) { console.error('Cannot find generatedContent'); process.exit(1) }

const headerCats = seed.slice(catStart, toolsStart)  // categories section
const footer = seed.slice(genIdx)  // generated content section

// Extract ALL tool ID, slug, name, and category
const toolRegex = /  \{\s*\n    id: '([^']+)', slug: '([^']+)', name: '([^']+)'/g
const tools = []
let match
while ((match = toolRegex.exec(seed)) !== null) {
  const toolId = match[1], slug = match[2], name = match[3]
  // Also extract category_id
  const catMatch = new RegExp(`id: '${toolId}'[\\s\\S]*?category_id: '([^']+)'`, 's').exec(seed)
  if (catMatch) {
    tools.push({ id: toolId, slug, name, category: catMatch[1] })
  }
}

console.log(`Found ${tools.length} tools`)

// Group by category
const byCategory = {}
for (const t of tools) {
  if (!byCategory[t.category]) byCategory[t.category] = []
  byCategory[t.category].push(t)
}

// Find existing alternatives (tool-1 through tool-30 that already have them)
// Parse the original tool blocks to extract existing data
const originalToolBlocks = new Map()
for (const t of tools) {
  // Extract the FULL tool block for each tool ID
  const blockPattern = new RegExp(`(  \\{[\\s\\S]*?id: '${t.id}'[\\s\\S]*?\\n  \\})`, 's')
  const block = seed.match(blockPattern)
  if (block) {
    originalToolBlocks.set(t.id, block[0])
  }
}

// Build new tool entries
const newToolEntries = []
let addedAlts = 0

for (const tool of tools) {
  const existingBlock = originalToolBlocks.get(tool.id)
  if (!existingBlock) {
    console.log(`⚠️ Missing block for ${tool.slug}`)
    continue
  }
  
  // Check if it already has alternatives
  const hasAlternatives = existingBlock.includes('alternatives:')
  
  if (!hasAlternatives) {
    // Generate alternatives from same category (not itself)
    const catTools = (byCategory[tool.category] || [])
    const alternatives = catTools
      .filter(a => a.slug !== tool.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((a, i) => `      { alternative_slug: '${a.slug}', rank: ${i + 1} }`)
    
    if (alternatives.length > 0) {
      const altBlock = `\n    alternatives: [\n${alternatives.join(',\n')}\n    ],`
      
      // Insert alternatives before the closing } of the tool
      // Each tool ends with \n  }
      const modified = existingBlock.replace(/\n  \}$/, `${altBlock}\n  }`)

      // Escape dollar signs for template
      newToolEntries.push(modified)
      addedAlts++
    } else {
      newToolEntries.push(existingBlock)
    }
  } else {
    newToolEntries.push(existingBlock)
  }
}

console.log(`Added alternatives to ${addedAlts} tools`)

// Rebuild the file
const newContent = seed.slice(0, seed.indexOf('import type')) +
  seed.slice(seed.indexOf('import type'), seed.indexOf('export const categories:')) +
  '\nexport const categories: Category[] = [\n' +
  seed.slice(
    seed.indexOf('export const categories: Category[] = [') + 'export const categories: Category[] = ['.length,
    seed.indexOf(']\n\nexport const tools:')
  ).trim() +
  '\n]\n\n' +
  'export const tools: (Tool & { alternatives?: { alternative_slug: string; rank: number }[] })[] = [\n' +
  newToolEntries.join(',\n') +
  '\n]\n\n' +
  footer

writeFileSync(SEED_PATH, newContent)
console.log(`✅ Rebuilt with ${newToolEntries.length} tools`)
