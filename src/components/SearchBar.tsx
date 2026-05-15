import { useState, useEffect, useRef } from 'react'

interface SearchResult {
  slug: string
  name: string
  description_es: string
  category_slug?: string
  category_name?: string
}

interface Props {
  lang?: string
}

export default function SearchBar({ lang = 'es' }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isEn = lang === 'en'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${lang}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.results || [])
          setOpen(true)
        }
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [query, lang])

  const searchUrl = isEn ? `/en/search` : `/alternativas-a`

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={isEn ? 'Search a tool... (e.g. Notion, Slack, Figma)' : 'Busca una herramienta... (ej. Notion, Slack, Figma)'}
          className="w-full px-5 py-3.5 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-ink)] placeholder-[var(--color-ink-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]/30 focus:border-[var(--color-green)] text-lg shadow-sm"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-light)]">
          {loading ? '⏳' : '🔍'}
        </span>
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[var(--color-border)] rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map(r => (
            <a
              key={r.slug}
              href={`/alternativas-a/${r.slug}`}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-cream)] transition-colors no-underline border-b border-[var(--color-border-light)] last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[var(--color-ink)] text-sm">
                  {isEn ? 'Alternatives to ' : 'Alternativas a '}
                  <span className="text-[var(--color-green)]">{r.name}</span>
                </div>
                <div className="text-xs text-[var(--color-ink-light)] mt-0.5 line-clamp-1">
                  {r.description_es}
                </div>
                {r.category_name && (
                  <span className="text-[10px] text-[var(--color-ink-light)] bg-[var(--color-border-light)] px-1.5 py-0.5 rounded mt-1 inline-block">
                    {r.category_name}
                  </span>
                )}
              </div>
              <span className="text-[var(--color-green)] shrink-0 mt-1">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
