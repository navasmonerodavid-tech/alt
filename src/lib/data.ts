import { supabase } from './supabase'
import {
  categories as mockCategories,
  tools as mockTools,
  generatedContent as mockContent,
} from './seed-data'
import { generatedContentData } from './content-data'
import { logoDomains } from './logo-domains'
import type { Category, Tool, GeneratedContent } from './types'

// Merge seed content with generated content data
const allMockContent = [
  ...mockContent,
  ...generatedContentData,
]

const hasSupabase = () => !!(import.meta.env.SUPABASE_URL && import.meta.env.SUPABASE_ANON_KEY)

// Timeout wrapper — evita que se cuelgue el build si Supabase no responde
function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('TIMEOUT')), ms)
    Promise.resolve(promise).then(r => { clearTimeout(timer); resolve(r) }).catch(e => { clearTimeout(timer); reject(e) })
  })
}

// Cache de disponibilidad — evita reintentos durante el build
let _supabaseAvailable: boolean | null = null
let _supabaseCheckTime = 0

async function isSupabaseAvailable(): Promise<boolean> {
  const now = Date.now()
  if (_supabaseAvailable !== null && (now - _supabaseCheckTime < 30000)) {
    return _supabaseAvailable
  }
  if (!hasSupabase()) {
    _supabaseAvailable = false
    _supabaseCheckTime = now
    return false
  }
  // Intento rapido de conexion (1s timeout)
  try {
    const { error } = await withTimeout(
      supabase.from('categories').select('count', { count: 'exact', head: true }),
      1000
    )
    _supabaseAvailable = !error
  } catch {
    _supabaseAvailable = false
  }
  _supabaseCheckTime = now
  return _supabaseAvailable
}

// ============================================================
// HELPERS
// ============================================================

async function safeQuery<T>(queryFn: () => PromiseLike<{ data: T | null; error?: any }>, fallback: T): Promise<T> {
  if (!await isSupabaseAvailable()) return fallback
  try {
    const { data, error } = await withTimeout(queryFn(), 3000)
    if (error) {
      console.warn(`[db] Query error: ${error.message || error}`)
      return fallback
    }
    if (data === null || data === undefined) return fallback
    if (Array.isArray(data) && data.length === 0) return fallback
    return data
  } catch (err) {
    console.warn(`[db] Connection/Timeout:`, (err as Error).message)
    return fallback
  }
}

// ============================================================
// CATEGORIES
// ============================================================

export async function getCategories(): Promise<Category[]> {
  return safeQuery(
    () => supabase.from('categories').select('*'),
    mockCategories
  )
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safeQuery(
    () => supabase.from('categories').select('*').eq('slug', slug).single(),
    mockCategories.find(c => c.slug === slug) || null
  )
}

// ============================================================
// TOOLS
// ============================================================

export async function getTools(): Promise<Tool[]> {
  const result = await safeQuery(
    () => supabase.from('tools').select('*'),
    mockTools.map(({ alternatives, ...t }) => t)
  )
  return result.map(t => ({
    ...t,
    logo_url: getToolLogoUrl(t.slug, t.logo_url),
  }))
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const result = await safeQuery(
    () => supabase.from('tools').select('*').eq('slug', slug).single(),
    mockTools.find(t => t.slug === slug) || null
  )
  if (!result) return null
  return {
    ...result,
    logo_url: getToolLogoUrl(result.slug, result.logo_url),
  }
}

