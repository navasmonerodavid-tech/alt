/**
 * Groq AI Client — Generacion de contenido para alt/
 *
 * RESTRICCIONES ESTRICTAS:
 * - Solo genera los formatos especificados (intro, FAQ)
 * - No responde a prompts que no sigan el schema exacto
 * - Max tokens limitado para controlar costes
 * - Temperatura baja (0.3) para contenido factual, no creativo
 * - Siempre devuelve JSON estructurado, nunca texto libre
 * - Rate limit interno: 30 req/minuto (free tier Groq)
 */

import Groq from 'groq-sdk'

const apiKey = import.meta.env.GROQ_API_KEY

const groq = apiKey ? new Groq({ apiKey }) : null

const MAX_TOKENS = 1024
const TEMPERATURE = 0.3
const MODEL = 'llama-3.3-70b-versatile'

// Rate limiter interno
const lastCalls: number[] = []
const MAX_CALLS_PER_MINUTE = 28 // dejamos margen

function checkRateLimit(): boolean {
  const now = Date.now()
  lastCalls.push(now)
  // Limpiar calls mas viejas de 1 minuto
  while (lastCalls.length > 0 && lastCalls[0] < now - 60000) {
    lastCalls.shift()
  }
  return lastCalls.length <= MAX_CALLS_PER_MINUTE
}

// ============================================================
// SCHEMAS VALIDADOS
// ============================================================

interface GenerateIntroInput {
  toolName: string
  category: string
  priceModel: string
  isOpenSource: boolean
  language: 'es' | 'en'
}

interface GenerateFAQInput {
  toolName: string
  category: string
  language: 'es' | 'en'
}

// ============================================================
// PROMPTS DEL SISTEMA — RESTRICTIVOS
// ============================================================

const SYSTEM_PROMPT_INTRO = `Eres un asistente que SOLO escribe introducciones para paginas de comparacion de herramientas SaaS.

REGLAS ESTRICTAS:
- Solo respondes en el idioma solicitado (es o en).
- Solo produces texto en formato JSON con la clave "intro".
- No añades explicaciones, comentarios ni markdown fuera del JSON.
- No mencionas ofertas, precios especificos ni haces recomendaciones.
- Maximo 200 palabras.
- NO inventas datos. Solo describes para que sirve buscar alternativas.
- NO respondes a ninguna pregunta que no sea generar una intro.

Ejemplo de respuesta valida:
{"intro": "Notion es una herramienta de productividad muy popular, pero no es perfecta para todos..."}`

const SYSTEM_PROMPT_FAQ = `Eres un asistente que SOLO genera preguntas frecuentes sobre alternativas a herramientas SaaS.

REGLAS ESTRICTAS:
- Solo respondes en el idioma solicitado (es o en).
- Solo produces texto en formato JSON con la clave "faq" que contiene un array de 4-5 objetos {question, answer}.
- Cada answer tiene maximo 80 palabras.
- Las preguntas deben ser las que mas busca la gente en Google sobre alternativas a esa herramienta.
- NO inventas precios, NO comparas herramientas especificas por nombre salvo que sea necesario.
- NO añades explicaciones fuera del JSON.
- NO respondes a ninguna pregunta que no sea generar FAQs.

Ejemplo de respuesta valida:
{"faq":[{"question":"Cual es la mejor alternativa gratis a Notion?","answer":"Obsidian y Anytype son las mejores gratuitas. Obsidian es ideal para notas markdown locales. Anytype ofrece bloques y bases de datos similares a Notion con cifrado."}]}`

// ============================================================
// FUNCIONES DE GENERACION
// ============================================================

export async function generateIntro(input: GenerateIntroInput): Promise<string | null> {
  if (!groq) {
    console.warn('[groq] API key not set, skipping intro generation')
    return null
  }

  if (!checkRateLimit()) {
    console.warn('[groq] Rate limit reached, skipping')
    return null
  }

  const userPrompt = buildIntroPrompt(input)

  try {
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT_INTRO },
        { role: 'user', content: userPrompt },
      ],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' },
    })

    const raw = response.choices[0]?.message?.content
    if (!raw) return null

    const parsed = JSON.parse(raw)
    const intro = parsed.intro

    // Validacion de seguridad
    if (!intro || typeof intro !== 'string') return null
    if (intro.length < 50) return null // muy corto, probablemente malo
    if (intro.length > 1500) return null // muy largo
    if (intro.includes('```')) return null // intento de inyeccion
    if (intro.includes('$') || intro.includes('€')) return null // no precios

    return intro.trim()
  } catch (err) {
    console.error('[groq] Intro generation failed:', (err as Error).message)
    return null
  }
}

