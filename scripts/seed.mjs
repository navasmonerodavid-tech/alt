/**
 * Seed script v2 — Puebla Supabase con UUIDs reales + Groq IA
 * Uso: node scripts/seed.mjs
 */

import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch { console.log('[seed] No .env found, using env vars') }
}

loadEnv()

// ============================================================
// DATOS (mismos que seed-data.ts)
// ============================================================

const categorySlugs = [
  ['gestion-proyectos', 'Gestión de Proyectos', 'Project Management', '📋', 'Herramientas para gestionar proyectos, tareas y equipos.', 'Tools for managing projects, tasks, and teams.'],
  ['diseno', 'Diseño', 'Design', '🎨', 'Software de diseño gráfico, UI/UX y prototipado.', 'Graphic design, UI/UX and prototyping software.'],
  ['comunicacion', 'Comunicación', 'Communication', '💬', 'Mensajería, videollamadas y colaboración en equipo.', 'Messaging, video calls and team collaboration.'],
  ['crm', 'CRM', 'CRM', '🤝', 'Gestión de relaciones con clientes y ventas.', 'Customer relationship management and sales.'],
  ['email-marketing', 'Email Marketing', 'Email Marketing', '📧', 'Plataformas de envío de correos, newsletters y automatización.', 'Email sending, newsletters and automation platforms.'],
  ['analitica', 'Analítica', 'Analytics', '📊', 'Herramientas de análisis de datos, dashboards y BI.', 'Data analysis, dashboards and BI tools.'],
  ['desarrollo', 'Desarrollo', 'Development', '💻', 'IDEs, hosting, control de versiones y herramientas dev.', 'IDEs, hosting, version control and dev tools.'],
  ['finanzas', 'Finanzas', 'Finance', '💰', 'Facturación, contabilidad y gestión financiera.', 'Invoicing, accounting and financial management.'],
  ['recursos-humanos', 'Recursos Humanos', 'HR', '👥', 'Gestión de empleados, nóminas y reclutamiento.', 'Employee management, payroll and recruiting.'],
  ['nocode', 'No-Code', 'No-Code', '🧩', 'Crear apps y webs sin programar.', 'Build apps and websites without coding.'],
  ['ciberseguridad', 'Ciberseguridad', 'Cybersecurity', '🔒', 'Protección de datos, contraseñas y seguridad online.', 'Data protection, passwords and online security.'],
  ['productividad', 'Productividad', 'Productivity', '⚡', 'Notas, docs, automatización y herramientas de trabajo.', 'Notes, docs, automation and work tools.'],
  ['ecommerce', 'E-commerce', 'E-commerce', '🛒', 'Tiendas online, pagos y logística.', 'Online stores, payments and logistics.'],
  ['atencion-cliente', 'Atención al Cliente', 'Customer Support', '🎧', 'Help desks, chatbots y soporte.', 'Help desks, chatbots and support.'],
  ['marketing', 'Marketing', 'Marketing', '📢', 'SEO, redes sociales, anuncios y automatización.', 'SEO, social media, ads and automation.'],
  ['ia', 'Inteligencia Artificial', 'Artificial Intelligence', '🤖', 'Herramientas con IA generativa, análisis y automatización.', 'Tools with generative AI, analysis and automation.'],
  ['gestion-contenido', 'Gestión de Contenido', 'Content Management', '📝', 'CMS, blogging y gestión de assets digitales.', 'CMS, blogging and digital asset management.'],
  ['video', 'Vídeo', 'Video', '🎬', 'Edición de vídeo, streaming y grabación.', 'Video editing, streaming and recording.'],
  ['bases-datos', 'Bases de Datos', 'Databases', '🗄️', 'BBDD SQL, NoSQL, serverless y backends.', 'SQL, NoSQL, serverless databases and backends.'],
  ['legal', 'Legal y Compliance', 'Legal & Compliance', '⚖️', 'Firmas electrónicas, contratos y cumplimiento normativo.', 'E-signatures, contracts and regulatory compliance.'],
]

