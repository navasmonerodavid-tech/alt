import { supabase } from './supabase'
import {
  categories as mockCategories,
  tools as mockTools,
  generatedContent as mockContent,
} from './seed-data'
import type { Category, Tool, GeneratedContent } from './types'

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
    if (!data) return fallback
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
  return safeQuery(
    () => supabase.from('tools').select('*'),
    mockTools.map(({ alternatives, ...t }) => t)
  )
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  return safeQuery(
    () => supabase.from('tools').select('*').eq('slug', slug).single(),
    mockTools.find(t => t.slug === slug) || null
  )
}

export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  if (!hasSupabase()) {
    return mockTools.filter(t => {
      const cat = mockCategories.find(c => c.id === t.category_id)
      return cat?.slug === categorySlug
    })
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
  if (!tool || !('alternatives' in tool) || !tool.alternatives) return []

  return tool.alternatives
    .map(alt => {
      const altTool = mockTools.find(t => t.slug === alt.alternative_slug)
      if (!altTool) return null
      return {
        ...altTool,
        rank: alt.rank,
        pros_es: null,
        pros_en: null,
        cons_es: null,
        cons_en: null,
      }
    })
    .filter(Boolean) as any[]
}

export async function getGeneratedContent(toolId: string): Promise<GeneratedContent | null> {
  return safeQuery(
    () => supabase.from('generated_content').select('*').eq('tool_id', toolId).single(),
    mockContent.find(c => c.tool_id === toolId) || null
  )
}

// ============================================================
// SEARCH
// ============================================================

export async function searchTools(query: string, lang: string = 'es'): Promise<Tool[]> {
  const q = query.toLowerCase().trim()
  const source = await getTools()
  if (!q) return source.slice(0, 10)

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
