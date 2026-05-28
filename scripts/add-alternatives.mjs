// Add alternatives to all tools by linking them within their category
import { readFileSync, writeFileSync } from 'fs'

const SEED_PATH = 'src/lib/seed-data.ts'
let seed = readFileSync(SEED_PATH, 'utf-8')

// Extract all tools with their category and slug
const toolRegex = /  \{\s*\n    id: '([^']+)', slug: '([^']+)', name: '([^']+)',[\s\S]*?category_id: '([^']+)'/g
const tools = []
let match
while ((match = toolRegex.exec(seed)) !== null) {
  tools.push({ id: match[1], slug: match[2], name: match[3], category: match[4] })
}
console.log(`Found ${tools.length} tools`)

// Group by category
const byCategory = {}
for (const t of tools) {
  if (!byCategory[t.category]) byCategory[t.category] = []
  byCategory[t.category].push(t)
}

// For each tool without alternatives, add 5-8 alternatives from same category
const seenCategories = Object.keys(byCategory)
let addedCount = 0

for (const catId of seenCategories) {
  const catTools = byCategory[catId]
  if (catTools.length < 2) continue
  
  for (const tool of catTools) {
    // Check if tool already has alternatives
    const toolPattern = new RegExp(`(id: '${tool.id}'.*?)(category_id: '${tool.category}')`, 's')
    const toolBlock = seed.match(toolPattern)
    if (!toolBlock) continue
    
    // Skip if already has alternatives
    if (toolBlock[0].includes('alternatives:')) continue
    
    // Pick 5-8 alternatives from same category (not itself)
    const alternatives = catTools
      .filter(a => a.slug !== tool.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((a, i) => `      { alternative_slug: '${a.slug}', rank: ${i + 1} }`)
    
    if (alternatives.length === 0) continue
    
    const altBlock = `\n    alternatives: [\n${alternatives.join(',\n')}\n    ],`
    
    // Insert alternatives before the closing of the tool entry
    // Match: category_id: 'cat-X', ... rest until the  } that closes the object
    const lineRegex = new RegExp(`(id: '${tool.id}'.*?)(  },\\n(?:  \\{))`, 's')
    if (lineRegex.test(seed)) {
      seed = seed.replace(lineRegex, `$1${altBlock}\n  },\n$2`)
      addedCount++
    }
  }
}

writeFileSync(SEED_PATH, seed)
console.log(`✅ Added alternatives to ${addedCount} tools`)
