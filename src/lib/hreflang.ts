/**
 * Genera pares hreflang para paginas bilingues ES↔EN.
 * La ruta usa los mismos slugs en ambos idiomas.
 */

type PageType = 'home' | 'alternatives' | 'category'

export function getHreflang(type: PageType, slug?: string) {
  const siteUrl = import.meta.env.SITE_URL || 'https://alt-saas.vercel.app'

  switch (type) {
    case 'home':
      return [
        { lang: 'es', url: `${siteUrl}/` },
        { lang: 'en', url: `${siteUrl}/en` },
        { lang: 'x-default', url: `${siteUrl}/` },
      ]
    case 'alternatives':
      if (!slug) return []
      return [
        { lang: 'es', url: `${siteUrl}/alternativas-a/${slug}` },
        { lang: 'en', url: `${siteUrl}/en/alternatives-to/${slug}` },
        { lang: 'x-default', url: `${siteUrl}/alternativas-a/${slug}` },
      ]
    case 'category':
      if (!slug) return []
      return [
        { lang: 'es', url: `${siteUrl}/herramientas/${slug}` },
        { lang: 'en', url: `${siteUrl}/en/tools/${slug}` },
        { lang: 'x-default', url: `${siteUrl}/herramientas/${slug}` },
      ]
    default:
      return []
  }
}
