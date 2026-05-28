import { writeFileSync } from 'fs'
import Groq from 'groq-sdk'

const groqKey = process.env.GROQ_API_KEY
if (!groqKey) { console.error('Missing GROQ_API_KEY'); process.exit(1) }

const groq = new Groq({ apiKey: groqKey })

// All 30 tools with their IDs (from seed-data.ts)
const allTools = [
  { id: 'tool-1', name: 'Notion', skip: true },
  { id: 'tool-2', name: 'Slack', skip: true },
  { id: 'tool-3', name: 'Figma', skip: true },
  { id: 'tool-4', name: 'Trello' },
  { id: 'tool-5', name: 'Asana' },
  { id: 'tool-6', name: 'ClickUp' },
  { id: 'tool-7', name: 'Monday.com' },
  { id: 'tool-8', name: 'HubSpot CRM' },
  { id: 'tool-9', name: 'Pipedrive' },
  { id: 'tool-10', name: 'Semrush' },
  { id: 'tool-11', name: 'Ahrefs' },
  { id: 'tool-12', name: 'Canva' },
  { id: 'tool-13', name: 'Obsidian' },
  { id: 'tool-14', name: 'Anytype' },
  { id: 'tool-15', name: 'Linear' },
  { id: 'tool-16', name: 'Jira' },
  { id: 'tool-17', name: 'Discord' },
  { id: 'tool-18', name: 'Mattermost' },
  { id: 'tool-19', name: 'Penpot' },
  { id: 'tool-20', name: 'Mailchimp' },
  { id: 'tool-21', name: 'Brevo' },
  { id: 'tool-22', name: 'Zapier' },
  { id: 'tool-23', name: 'Make' },
  { id: 'tool-24', name: 'n8n' },
  { id: 'tool-25', name: 'Google Analytics' },
  { id: 'tool-26', name: 'Plausible Analytics' },
  { id: 'tool-27', name: 'Shopify' },
  { id: 'tool-28', name: 'WooCommerce' },
  { id: 'tool-29', name: 'Zoho CRM' },
  { id: 'tool-30', name: 'Holded' },
]

const pending = allTools.filter(t => !t.skip)

console.log(`Generating content for ${pending.length} tools using Groq (Llama 3.3 70B)...`)

const results = []

for (let i = 0; i < pending.length; i++) {
  const t = pending[i]
  const idx = allTools.indexOf(t)
  const gcId = `gc-${idx + 1}`
  
  console.log(`[${i+1}/${pending.length}] ${t.name}...`)
  
  try {
    const r = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente que SOLO genera JSON para una pagina de alternativas SaaS. Generas: intro_es (max 150 palabras, en espanol), intro_en (max 150 palabras, in english), faq_es (4-5 objetos {question, answer} en espanol, cada answer max 80 palabras), faq_en (4-5 objetos {question, answer} in english, cada answer max 80 palabras). Las FAQs deben ser preguntas reales que la gente busca en Google sobre alternativas a esta herramienta. NO inventas precios. NO recomendaciones directas. Solo describes el contexto de por que alguien buscaria alternativas.`
        },
        {
          role: 'user',
          content: `Genera contenido para pagina de alternativas a ${t.name}. Responde SOLO con JSON en este formato exacto: {"intro_es":"...","intro_en":"...","faq_es":[{"question":"...","answer":"..."}],"faq_en":[{"question":"...","answer":"..."}]}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    })
    
    const raw = r.choices[0]?.message?.content
    if (!raw) { console.log(`  ⚠️ empty response`); continue }
    
    const parsed = JSON.parse(raw)
    
    if (parsed.intro_es && parsed.intro_en && parsed.faq_es?.length >= 3 && parsed.faq_en?.length >= 3) {
      // Escape single quotes for TypeScript
      const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      
      const entry = `  {
    id: '${gcId}',
    tool_id: '${t.id}',
    intro_es: '${esc(parsed.intro_es)}',
    intro_en: '${esc(parsed.intro_en)}',
    faq_es: [
${parsed.faq_es.map(f => `      { question: '${esc(f.question)}', answer: '${esc(f.answer)}' }`).join(',\n')}
    ],
    faq_en: [
${parsed.faq_en.map(f => `      { question: '${esc(f.question)}', answer: '${esc(f.answer)}' }`).join(',\n')}
    ],
    last_generated_at: '2026-05-26T00:00:00Z',
  }`
      
      results.push({ id: gcId, tool_id: t.id, entry })
      console.log(`  ✅ ${t.name} (${parsed.faq_es.length} FAQs ES, ${parsed.faq_en.length} FAQs EN)`)
    } else {
      console.log(`  ⚠️ ${t.name}: missing fields in response`)
    }
  } catch (e) {
    console.log(`  ❌ ${t.name}: ${e.message?.slice(0, 100)}`)
  }
  
  // Rate limit: 28 req/min max
  if (i < pending.length - 1) await new Promise(r => setTimeout(r, 2500))
}

// Output as a JSON file for easy integration
writeFileSync('generated-content.json', JSON.stringify(results, null, 2))
console.log(`\n✅ Saved ${results.length} entries to generated-content.json`)

// Also output the TypeScript array to stdout for manual copy
console.log(`\n--- TYPESCRIPT FOR seed-data.ts ---`)
console.log(results.map(r => r.entry).join(',\n'))