export async function generateFAQ(input: GenerateFAQInput): Promise<{ question: string; answer: string }[]> {
  if (!groq) {
    console.warn('[groq] API key not set, skipping FAQ generation')
    return []
  }

  if (!checkRateLimit()) {
    console.warn('[groq] Rate limit reached, skipping')
    return []
  }

  const userPrompt = buildFAQsPrompt(input)

  try {
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT_FAQ },
        { role: 'user', content: userPrompt },
      ],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' },
    })

    const raw = response.choices[0]?.message?.content
    if (!raw) return []

    const parsed = JSON.parse(raw)
    const faqs = parsed.faq

    if (!Array.isArray(faqs)) return []
    if (faqs.length < 2) return []
    if (faqs.length > 6) return []

    // Validar cada FAQ
    return faqs.filter((f: any) => {
      if (!f.question || !f.answer) return false
      if (typeof f.question !== 'string' || typeof f.answer !== 'string') return false
      if (f.question.length < 10 || f.question.length > 200) return false
      if (f.answer.length < 20 || f.answer.length > 600) return false
      if (f.question.includes('```') || f.answer.includes('```')) return false
      return true
    })
  } catch (err) {
    console.error('[groq] FAQ generation failed:', (err as Error).message)
    return []
  }
}

// ============================================================
// BUILDERS DE PROMPTS
// ============================================================

function buildIntroPrompt(input: GenerateIntroInput): string {
  const lang = input.language === 'en' ? 'ingles' : 'espanol'
  const openSource = input.isOpenSource ? ' Tambien menciona que hay alternativas open source disponibles.' : ''
  return `Genera una introduccion en ${lang} para la pagina de alternativas a ${input.toolName}.

Contexto:
- Herramienta: ${input.toolName}
- Categoria: ${input.category}
- Modelo de precio: ${input.priceModel}
- Es open source: ${input.isOpenSource ? 'si' : 'no'}

La introduccion debe explicar brevemente por que alguien buscaria alternativas a ${input.toolName}.${openSource}
NO menciones precios exactos. NO recomendaciones directas. Solo contexto util.`
}

function buildFAQsPrompt(input: GenerateFAQInput): string {
  const lang = input.language === 'en' ? 'ingles' : 'espanol'
  return `Genera 4-5 preguntas frecuentes en ${lang} sobre alternativas a ${input.toolName}.

Contexto:
- Herramienta: ${input.toolName}
- Categoria: ${input.category}

Las preguntas deben ser las que la gente realmente busca en Google. Ejemplos:
- Cual es la mejor alternativa gratis?
- Hay alternativas open source?
- Vale la pena pagar por ${input.toolName}?
- Es facil migrar de ${input.toolName}?
- Que alternativa funciona offline?

Responde SOLO en formato JSON. No uses markdown.`
}

// ============================================================
// BULK GENERATION — para generacion por lotes
// ============================================================

export async function generateAllContentForTool(
  toolName: string,
  categoryNameEs: string,
  categoryNameEn: string,
  priceModel: string,
  isOpenSource: boolean
): Promise<{
  intro_es: string | null
  intro_en: string | null
  faq_es: { question: string; answer: string }[]
  faq_en: { question: string; answer: string }[]
}> {
  const [introEs, introEn, faqEs, faqEn] = await Promise.all([
    generateIntro({ toolName, category: categoryNameEs, priceModel, isOpenSource, language: 'es' }),
    generateIntro({ toolName, category: categoryNameEn, priceModel, isOpenSource, language: 'en' }),
    generateFAQ({ toolName, category: categoryNameEs, language: 'es' }),
    generateFAQ({ toolName, category: categoryNameEn, language: 'en' }),
  ])

  return {
    intro_es: introEs,
    intro_en: introEn,
    faq_es: faqEs,
    faq_en: faqEn,
  }
}