const toolDefs = [
  { slug: 'notion', name: 'Notion', category: 'productividad', price_model: 'freemium', price: 10, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', desc_es: 'Espacio de trabajo todo en uno: notas, documentos, bases de datos y wikis.', desc_en: 'All-in-one workspace: notes, docs, databases and wikis.', rating_g2: 4.7, rating_cap: 4.7, tags: ['colaboracion', 'documentos', 'bases-datos', 'wiki'], url: 'https://notion.so', alts: ['obsidian', 'clickup', 'anytype', 'craft'] },
  { slug: 'slack', name: 'Slack', category: 'comunicacion', price_model: 'freemium', price: 7.25, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', desc_es: 'Plataforma de mensajería para equipos con canales, integraciones y videollamadas.', desc_en: 'Team messaging platform with channels, integrations and video calls.', rating_g2: 4.5, rating_cap: 4.7, tags: ['chat', 'equipos', 'integraciones'], url: 'https://slack.com', alts: ['discord', 'mattermost', 'rocket-chat'] },
  { slug: 'figma', name: 'Figma', category: 'diseno', price_model: 'freemium', price: 12, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg', desc_es: 'Herramienta de diseño UI/UX colaborativa en la nube con prototipado y design systems.', desc_en: 'Collaborative cloud-based UI/UX design tool with prototyping and design systems.', rating_g2: 4.7, rating_cap: 4.7, tags: ['ui', 'ux', 'prototipado', 'colaboracion'], url: 'https://figma.com', alts: ['penpot', 'sketch', 'lunacy'] },
  { slug: 'trello', name: 'Trello', category: 'gestion-proyectos', price_model: 'freemium', price: 5, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello-logo-blue.svg', desc_es: 'Gestión visual de proyectos con tableros Kanban, listas y tarjetas.', desc_en: 'Visual project management with Kanban boards, lists and cards.', rating_g2: 4.3, rating_cap: 4.5, tags: ['kanban', 'tareas', 'equipos'], url: 'https://trello.com', alts: ['asana', 'clickup', 'linear'] },
  { slug: 'asana', name: 'Asana', category: 'gestion-proyectos', price_model: 'freemium', price: 10.99, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Asana_logo.svg', desc_es: 'Gestión de proyectos y trabajo en equipo con listas, calendarios y timelines.', desc_en: 'Project management and teamwork with lists, calendars and timelines.', rating_g2: 4.4, rating_cap: 4.5, tags: ['proyectos', 'tareas', 'equipos', 'calendario'], url: 'https://asana.com', alts: ['clickup', 'trello', 'monday'] },
  { slug: 'clickup', name: 'ClickUp', category: 'gestion-proyectos', price_model: 'freemium', price: 7, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Clickup_logo.svg', desc_es: 'Plataforma todo-en-uno: proyectos, docs, chat, objetivos y automatización.', desc_en: 'All-in-one platform: projects, docs, chat, goals and automation.', rating_g2: 4.7, rating_cap: 4.6, tags: ['proyectos', 'documentos', 'automatizacion'], url: 'https://clickup.com', alts: ['asana', 'notion', 'monday'] },
  { slug: 'monday', name: 'Monday.com', category: 'gestion-proyectos', price_model: 'paid', price: 9, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Monday.com_Logo.svg', desc_es: 'Sistema operativo de trabajo visual para gestionar proyectos, procesos y flujos.', desc_en: 'Visual work operating system to manage projects, processes and workflows.', rating_g2: 4.7, rating_cap: 4.6, tags: ['proyectos', 'crm', 'equipos'], url: 'https://monday.com', alts: ['asana', 'clickup'] },
  { slug: 'hubspot', name: 'HubSpot CRM', category: 'crm', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/6/66/HubSpot_Logo.svg', desc_es: 'CRM gratuito con gestión de contactos, pipeline de ventas y marketing integrado.', desc_en: 'Free CRM with contact management, sales pipeline and integrated marketing.', rating_g2: 4.4, rating_cap: 4.5, tags: ['crm', 'ventas', 'marketing', 'gratis'], url: 'https://hubspot.com', alts: ['pipedrive', 'zoho-crm', 'holded'] },
  { slug: 'pipedrive', name: 'Pipedrive', category: 'crm', price_model: 'paid', price: 14, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pipedrive_logo.svg', desc_es: 'CRM enfocado en pipeline de ventas con automatizaciones, informes y email integrado.', desc_en: 'CRM focused on sales pipeline with automations, reports and integrated email.', rating_g2: 4.2, rating_cap: 4.6, tags: ['crm', 'ventas', 'pipeline'], url: 'https://pipedrive.com', alts: ['hubspot', 'zoho-crm'] },
  { slug: 'semrush', name: 'Semrush', category: 'marketing', price_model: 'paid', price: 129.95, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Semrush_logo.svg', desc_es: 'Suite SEO completa: keywords, auditorías, backlinks, competencia y contenido.', desc_en: 'Complete SEO suite: keywords, audits, backlinks, competition and content.', rating_g2: 4.5, rating_cap: 4.6, tags: ['seo', 'marketing', 'analitica'], url: 'https://semrush.com', alts: ['ahrefs', 'mangools'] },
  { slug: 'ahrefs', name: 'Ahrefs', category: 'marketing', price_model: 'paid', price: 99, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Ahrefs_logo.svg', desc_es: 'Herramienta SEO líder en análisis de backlinks, keywords y auditorías de sitio.', desc_en: 'Leading SEO tool for backlink analysis, keywords and site audits.', rating_g2: 4.5, rating_cap: 4.7, tags: ['seo', 'backlinks', 'marketing'], url: 'https://ahrefs.com', alts: ['semrush', 'mangools'] },
  { slug: 'canva', name: 'Canva', category: 'diseno', price_model: 'freemium', price: 12.99, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg', desc_es: 'Diseño gráfico fácil para todos: presentaciones, redes sociales, vídeos y docs.', desc_en: 'Easy graphic design for everyone: presentations, social media, videos and docs.', rating_g2: 4.7, rating_cap: 4.7, tags: ['diseno', 'redes-sociales', 'facil'], url: 'https://canva.com', alts: ['figma', 'adobe-express'] },
  { slug: 'obsidian', name: 'Obsidian', category: 'productividad', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg', desc_es: 'Aplicación de notas con enlaces bidireccionales, grafos y plugins. Basada en Markdown local.', desc_en: 'Note-taking app with backlinks, graphs and plugins. Based on local Markdown files.', rating_g2: 4.7, rating_cap: 4.8, tags: ['notas', 'markdown', 'local', 'gratis'], url: 'https://obsidian.md', alts: ['notion', 'anytype', 'logseq'] },
  { slug: 'anytype', name: 'Anytype', category: 'productividad', price_model: 'free', price: 0, open_source: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Anytype_logo.svg', desc_es: 'Alternativa open source a Notion, descentralizada, privada y offline-first.', desc_en: 'Open source Notion alternative, decentralized, private and offline-first.', rating_g2: 4.3, rating_cap: 4.4, tags: ['open-source', 'notas', 'privacidad', 'gratis'], url: 'https://anytype.io', alts: ['notion', 'obsidian', 'appflowy'] },
  { slug: 'linear', name: 'Linear', category: 'gestion-proyectos', price_model: 'freemium', price: 8, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Linear_Logo.svg', desc_es: 'Gestión de proyectos ultrarrápida para equipos de software. Issues, sprints y roadmaps.', desc_en: 'Lightning-fast project management for software teams. Issues, sprints and roadmaps.', rating_g2: 4.7, rating_cap: 4.6, tags: ['desarrollo', 'sprints', 'issues'], url: 'https://linear.app', alts: ['jira', 'asana'] },
  { slug: 'jira', name: 'Jira', category: 'gestion-proyectos', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Jira_Logo.svg', desc_es: 'Gestión de proyectos ágiles de Atlassian. Scrum, Kanban y seguimiento de bugs.', desc_en: 'Agile project management by Atlassian. Scrum, Kanban and bug tracking.', rating_g2: 4.2, rating_cap: 4.4, tags: ['agil', 'scrum', 'bugs', 'desarrollo'], url: 'https://atlassian.com/software/jira', alts: ['linear', 'clickup'] },
  { slug: 'discord', name: 'Discord', category: 'comunicacion', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Discord_logo.svg', desc_es: 'Plataforma de chat por voz, texto y vídeo con servidores, canales y comunidades.', desc_en: 'Voice, text and video chat platform with servers, channels and communities.', rating_g2: 4.5, rating_cap: 4.5, tags: ['chat', 'voz', 'comunidades', 'gratis'], url: 'https://discord.com', alts: ['slack', 'mattermost'] },
  { slug: 'mattermost', name: 'Mattermost', category: 'comunicacion', price_model: 'free', price: 0, open_source: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Mattermost_logo_horizontal.svg', desc_es: 'Alternativa open source a Slack. Auto-hospedada, privada y personalizable.', desc_en: 'Open source Slack alternative. Self-hosted, private and customizable.', rating_g2: 4.3, rating_cap: 4.5, tags: ['open-source', 'self-hosted', 'chat', 'privacidad'], url: 'https://mattermost.com', alts: ['slack', 'rocket-chat'] },
  { slug: 'penpot', name: 'Penpot', category: 'diseno', price_model: 'free', price: 0, open_source: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Penpot_logo.svg', desc_es: 'Alternativa open source a Figma. Diseño y prototipado UI/UX en navegador.', desc_en: 'Open source Figma alternative. UI/UX design and prototyping in browser.', rating_g2: 4.4, rating_cap: 4.4, tags: ['open-source', 'diseno', 'ui', 'gratis'], url: 'https://penpot.app', alts: ['figma', 'lunacy'] },
  { slug: 'mailchimp', name: 'Mailchimp', category: 'email-marketing', price_model: 'freemium', price: 13, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Mailchimp_Logo.svg', desc_es: 'Plataforma de email marketing y automatización. Newsletters, formularios y analytics.', desc_en: 'Email marketing and automation platform. Newsletters, forms and analytics.', rating_g2: 4.3, rating_cap: 4.5, tags: ['email', 'newsletter', 'automatizacion'], url: 'https://mailchimp.com', alts: ['brevo', 'mailer-lite'] },
  { slug: 'brevo', name: 'Brevo', category: 'email-marketing', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Brevo_Logo.svg', desc_es: 'Antes Sendinblue. Email marketing, SMS, chat y CRM en una plataforma económica.', desc_en: 'Formerly Sendinblue. Email marketing, SMS, chat and CRM in an affordable platform.', rating_g2: 4.5, rating_cap: 4.5, tags: ['email', 'sms', 'crm', 'gratis'], url: 'https://brevo.com', alts: ['mailchimp', 'mailer-lite'] },
  { slug: 'zapier', name: 'Zapier', category: 'nocode', price_model: 'freemium', price: 19.99, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Zapier_logo.svg', desc_es: 'Automatización entre 5.000+ apps sin código. Conecta tus herramientas SaaS fácilmente.', desc_en: 'Automation between 5,000+ apps without code. Connect your SaaS tools easily.', rating_g2: 4.5, rating_cap: 4.7, tags: ['automatizacion', 'nocode', 'integraciones'], url: 'https://zapier.com', alts: ['make', 'n8n', 'ifttt'] },
  { slug: 'make', name: 'Make', category: 'nocode', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Make_logo.svg', desc_es: 'Antes Integromat. Automatización visual con escenarios, más potente y flexible que Zapier.', desc_en: 'Formerly Integromat. Visual automation with scenarios, more powerful and flexible than Zapier.', rating_g2: 4.7, rating_cap: 4.7, tags: ['automatizacion', 'nocode', 'visual'], url: 'https://make.com', alts: ['zapier', 'n8n'] },
  { slug: 'n8n', name: 'n8n', category: 'nocode', price_model: 'free', price: 0, open_source: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/N8n_logo.svg', desc_es: 'Automatización open source y auto-hospedada con editor visual.', desc_en: 'Open source self-hosted automation with visual editor.', rating_g2: 4.6, rating_cap: 4.7, tags: ['open-source', 'automatizacion', 'self-hosted'], url: 'https://n8n.io', alts: ['zapier', 'make'] },
  { slug: 'google-analytics', name: 'Google Analytics', category: 'analitica', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Analytics_Logo.svg', desc_es: 'Analítica web gratuita de Google. Tráfico, conversiones, audiencia y comportamiento.', desc_en: 'Free web analytics by Google. Traffic, conversions, audience and behavior.', rating_g2: 4.5, rating_cap: 4.7, tags: ['analitica', 'web', 'gratis'], url: 'https://analytics.google.com', alts: ['plausible', 'matomo'] },
  { slug: 'plausible', name: 'Plausible Analytics', category: 'analitica', price_model: 'paid', price: 9, open_source: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Plausible_logo.svg', desc_es: 'Analítica web simple, privada y ligera. Open source, sin cookies, cumple GDPR.', desc_en: 'Simple, private and lightweight web analytics. Open source, cookieless, GDPR compliant.', rating_g2: 4.6, rating_cap: 4.8, tags: ['analitica', 'privacidad', 'open-source'], url: 'https://plausible.io', alts: ['google-analytics', 'matomo'] },
  { slug: 'shopify', name: 'Shopify', category: 'ecommerce', price_model: 'paid', price: 25, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg', desc_es: 'La plataforma de e-commerce más popular. Crea tu tienda online sin código.', desc_en: 'The most popular e-commerce platform. Create your online store without code.', rating_g2: 4.4, rating_cap: 4.5, tags: ['ecommerce', 'tienda-online', 'nocode'], url: 'https://shopify.com', alts: ['woocommerce', 'prestashop'] },
  { slug: 'woocommerce', name: 'WooCommerce', category: 'ecommerce', price_model: 'free', price: 0, open_source: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/WooCommerce_logo.svg', desc_es: 'Plugin de e-commerce open source para WordPress. Flexible y sin comisiones.', desc_en: 'Open source e-commerce plugin for WordPress. Flexible and commission-free.', rating_g2: 4.4, rating_cap: 4.5, tags: ['ecommerce', 'open-source', 'wordpress', 'gratis'], url: 'https://woocommerce.com', alts: ['shopify', 'prestashop'] },
  { slug: 'zoho-crm', name: 'Zoho CRM', category: 'crm', price_model: 'free', price: 0, open_source: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Zoho_logo_2023.svg', desc_es: 'CRM completo y económico con IA, automatización y suite de aplicaciones integradas.', desc_en: 'Complete and affordable CRM with AI, automation and integrated suite of apps.', rating_g2: 4.1, rating_cap: 4.3, tags: ['crm', 'ventas', 'gratis'], url: 'https://zoho.com/crm', alts: ['hubspot', 'pipedrive', 'holded'] },
  { slug: 'holded', name: 'Holded', category: 'finanzas', price_model: 'paid', price: 15, open_source: false, logo: null, desc_es: 'ERP español para pymes: facturación, contabilidad, CRM, inventario y proyectos.', desc_en: 'Spanish ERP for SMBs: invoicing, accounting, CRM, inventory and projects.', rating_g2: 4.3, rating_cap: 4.4, tags: ['erp', 'espanol', 'pymes', 'facturacion'], url: 'https://holded.com', alts: ['quipu', 'factura-directa', 'anfix'] },
]

// ============================================================
// GROQ CLIENT (con rate limit handling)
// ============================================================

const groqApiKey = process.env.GROQ_API_KEY
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null
const MODEL = 'llama-3.3-70b-versatile'

async function groqRequest(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      if (err.message?.includes('rate_limit') || err.status === 429) {
        const wait = (i + 1) * 3000
        console.log(`    ⏳ Rate limit, esperando ${wait/1000}s...`)
        await new Promise(r => setTimeout(r, wait))
        continue
      }
      throw err
    }
  }
  return null
}

async function generateContent(toolName, catEs, catEn, priceModel, isOpenSource) {
  if (!groq) return { intro_es: null, intro_en: null, faq_es: [], faq_en: [] }

  const system = (lang) => `Eres un asistente que SOLO escribe contenido para paginas de comparacion de herramientas SaaS. Solo produces JSON valido. Idioma: ${lang === 'en' ? 'ingles' : 'espanol'}. Maximo 180 palabras para intros, 80 para FAQs. No inventas precios ni haces recomendaciones directas.`

  const introPrompts = [
    { lang: 'es', cat: catEs },
    { lang: 'en', cat: catEn },
  ]

  const results = { intro_es: null, intro_en: null, faq_es: [], faq_en: [] }

  for (const { lang, cat } of introPrompts) {
    const intro = await groqRequest(async () => {
      const r = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: system(lang) },
          { role: 'user', content: `Genera una introduccion para alternativas a ${toolName} (categoria: ${cat}, precio: ${priceModel}, open source: ${isOpenSource ? 'si' : 'no'}). Formato JSON: {"intro": "..."}.` },
        ],
        temperature: 0.3, max_tokens: 500, response_format: { type: 'json_object' },
      })
      const raw = r.choices[0]?.message?.content
      if (!raw) return null
      const p = JSON.parse(raw)
      const t = p.intro
      if (!t || typeof t !== 'string' || t.length < 50 || t.length > 1500) return null
      if (t.includes('$') || t.includes('€')) return null
      return t.trim()
    })
    if (lang === 'es') results.intro_es = intro
    else results.intro_en = intro
  }

  for (const { lang, cat } of introPrompts) {
    const faqs = await groqRequest(async () => {
      const r = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: system(lang) },
          { role: 'user', content: `Genera 4 FAQs en ${lang === 'en' ? 'ingles' : 'espanol'} sobre alternativas a ${toolName}. Formato JSON: {"faq": [{"question": "...", "answer": "..."}]}.` },
        ],
        temperature: 0.3, max_tokens: 600, response_format: { type: 'json_object' },
      })
      const raw = r.choices[0]?.message?.content
      if (!raw) return null
      const p = JSON.parse(raw)
      if (!Array.isArray(p.faq) || p.faq.length < 2 || p.faq.length > 6) return null
      return p.faq.filter(f => f.question && f.answer && f.question.length >= 10 && f.answer.length >= 20)
    })
    if (lang === 'es') results.faq_es = faqs || []
    else results.faq_en = faqs || []
  }

  return results
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('[seed] ERROR: SUPABASE_URL y SUPABASE_ANON_KEY son necesarios.')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const catMap = new Map() // slug → { id, name_es, name_en, ... }
  const toolMap = new Map() // slug → uuid

  console.log('[seed] Generando UUIDs...\n')

  // 1. Insertar categorias con UUIDs reales
  console.log('[seed] 1/3 Insertando categorias...')
  for (const [slug, name_es, name_en, icon, desc_es, desc_en] of categorySlugs) {
    const id = randomUUID()
    catMap.set(slug, { id, name_es, name_en })
    const { error } = await supabase.from('categories').upsert({
      id, slug, name_es, name_en, icon, description_es: desc_es, description_en: desc_en,
    }, { onConflict: 'slug' })
    console.log(error ? `  ⚠ ${slug}: ${error.message}` : `  ✅ ${slug}`)
  }

  // 2. Insertar herramientas con UUIDs reales
  console.log('\n[seed] 2/3 Insertando herramientas...')
  for (const t of toolDefs) {
    const toolId = randomUUID()
    const catId = catMap.get(t.category)?.id
    toolMap.set(t.slug, toolId)

    if (!catId) {
      console.log(`  ⚠ ${t.slug}: categoria ${t.category} no encontrada`)
      continue
    }

    const { error } = await supabase.from('tools').upsert({
      id: toolId,
      slug: t.slug,
      name: t.name,
      logo_url: t.logo,
      description_es: t.desc_es,
      description_en: t.desc_en,
      category_id: catId,
      price_model: t.price_model,
      price_starting: t.price,
      website_url: t.url,
      rating_g2: t.rating_g2,
      rating_capterra: t.rating_cap,
      is_open_source: t.open_source,
      is_verified: false,
      listing_tier: 'free',
      tags: t.tags,
    }, { onConflict: 'slug' })

    console.log(error ? `  ⚠ ${t.slug}: ${error.message}` : `  ✅ ${t.slug}`)

    // Relaciones
    for (const altSlug of t.alts) {
      const altId = toolMap.get(altSlug)
      if (!altId) continue
      const { error: relErr } = await supabase.from('tool_alternatives').upsert({
        tool_id: toolId,
        alternative_id: altId,
        rank: t.alts.indexOf(altSlug) + 1,
      }, { onConflict: 'tool_id,alternative_id' })
      if (relErr) console.log(`    ⚠ relation ${t.slug}→${altSlug}: ${relErr.message}`)
    }
  }

  // 3. Groq IA (con rate limit handling)
  console.log('\n[seed] 3/3 Generando contenido IA con Groq...')
  if (!groq) {
    console.log('  ⚠ Groq no configurado. Saltando.')
  } else {
    let ok = 0
    for (const t of toolDefs) {
      const catData = catMap.get(t.category)
      if (!catData) continue

      console.log(`  ${t.name}...`)
      await new Promise(r => setTimeout(r, 1500)) // pausa entre herramientas

      const content = await generateContent(t.name, catData.name_es, catData.name_en, t.price_model, t.open_source)
      const toolId = toolMap.get(t.slug)
      if (!toolId) continue

      const { error } = await supabase.from('generated_content').upsert({
        tool_id: toolId,
        intro_es: content.intro_es,
        intro_en: content.intro_en,
        faq_es: content.faq_es,
        faq_en: content.faq_en,
        last_generated_at: new Date().toISOString(),
      }, { onConflict: 'tool_id' })

      if (error) {
        console.log(`    ⚠ ${error.message}`)
      } else {
        ok++
        console.log(`    ✅ (${ok}/${toolDefs.length})`)
      }
    }
    console.log(`  ✅ ${ok}/${toolDefs.length} contenidos generados`)
  }

  // Verificar
  const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true })
  const { count: toolCount } = await supabase.from('tools').select('*', { count: 'exact', head: true })
  console.log(`\n✅ Seed completo! Categorias: ${catCount}, Herramientas: ${toolCount}`)
}

main().catch(err => { console.error('\n❌', err); process.exit(1) })
