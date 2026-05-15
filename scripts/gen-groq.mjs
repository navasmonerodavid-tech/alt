import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const groqKey = process.env.GROQ_API_KEY

if (!supabaseUrl || !supabaseKey || !groqKey) {
  console.error('Missing env vars: SUPABASE_URL, SUPABASE_ANON_KEY, GROQ_API_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
const groq = new Groq({ apiKey: groqKey })

async function main() {
  const { data: tools } = await supabase.from('tools').select('id,name,slug')
  const { data: existing } = await supabase.from('generated_content').select('tool_id')
  const done = new Set(existing.map(e => e.tool_id))
  const pending = tools.filter(t => !done.has(t.id))

  console.log(`Content pending for ${pending.length} tools`)

  for (let i = 0; i < pending.length; i++) {
    const t = pending[i]
    console.log(`[${i+1}/${pending.length}] ${t.name}...`)

    try {
      const r = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Eres asistente que SOLO genera JSON para pagina de alternativas SaaS. Genera: intro_es, intro_en, faq_es (4-5 objetos {question,answer} en espanol), faq_en (4-5 objetos {question,answer} in english). Max 150 palabras por intro, 80 por answer. No inventas precios.' },
          { role: 'user', content: `Genera contenido para pagina de alternativas a ${t.name}. Formato JSON: {"intro_es":"...","intro_en":"...","faq_es":[{"question":"...","answer":"..."}],"faq_en":[{"question":"...","answer":"..."}]}` }
        ],
        temperature: 0.3, max_tokens: 1200, response_format: { type: 'json_object' }
      })

      const c = JSON.parse(r.choices[0].message.content)
      if (c.intro_es) {
        await supabase.from('generated_content').upsert({
          tool_id: t.id, intro_es: c.intro_es, intro_en: c.intro_en,
          faq_es: c.faq_es || [], faq_en: c.faq_en || [],
          last_generated_at: new Date().toISOString()
        }, { onConflict: 'tool_id' })
      }
      console.log(`  ✅ ${t.name}`)
    } catch (e) {
      console.log(`  ⚠️ ${t.name}: ${e.message?.slice(0, 100)}`)
    }

    if (i < pending.length - 1) await new Promise(r => setTimeout(r, 3500))
  }

  const { count } = await supabase.from('generated_content').select('*', { count: 'exact', head: true })
  console.log(`\n✅ Done! Content: ${count}/30`)
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
