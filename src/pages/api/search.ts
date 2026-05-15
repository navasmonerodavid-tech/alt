import { searchTools } from '@/lib/data'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const lang = url.searchParams.get('lang') || 'es'

  if (!q.trim()) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const tools = await searchTools(q, lang)

  const results = tools.map(t => {
    const descField = lang === 'en' ? 'description_en' : 'description_es'
    return {
      slug: t.slug,
      name: t.name,
      description_es: t[descField as keyof typeof t] || t.description_es,
    }
  })

  return new Response(JSON.stringify({ results }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
