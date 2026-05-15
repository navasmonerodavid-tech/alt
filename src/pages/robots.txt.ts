export async function GET() {
  const siteUrl = import.meta.env.SITE_URL || 'https://alt-dusky.vercel.app'

  const txt = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(txt, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
