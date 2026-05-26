import { getTools, getCategories } from '@/lib/data'

export async function GET() {
  const siteUrl = import.meta.env.SITE_URL || 'https://alt-dusky.vercel.app'
  const tools = await getTools()
  const categories = await getCategories()

  const compPairs = [
    ['notion', 'obsidian'], ['slack', 'discord'], ['figma', 'penpot'],
    ['trello', 'asana'], ['asana', 'clickup'], ['notion', 'clickup'],
    ['zapier', 'make'], ['zapier', 'n8n'], ['make', 'n8n'],
    ['mailchimp', 'brevo'], ['hubspot', 'pipedrive'], ['hubspot', 'zoho-crm'],
    ['semrush', 'ahrefs'], ['canva', 'figma'], ['google-analytics', 'plausible'],
    ['shopify', 'woocommerce'], ['slack', 'mattermost'],
  ]

  const today = new Date().toISOString().split('T')[0]

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { loc: '/en', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { loc: '/about', priority: '0.5', changefreq: 'monthly', lastmod: today },
    { loc: '/privacidad', priority: '0.3', changefreq: 'yearly', lastmod: today },
    { loc: '/terminos', priority: '0.3', changefreq: 'yearly', lastmod: today },
    ...categories.map(c => ({ loc: `/herramientas/${c.slug}`, priority: '0.8', changefreq: 'weekly', lastmod: today })),
    ...categories.map(c => ({ loc: `/en/tools/${c.slug}`, priority: '0.8', changefreq: 'weekly', lastmod: today })),
    ...tools.filter(t => t.slug).map(t => ({ loc: `/alternativas-a/${t.slug}`, priority: '0.9', changefreq: 'weekly', lastmod: today })),
    ...tools.filter(t => t.slug).map(t => ({ loc: `/en/alternatives-to/${t.slug}`, priority: '0.9', changefreq: 'weekly', lastmod: today })),
    ...tools.filter(t => t.slug).map(t => ({ loc: `/herramienta/${t.slug}`, priority: '0.8', changefreq: 'weekly', lastmod: today })),
    ...tools.filter(t => t.slug).map(t => ({ loc: `/en/tool/${t.slug}`, priority: '0.8', changefreq: 'weekly', lastmod: today })),
    ...compPairs.map(([a, b]) => ({ loc: `/comparar/${a}-vs-${b}`, priority: '0.7', changefreq: 'weekly', lastmod: today })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
