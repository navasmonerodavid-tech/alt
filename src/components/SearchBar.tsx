import { useState, useEffect, useRef, useCallback } from 'react'

interface ToolData {
  slug: string
  name: string
  description_es: string
  description_en: string
  category_slug?: string
  category_name?: string
}

interface Props {
  lang?: string
  toolsData: ToolData[]
}

export default function SearchBar({ lang = 'es', toolsData }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const isEn = lang === 'en'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const q = query.toLowerCase().trim()
  const results = q ? toolsData.filter(t => {
    const nameMatch = t.name.toLowerCase().includes(q)
    const descField = isEn ? t.description_en : t.description_es
    const descMatch = (descField || '').toLowerCase().includes(q)
    return nameMatch || descMatch
  }).slice(0, 10) : []

  const resultHref = (slug: string) => isEn ? `/en/alternatives-to/${slug}` : `/alternativas-a/${slug}`

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open || results.length === 0) {
      if (e.key === 'ArrowDown' && query.length >= 2) {
        setOpen(true)
        setActiveIndex(0)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < results.length) {
          const r = results[activeIndex]
          window.location.href = resultHref(r.slug)
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        setActiveIndex(-1)
        inputRef.current?.blur()
        break
    }
  }, [open, results, activeIndex, query])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]')
      if (items[activeIndex]) {
        (items[activeIndex] as HTMLElement).scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex])

  const handleFocus = () => {
    if (query.length >= 2 && results.length > 0) {
      setOpen(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setOpen(true)
    setActiveIndex(-1)
  }

  const comboId = 'search-combobox'
  const listId = 'search-listbox'

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-activedescendant={activeIndex >= 0 ? `${comboId}-option-${activeIndex}` : undefined}
          aria-label={isEn ? 'Search tools' : 'Buscar herramientas'}
          aria-autocomplete="list"
          autoComplete="off"
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={isEn ? 'Search a tool... (e.g. Notion, Slack, Figma)' : 'Busca una herramienta... (ej. Notion, Slack, Figma)'}
          className="w-full px-5 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] placeholder-[var(--color-ink-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]/30 focus:border-[var(--color-green)] text-lg shadow-sm"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-light)]" aria-hidden="true">🔍</span>
      </div>

      {open && results.length > 0 && (
        <div
          id={listId}
          ref={listRef}
          role="listbox"
          className="absolute top-full mt-2 left-0 right-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {results.map((r, i) => (
            <a
              id={`${comboId}-option-${i}`}
              key={r.slug}
              role="option"
              aria-selected={i === activeIndex}
              href={resultHref(r.slug)}
              className={`flex items-start gap-3 px-4 py-3 transition-colors no-underline border-b border-[var(--color-border-light)] last:border-0 ${i === activeIndex ? 'bg-[var(--color-green-bg)]' : 'hover:bg-[var(--color-cream)]'}`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[var(--color-ink)] text-sm">
                  {isEn ? 'Alternatives to ' : 'Alternativas a '}
                  <span className="text-[var(--color-green)]">{r.name}</span>
                </div>
                <div className="text-xs text-[var(--color-ink-light)] mt-0.5 line-clamp-1">
                  {isEn ? r.description_en : r.description_es}
                </div>
                {r.category_name && (
                  <span className="text-[10px] text-[var(--color-ink-light)] bg-[var(--color-border-light)] px-1.5 py-0.5 rounded mt-1 inline-block">
                    {r.category_name}
                  </span>
                )}
              </div>
              <span className="text-[var(--color-green)] shrink-0 mt-1" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
