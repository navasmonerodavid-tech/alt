import { getTools, getCategories } from '@/lib/data'

export async function GET() {
  const siteUrl = import.meta.env.SITE_URL || 'https://alt-source.vercel.app'
  const tools = await getTools()
  const categories = await getCategories()

  // Generate comparison pairs dynamically: top 2 tools per category
  const compPairs: [string, string][] = []
  for (const cat of categories) {
    const catTools = tools.filter(t => t.category_id === cat.id)
    if (catTools.length >= 2) {
      const sorted = catTools.sort((a, b) => (b.rating_g2 || 0) - (a.rating_g2 || 0))
      if (sorted[0].slug && sorted[1].slug) {
        compPairs.push([sorted[0].slug, sorted[1].slug])
      }
    }
  }

  const today = new Date().toISOString().split('T')[0]

  // Build language-alternate pairs
  const langAlternates = (pathEs: string, pathEn: string) => `
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}${pathEs}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${pathEn}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${pathEs}" />`

  const toolSlugs = tools.filter(t => t.slug).map(t => t.slug)

  const urls = [
    { loc: '/', alternates: true, pathEs: '/', pathEn: '/en', priority: '1.0', changefreq: 'weekly' },
    { loc: '/en', alternates: true, pathEs: '/', pathEn: '/en', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about', alternates: false, pathEs: '', pathEn: '', priority: '0.5', changefreq: 'monthly' },
    { loc: '/privacidad', alternates: false, pathEs: '', pathEn: '', priority: '0.3', changefreq: 'yearly' },
    { loc: '/terminos', alternates: false, pathEs: '', pathEn: '', priority: '0.3', changefreq: 'yearly' },
  ]

  // Categories
  for (const c of categories) {
    urls.push({ loc: `/herramientas/${c.slug}`, alternates: true, pathEs: `/herramientas/${c.slug}`, pathEn: `/en/tools/${c.slug}`, priority: '0.8', changefreq: 'weekly' })
    urls.push({ loc: `/en/tools/${c.slug}`, alternates: true, pathEs: `/herramientas/${c.slug}`, pathEn: `/en/tools/${c.slug}`, priority: '0.8', changefreq: 'weekly' })
  }

  // Alternatives
  for (const slug of toolSlugs) {
    urls.push({ loc: `/alternativas-a/${slug}`, alternates: true, pathEs: `/alternativas-a/${slug}`, pathEn: `/en/alternatives-to/${slug}`, priority: '0.9', changefreq: 'weekly' })
    urls.push({ loc: `/en/alternatives-to/${slug}`, alternates: true, pathEs: `/alternativas-a/${slug}`, pathEn: `/en/alternatives-to/${slug}`, priority: '0.9', changefreq: 'weekly' })
  }

  // Tool detail pages
  for (const slug of toolSlugs) {
    urls.push({ loc: `/herramienta/${slug}`, alternates: true, pathEs: `/herramienta/${slug}`, pathEn: `/en/tool/${slug}`, priority: '0.8', changefreq: 'weekly' })
    urls.push({ loc: `/en/tool/${slug}`, alternates: true, pathEs: `/herramienta/${slug}`, pathEn: `/en/tool/${slug}`, priority: '0.8', changefreq: 'weekly' })
  }

  // Comparisons
  for (const [a, b] of compPairs) {
    urls.push({ loc: `/comparar/${a}-vs-${b}`, alternates: false, pathEs: '', pathEn: '', priority: '0.7', changefreq: 'weekly' })
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.alternates ? langAlternates(u.pathEs, u.pathEn) : ''}
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
