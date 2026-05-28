import fs from 'fs'
import Groq from 'groq-sdk'

let groqKey = ''
try {
  const envContent = fs.readFileSync('.env', 'utf8')
  const match = envContent.match(/GROQ_API_KEY=(.+)/)
  if (match) groqKey = match[1].trim()
} catch {}

if (!groqKey) { console.error('Missing GROQ_API_KEY in .env'); process.exit(1) }

const groq = new Groq({ apiKey: groqKey })
const MODEL = 'llama-3.3-70b-versatile'

const seedSrc = fs.readFileSync('src/lib/seed-data.ts', 'utf8')

const cats = []
const catRegex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*name_es:\s*'([^']+)',\s*name_en:\s*'([^']+)'/g
let catMatch
while ((catMatch = catRegex.exec(seedSrc)) !== null) {
  cats.push({ id: catMatch[1], slug: catMatch[2], name_es: catMatch[3], name_en: catMatch[4] })
}

const tools = []
const toolRegex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?category_id:\s*'([^']+)',\s*price_model:\s*'([^']+)',[\s\S]*?is_open_source:\s*(true|false)/g
let toolMatch
while ((toolMatch = toolRegex.exec(seedSrc)) !== null) {
  tools.push({
    id: toolMatch[1], slug: toolMatch[2], name: toolMatch[3],
    category_id: toolMatch[4], price_model: toolMatch[5],
    is_open_source: toolMatch[6] === 'true'
  })
}

const contentPath = 'src/lib/content-data.ts'
const existingContent = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, 'utf8') : ''
const existingContentIds = new Set()
const idRegex = /tool_id:\s*'([^']+)'/g
let idMatch
while ((idMatch = idRegex.exec(existingContent)) !== null) {
  existingContentIds.add(idMatch[1])
}

const pending = tools.filter(t => !existingContentIds.has(t.id))
console.log(`Total: ${tools.length} | Done: ${existingContentIds.size} | Pending: ${pending.length}`)
if (pending.length === 0) { console.log('All done!'); process.exit(0) }

function escape(str) {
  return str.replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

let fileContent = existingContent
let generated = 0
const BATCH_SAVE = 10

async function generate(t) {
  const cat = cats.find(c => c.id === t.category_id)
  const catEs = cat?.name_es || 'software'
  const catEn = cat?.name_en || 'software'

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const r = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: 'Eres asistente que SOLO genera JSON. intro_es (100-200 palabras), intro_en, faq_es (4-5 preguntas con respuestas 30-80 palabras), faq_en. NO precios exactos, NO marcas. SOLO JSON.' },
          { role: 'user', content: `Alternativas a ${t.name}. Cat: ${catEs}/${catEn}. Precio: ${t.price_model}. OS: ${t.is_open_source}. JSON: {"intro_es":"...","intro_en":"...","faq_es":[{"question":"...","answer":"..."}],"faq_en":[{"question":"...","answer":"..."}]}` }
        ],
        temperature: 0.3, max_tokens: 1200,
        response_format: { type: 'json_object' }
      })

      const c = JSON.parse(r.choices[0].message.content)
      if (c.intro_es && c.intro_en && c.faq_es?.length >= 2 && c.faq_en?.length >= 2) {
        const faqEs = c.faq_es.map(f => `      { question: \`${escape(f.question)}\`, answer: \`${escape(f.answer)}\` }`).join(',\n')
        const faqEn = c.faq_en.map(f => `      { question: \`${escape(f.question)}\`, answer: \`${escape(f.answer)}\` }`).join(',\n')
        return `  {\n    tool_id: '${t.id}',\n    intro_es: \`${escape(c.intro_es)}\`,\n    intro_en: \`${escape(c.intro_en)}\`,\n    faq_es: [\n${faqEs}\n    ],\n    faq_en: [\n${faqEn}\n    ],\n  },`
      }
      return null
    } catch (e) {
      if (e.message?.includes('429') || e.message?.includes('rate_limit')) {
        const wait = (attempt + 1) * 8000 // 8s, 16s, 24s, 32s, 40s backoff
        process.stdout.write(`⏳(${wait/1000}s)`)
        await new Promise(r => setTimeout(r, wait))
        continue
      }
      throw e
    }
  }
  return null
}

for (let i = 0; i < pending.length; i++) {
  const t = pending[i]
  process.stdout.write(`[${i+1}/${pending.length}] ${t.name}... `)

  try {
    const entry = await generate(t)
    if (entry) {
      fileContent = fileContent.replace('];', entry + '\n];')
      generated++
      existingContentIds.add(t.id)
      console.log(`✅ (${existingContentIds.size} total)`)

      if (generated % BATCH_SAVE === 0) {
        fs.writeFileSync(contentPath, fileContent, 'utf8')
        console.log(`  💾 Saved (${existingContentIds.size} entries)`)
      }
    } else {
      console.log(`⚠️ skip`)
    }
  } catch (e) {
    console.log(`❌ ${e.message?.slice(0,60)}`)
  }

  // Adaptive delay: longer if we had retries
  await new Promise(r => setTimeout(r, 2000))
}

fs.writeFileSync(contentPath, fileContent, 'utf8')
console.log(`\n✅ Done! Generated ${generated} new. Total: ${existingContentIds.size}`)
