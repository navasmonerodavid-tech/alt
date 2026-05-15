import { getTools, getCategories } from '@/lib/data'

export async function GET() {
  const siteUrl = import.meta.env.SITE_URL || 'https://alt-dusky.vercel.app'
  const tools = await getTools()
  const categories = await getCategories()

  const urls = [
    // Home
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/en', priority: '1.0', changefreq: 'weekly' },

    // Categories
    ...categories.map(c => ({ loc: `/herramientas/${c.slug}`, priority: '0.8', changefreq: 'weekly' })),
    ...categories.map(c => ({ loc: `/en/tools/${c.slug}`, priority: '0.8', changefreq: 'weekly' })),

    // Tool alternative pages (highest priority)
    ...tools.filter(t => t.slug).map(t => ({ loc: `/alternativas-a/${t.slug}`, priority: '0.9', changefreq: 'weekly' })),
    ...tools.filter(t => t.slug).map(t => ({ loc: `/en/alternatives-to/${t.slug}`, priority: '0.9', changefreq: 'weekly' })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
