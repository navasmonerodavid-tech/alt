import fs from 'fs'

const data = JSON.parse(fs.readFileSync('generated-content.json', 'utf8'))
const output = []

output.push('// Auto-generated from generated-content.json')
output.push('export const generatedContentData = [')

for (const item of data) {
  try {
    const fn = new Function('return (' + item.entry + ')')
    const parsed = fn()

    if (parsed) {
      output.push('  {')
      output.push(`    tool_id: '${item.tool_id}',`)
      output.push(`    intro_es: \`${(parsed.intro_es || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,`)
      output.push(`    intro_en: \`${(parsed.intro_en || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,`)

      if (parsed.faq_es && Array.isArray(parsed.faq_es)) {
        output.push('    faq_es: [')
        for (const faq of parsed.faq_es) {
          const q = (faq.question || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')
          const a = (faq.answer || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')
          output.push(`      { question: \`${q}\`, answer: \`${a}\` },`)
        }
        output.push('    ],')
      } else {
        output.push('    faq_es: [],')
      }

      if (parsed.faq_en && Array.isArray(parsed.faq_en)) {
        output.push('    faq_en: [')
        for (const faq of parsed.faq_en) {
          const q = (faq.question || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')
          const a = (faq.answer || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')
          output.push(`      { question: \`${q}\`, answer: \`${a}\` },`)
        }
        output.push('    ],')
      } else {
        output.push('    faq_en: [],')
      }

      output.push('  },')
    }
  } catch (e) {
    console.error('Error parsing ' + item.tool_id + ': ' + e.message)
  }
}

output.push('];')
fs.writeFileSync('src/lib/content-data.ts', output.join('\n'), 'utf8')
console.log('Generated content-data.ts with ' + data.length + ' entries')