export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  const resultFilter = (tools: typeof mockTools) => tools.filter(t => {
    const cat = mockCategories.find(c => c.id === t.category_id)
    return cat?.slug === categorySlug
  })

  if (!hasSupabase()) {
    return resultFilter(mockTools).map(t => ({
      ...t,
      logo_url: getToolLogoUrl(t.slug, t.logo_url),
    }))
  }

  try {
    const cat = await getCategoryBySlug(categorySlug)
    if (!cat) return []
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category_id', cat.id)
    if (error || !data) {
      return resultFilter(mockTools).map(t => ({
        ...t,
        logo_url: getToolLogoUrl(t.slug, t.logo_url),
      }))
    }
    return data.map((t: any) => ({
      ...t,
      logo_url: getToolLogoUrl(t.slug, t.logo_url),
    }))
  } catch {
    return resultFilter(mockTools).map(t => ({
      ...t,
      logo_url: getToolLogoUrl(t.slug, t.logo_url),
    }))
  }

  try {
    const cat = await getCategoryBySlug(categorySlug)
    if (!cat) return []
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category_id', cat.id)
    if (error || !data) {
      return mockTools.filter(t => {
        const mc = mockCategories.find(c => c.id === t.category_id)
        return mc?.slug === categorySlug
      })
    }
    return data
  } catch {
    return mockTools.filter(t => {
      const cat = mockCategories.find(c => c.id === t.category_id)
      return cat?.slug === categorySlug
    })
  }
}

export async function getAlternativesForTool(toolSlug: string): Promise<(Tool & {
  rank: number
  pros_es: string | null
  pros_en: string | null
  cons_es: string | null
  cons_en: string | null
})[]> {
  const tool = mockTools.find(t => t.slug === toolSlug)
  if (!tool) return []

  const result: any[] = []
  const existingSlugs = new Set<string>()
  existingSlugs.add(toolSlug)

  // Add defined alternatives if they exist
  if ('alternatives' in tool && Array.isArray(tool.alternatives)) {
    for (const alt of tool.alternatives) {
      const altTool = mockTools.find(t => t.slug === alt.alternative_slug)
      if (!altTool) continue
      existingSlugs.add(alt.alternative_slug)
      result.push({
        ...altTool,
        rank: alt.rank || result.length + 1,
        pros_es: null,
        pros_en: null,
        cons_es: null,
        cons_en: null,
      })
    }
  }

  // Expand: add tools from same category not already listed
  const categoryTools = mockTools.filter(t =>
    t.category_id === tool.category_id &&
    !existingSlugs.has(t.slug) &&
    t.slug
  )
  const extraByRating = categoryTools
    .sort((a, b) => (b.rating_g2 || 3) - (a.rating_g2 || 3))
    .slice(0, 14)

  for (const t of extraByRating) {
    result.push({
      ...t,
      rank: result.length + 1,
      pros_es: null,
      pros_en: null,
      cons_es: null,
      cons_en: null,
    })
  }

  return result
}

export async function getGeneratedContent(toolId: string): Promise<GeneratedContent | null> {
  return safeQuery(
    () => supabase.from('generated_content').select('*').eq('tool_id', toolId).single(),
    allMockContent.find(c => c.tool_id === toolId) || null
  )
}

// ============================================================
// SEARCH
// ============================================================

export async function searchTools(query: string, lang: string = 'es'): Promise<Tool[]> {
  const q = query.toLowerCase().trim()
  const source = await getTools()
  if (!q) return source.slice(0, 14)

  const descField = lang === 'en' ? 'description_en' : 'description_es'

  return source.filter(t => {
    const nameMatch = t.name.toLowerCase().includes(q)
    const descMatch = (t[descField] || '').toLowerCase().includes(q)
    const tagMatch = (t.tags || []).some(tag => tag.toLowerCase().includes(q))
    return nameMatch || descMatch || tagMatch
  }).slice(0, 15)
}

// ============================================================
// MISC
// ============================================================

export async function getFeaturedTools(): Promise<Tool[]> {
  const tools = await getTools()
  return tools.filter(t => t.listing_tier === 'featured' || t.listing_tier === 'premium')
}

export async function getToolCount(): Promise<number> {
  if (!hasSupabase()) return mockTools.length
  try {
    const { count, error } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })
    if (error || !count) return mockTools.length
    return count
  } catch {
    return mockTools.length
  }
}

// ============================================================
// LOGO URL HELPER
// ============================================================

export function getToolLogoUrl(slug: string, fallbackUrl: string | null): string | null {
  if (fallbackUrl) return fallbackUrl
  const domain = logoDomains[slug]
  if (domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  return null
}
