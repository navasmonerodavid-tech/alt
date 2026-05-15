/**
 * Seed script — Puebla Supabase con datos iniciales + contenido IA
 *
 * Uso: node scripts/seed.mjs
 * Requiere variables de entorno en .env o en el sistema.
 */

import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Leer .env manualmente (simplificado)
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
  } catch {
    console.log('[seed] No .env found, using system env vars')
  }
}

loadEnv()

// ============================================================
// DATOS (igual que seed-data.ts pero inline para evitar imports TS)
// ============================================================

const categories = [
  { id: 'cat-1', slug: 'gestion-proyectos', name_es: 'Gestión de Proyectos', name_en: 'Project Management', icon: '📋', description_es: 'Herramientas para gestionar proyectos, tareas y equipos.', description_en: 'Tools for managing projects, tasks, and teams.' },
  { id: 'cat-2', slug: 'diseno', name_es: 'Diseño', name_en: 'Design', icon: '🎨', description_es: 'Software de diseño gráfico, UI/UX y prototipado.', description_en: 'Graphic design, UI/UX and prototyping software.' },
  { id: 'cat-3', slug: 'comunicacion', name_es: 'Comunicación', name_en: 'Communication', icon: '💬', description_es: 'Mensajería, videollamadas y colaboración en equipo.', description_en: 'Messaging, video calls and team collaboration.' },
  { id: 'cat-4', slug: 'crm', name_es: 'CRM', name_en: 'CRM', icon: '🤝', description_es: 'Gestión de relaciones con clientes y ventas.', description_en: 'Customer relationship management and sales.' },
  { id: 'cat-5', slug: 'email-marketing', name_es: 'Email Marketing', name_en: 'Email Marketing', icon: '📧', description_es: 'Plataformas de envío de correos, newsletters y automatización.', description_en: 'Email sending, newsletters and automation platforms.' },
  { id: 'cat-6', slug: 'analitica', name_es: 'Analítica', name_en: 'Analytics', icon: '📊', description_es: 'Herramientas de análisis de datos, dashboards y BI.', description_en: 'Data analysis, dashboards and BI tools.' },
  { id: 'cat-7', slug: 'desarrollo', name_es: 'Desarrollo', name_en: 'Development', icon: '💻', description_es: 'IDEs, hosting, control de versiones y herramientas dev.', description_en: 'IDEs, hosting, version control and dev tools.' },
  { id: 'cat-8', slug: 'finanzas', name_es: 'Finanzas', name_en: 'Finance', icon: '💰', description_es: 'Facturación, contabilidad y gestión financiera.', description_en: 'Invoicing, accounting and financial management.' },
  { id: 'cat-9', slug: 'recursos-humanos', name_es: 'Recursos Humanos', name_en: 'HR', icon: '👥', description_es: 'Gestión de empleados, nóminas y reclutamiento.', description_en: 'Employee management, payroll and recruiting.' },
  { id: 'cat-10', slug: 'nocode', name_es: 'No-Code', name_en: 'No-Code', icon: '🧩', description_es: 'Crear apps y webs sin programar.', description_en: 'Build apps and websites without coding.' },
  { id: 'cat-11', slug: 'ciberseguridad', name_es: 'Ciberseguridad', name_en: 'Cybersecurity', icon: '🔒', description_es: 'Protección de datos, contraseñas y seguridad online.', description_en: 'Data protection, passwords and online security.' },
  { id: 'cat-12', slug: 'productividad', name_es: 'Productividad', name_en: 'Productivity', icon: '⚡', description_es: 'Notas, docs, automatización y herramientas de trabajo.', description_en: 'Notes, docs, automation and work tools.' },
  { id: 'cat-13', slug: 'ecommerce', name_es: 'E-commerce', name_en: 'E-commerce', icon: '🛒', description_es: 'Tiendas online, pagos y logística.', description_en: 'Online stores, payments and logistics.' },
  { id: 'cat-14', slug: 'atencion-cliente', name_es: 'Atención al Cliente', name_en: 'Customer Support', icon: '🎧', description_es: 'Help desks, chatbots y soporte.', description_en: 'Help desks, chatbots and support.' },
  { id: 'cat-15', slug: 'marketing', name_es: 'Marketing', name_en: 'Marketing', icon: '📢', description_es: 'SEO, redes sociales, anuncios y automatización.', description_en: 'SEO, social media, ads and automation.' },
  { id: 'cat-16', slug: 'ia', name_es: 'Inteligencia Artificial', name_en: 'Artificial Intelligence', icon: '🤖', description_es: 'Herramientas con IA generativa, análisis y automatización.', description_en: 'Tools with generative AI, analysis and automation.' },
  { id: 'cat-17', slug: 'gestion-contenido', name_es: 'Gestión de Contenido', name_en: 'Content Management', icon: '📝', description_es: 'CMS, blogging y gestión de assets digitales.', description_en: 'CMS, blogging and digital asset management.' },
  { id: 'cat-18', slug: 'video', name_es: 'Vídeo', name_en: 'Video', icon: '🎬', description_es: 'Edición de vídeo, streaming y grabación.', description_en: 'Video editing, streaming and recording.' },
  { id: 'cat-19', slug: 'bases-datos', name_es: 'Bases de Datos', name_en: 'Databases', icon: '🗄️', description_es: 'BBDD SQL, NoSQL, serverless y backends.', description_en: 'SQL, NoSQL, serverless databases and backends.' },
  { id: 'cat-20', slug: 'legal', name_es: 'Legal y Compliance', name_en: 'Legal & Compliance', icon: '⚖️', description_es: 'Firmas electrónicas, contratos y cumplimiento normativo.', description_en: 'E-signatures, contracts and regulatory compliance.' },
]

const tools = [
  { id: 'tool-1', slug: 'notion', name: 'Notion', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', description_es: 'Espacio de trabajo todo en uno: notas, documentos, bases de datos y wikis.', description_en: 'All-in-one workspace: notes, docs, databases and wikis.', category_id: 'cat-12', price_model: 'freemium', price_starting: 10, website_url: 'https://notion.so', rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, tags: ['colaboracion', 'documentos', 'bases-datos', 'wiki'], alternatives: ['obsidian', 'clickup', 'anytype', 'craft', 'nimbus-note'] },
  { id: 'tool-2', slug: 'slack', name: 'Slack', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', description_es: 'Plataforma de mensajería para equipos con canales, integraciones y videollamadas.', description_en: 'Team messaging platform with channels, integrations and video calls.', category_id: 'cat-3', price_model: 'freemium', price_starting: 7.25, website_url: 'https://slack.com', rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, tags: ['chat', 'equipos', 'integraciones'], alternatives: ['discord', 'google-chat', 'mattermost', 'rocket-chat', 'zulip'] },
  { id: 'tool-3', slug: 'figma', name: 'Figma', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg', description_es: 'Herramienta de diseño UI/UX colaborativa en la nube con prototipado y design systems.', description_en: 'Collaborative cloud-based UI/UX design tool with prototyping and design systems.', category_id: 'cat-2', price_model: 'freemium', price_starting: 12, website_url: 'https://figma.com', rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, tags: ['ui', 'ux', 'prototipado', 'colaboracion'], alternatives: ['penpot', 'sketch', 'adobe-xd', 'lunacy', 'framer'] },
  { id: 'tool-4', slug: 'trello', name: 'Trello', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello-logo-blue.svg', description_es: 'Gestión visual de proyectos con tableros Kanban, listas y tarjetas.', description_en: 'Visual project management with Kanban boards, lists and cards.', category_id: 'cat-1', price_model: 'freemium', price_starting: 5, website_url: 'https://trello.com', rating_g2: 4.3, rating_capterra: 4.5, is_open_source: false, tags: ['kanban', 'tareas', 'equipos'], alternatives: ['asana', 'clickup', 'linear', 'taiga', 'planka'] },
  { id: 'tool-5', slug: 'asana', name: 'Asana', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Asana_logo.svg', description_es: 'Gestión de proyectos y trabajo en equipo con listas, calendarios y timelines.', description_en: 'Project management and teamwork with lists, calendars and timelines.', category_id: 'cat-1', price_model: 'freemium', price_starting: 10.99, website_url: 'https://asana.com', rating_g2: 4.4, rating_capterra: 4.5, is_open_source: false, tags: ['proyectos', 'tareas', 'equipos', 'calendario'], alternatives: ['clickup', 'trello', 'monday', 'linear'] },
  { id: 'tool-6', slug: 'clickup', name: 'ClickUp', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Clickup_logo.svg', description_es: 'Plataforma todo-en-uno: proyectos, docs, chat, objetivos y automatización.', description_en: 'All-in-one platform: projects, docs, chat, goals and automation.', category_id: 'cat-1', price_model: 'freemium', price_starting: 7, website_url: 'https://clickup.com', rating_g2: 4.7, rating_capterra: 4.6, is_open_source: false, tags: ['proyectos', 'documentos', 'automatizacion'], alternatives: ['asana', 'notion', 'monday'] },
  { id: 'tool-7', slug: 'monday', name: 'Monday.com', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Monday.com_Logo.svg', description_es: 'Sistema operativo de trabajo visual para gestionar proyectos, procesos y flujos.', description_en: 'Visual work operating system to manage projects, processes and workflows.', category_id: 'cat-1', price_model: 'paid', price_starting: 9, website_url: 'https://monday.com', rating_g2: 4.7, rating_capterra: 4.6, is_open_source: false, tags: ['proyectos', 'crm', 'equipos'], alternatives: ['asana', 'clickup', 'smartsheet'] },
  { id: 'tool-8', slug: 'hubspot', name: 'HubSpot CRM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/HubSpot_Logo.svg', description_es: 'CRM gratuito con gestión de contactos, pipeline de ventas y marketing integrado.', description_en: 'Free CRM with contact management, sales pipeline and integrated marketing.', category_id: 'cat-4', price_model: 'free', price_starting: 0, website_url: 'https://hubspot.com', rating_g2: 4.4, rating_capterra: 4.5, is_open_source: false, tags: ['crm', 'ventas', 'marketing', 'gratis'], alternatives: ['pipedrive', 'zoho-crm', 'holded'] },
  { id: 'tool-9', slug: 'pipedrive', name: 'Pipedrive', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pipedrive_logo.svg', description_es: 'CRM enfocado en pipeline de ventas con automatizaciones, informes y email integrado.', description_en: 'CRM focused on sales pipeline with automations, reports and integrated email.', category_id: 'cat-4', price_model: 'paid', price_starting: 14, website_url: 'https://pipedrive.com', rating_g2: 4.2, rating_capterra: 4.6, is_open_source: false, tags: ['crm', 'ventas', 'pipeline'], alternatives: ['hubspot', 'zoho-crm', 'salesflare'] },
  { id: 'tool-10', slug: 'semrush', name: 'Semrush', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Semrush_logo.svg', description_es: 'Suite SEO completa: keywords, auditorías, backlinks, competencia y contenido.', description_en: 'Complete SEO suite: keywords, audits, backlinks, competition and content.', category_id: 'cat-15', price_model: 'paid', price_starting: 129.95, website_url: 'https://semrush.com', rating_g2: 4.5, rating_capterra: 4.6, is_open_source: false, tags: ['seo', 'marketing', 'analitica'], alternatives: ['ahrefs', 'mangools', 'serpstat'] },
  { id: 'tool-11', slug: 'ahrefs', name: 'Ahrefs', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Ahrefs_logo.svg', description_es: 'Herramienta SEO líder en análisis de backlinks, keywords y auditorías de sitio.', description_en: 'Leading SEO tool for backlink analysis, keywords and site audits.', category_id: 'cat-15', price_model: 'paid', price_starting: 99, website_url: 'https://ahrefs.com', rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, tags: ['seo', 'backlinks', 'marketing'], alternatives: ['semrush', 'mangools'] },
  { id: 'tool-12', slug: 'canva', name: 'Canva', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg', description_es: 'Diseño gráfico fácil para todos: presentaciones, redes sociales, vídeos y docs.', description_en: 'Easy graphic design for everyone: presentations, social media, videos and docs.', category_id: 'cat-2', price_model: 'freemium', price_starting: 12.99, website_url: 'https://canva.com', rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, tags: ['diseno', 'redes-sociales', 'facil'], alternatives: ['figma', 'adobe-express', 'vista-create'] },
  { id: 'tool-13', slug: 'obsidian', name: 'Obsidian', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg', description_es: 'Aplicación de notas con enlaces bidireccionales, grafos y plugins. Basada en Markdown local.', description_en: 'Note-taking app with backlinks, graphs and plugins. Based on local Markdown files.', category_id: 'cat-12', price_model: 'free', price_starting: 0, website_url: 'https://obsidian.md', rating_g2: 4.7, rating_capterra: 4.8, is_open_source: false, tags: ['notas', 'markdown', 'local', 'gratis'], alternatives: ['notion', 'anytype', 'logseq'] },
  { id: 'tool-14', slug: 'anytype', name: 'Anytype', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Anytype_logo.svg', description_es: 'Alternativa open source a Notion, descentralizada, privada y offline-first.', description_en: 'Open source Notion alternative, decentralized, private and offline-first.', category_id: 'cat-12', price_model: 'free', price_starting: 0, website_url: 'https://anytype.io', rating_g2: 4.3, rating_capterra: 4.4, is_open_source: true, tags: ['open-source', 'notas', 'privacidad', 'gratis'], alternatives: ['notion', 'obsidian', 'appflowy'] },
  { id: 'tool-15', slug: 'linear', name: 'Linear', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Linear_Logo.svg', description_es: 'Gestión de proyectos ultrarrápida para equipos de software. Issues, sprints y roadmaps.', description_en: 'Lightning-fast project management for software teams. Issues, sprints and roadmaps.', category_id: 'cat-1', price_model: 'freemium', price_starting: 8, website_url: 'https://linear.app', rating_g2: 4.7, rating_capterra: 4.6, is_open_source: false, tags: ['desarrollo', 'sprints', 'issues'], alternatives: ['jira', 'asana', 'shortcut'] },
  { id: 'tool-16', slug: 'jira', name: 'Jira', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Jira_Logo.svg', description_es: 'Gestión de proyectos ágiles de Atlassian. Scrum, Kanban y seguimiento de bugs.', description_en: 'Agile project management by Atlassian. Scrum, Kanban and bug tracking.', category_id: 'cat-1', price_model: 'free', price_starting: 0, website_url: 'https://atlassian.com/software/jira', rating_g2: 4.2, rating_capterra: 4.4, is_open_source: false, tags: ['agil', 'scrum', 'bugs', 'desarrollo'], alternatives: ['linear', 'clickup', 'shortcut'] },
  { id: 'tool-17', slug: 'discord', name: 'Discord', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Discord_logo.svg', description_es: 'Plataforma de chat por voz, texto y vídeo con servidores, canales y comunidades.', description_en: 'Voice, text and video chat platform with servers, channels and communities.', category_id: 'cat-3', price_model: 'free', price_starting: 0, website_url: 'https://discord.com', rating_g2: 4.5, rating_capterra: 4.5, is_open_source: false, tags: ['chat', 'voz', 'comunidades', 'gratis'], alternatives: ['slack', 'mattermost'] },
  { id: 'tool-18', slug: 'mattermost', name: 'Mattermost', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Mattermost_logo_horizontal.svg', description_es: 'Alternativa open source a Slack. Auto-hospedada, privada y personalizable.', description_en: 'Open source Slack alternative. Self-hosted, private and customizable.', category_id: 'cat-3', price_model: 'free', price_starting: 0, website_url: 'https://mattermost.com', rating_g2: 4.3, rating_capterra: 4.5, is_open_source: true, tags: ['open-source', 'self-hosted', 'chat', 'privacidad'], alternatives: ['slack', 'rocket-chat'] },
  { id: 'tool-19', slug: 'penpot', name: 'Penpot', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Penpot_logo.svg', description_es: 'Alternativa open source a Figma. Diseño y prototipado UI/UX en navegador.', description_en: 'Open source Figma alternative. UI/UX design and prototyping in browser.', category_id: 'cat-2', price_model: 'free', price_starting: 0, website_url: 'https://penpot.app', rating_g2: 4.4, rating_capterra: 4.4, is_open_source: true, tags: ['open-source', 'diseno', 'ui', 'gratis'], alternatives: ['figma', 'lunacy'] },
  { id: 'tool-20', slug: 'mailchimp', name: 'Mailchimp', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Mailchimp_Logo.svg', description_es: 'Plataforma de email marketing y automatización. Newsletters, formularios y analytics.', description_en: 'Email marketing and automation platform. Newsletters, forms and analytics.', category_id: 'cat-5', price_model: 'freemium', price_starting: 13, website_url: 'https://mailchimp.com', rating_g2: 4.3, rating_capterra: 4.5, is_open_source: false, tags: ['email', 'newsletter', 'automatizacion'], alternatives: ['brevo', 'mailer-lite', 'active-campaign'] },
  { id: 'tool-21', slug: 'brevo', name: 'Brevo', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Brevo_Logo.svg', description_es: 'Antes Sendinblue. Email marketing, SMS, chat y CRM en una plataforma económica.', description_en: 'Formerly Sendinblue. Email marketing, SMS, chat and CRM in an affordable platform.', category_id: 'cat-5', price_model: 'free', price_starting: 0, website_url: 'https://brevo.com', rating_g2: 4.5, rating_capterra: 4.5, is_open_source: false, tags: ['email', 'sms', 'crm', 'gratis'], alternatives: ['mailchimp', 'mailer-lite'] },
  { id: 'tool-22', slug: 'zapier', name: 'Zapier', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Zapier_logo.svg', description_es: 'Automatización entre 5.000+ apps sin código. Conecta tus herramientas SaaS fácilmente.', description_en: 'Automation between 5,000+ apps without code. Connect your SaaS tools easily.', category_id: 'cat-10', price_model: 'freemium', price_starting: 19.99, website_url: 'https://zapier.com', rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, tags: ['automatizacion', 'nocode', 'integraciones'], alternatives: ['make', 'n8n', 'ifttt'] },
  { id: 'tool-23', slug: 'make', name: 'Make', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Make_logo.svg', description_es: 'Antes Integromat. Automatización visual con escenarios, más potente y flexible que Zapier.', description_en: 'Formerly Integromat. Visual automation with scenarios, more powerful and flexible than Zapier.', category_id: 'cat-10', price_model: 'free', price_starting: 0, website_url: 'https://make.com', rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, tags: ['automatizacion', 'nocode', 'visual'], alternatives: ['zapier', 'n8n'] },
  { id: 'tool-24', slug: 'n8n', name: 'n8n', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/N8n_logo.svg', description_es: 'Automatización open source y auto-hospedada con editor visual. Alternativa a Zapier y Make.', description_en: 'Open source self-hosted automation with visual editor. Alternative to Zapier and Make.', category_id: 'cat-10', price_model: 'free', price_starting: 0, website_url: 'https://n8n.io', rating_g2: 4.6, rating_capterra: 4.7, is_open_source: true, tags: ['open-source', 'automatizacion', 'self-hosted'], alternatives: ['zapier', 'make'] },
  { id: 'tool-25', slug: 'google-analytics', name: 'Google Analytics', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Analytics_Logo.svg', description_es: 'Analítica web gratuita de Google. Tráfico, conversiones, audiencia y comportamiento.', description_en: 'Free web analytics by Google. Traffic, conversions, audience and behavior.', category_id: 'cat-6', price_model: 'free', price_starting: 0, website_url: 'https://analytics.google.com', rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, tags: ['analitica', 'web', 'gratis'], alternatives: ['plausible', 'matomo', 'fathom'] },
  { id: 'tool-26', slug: 'plausible', name: 'Plausible Analytics', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Plausible_logo.svg', description_es: 'Analítica web simple, privada y ligera. Open source, sin cookies, cumple GDPR.', description_en: 'Simple, private and lightweight web analytics. Open source, cookieless, GDPR compliant.', category_id: 'cat-6', price_model: 'paid', price_starting: 9, website_url: 'https://plausible.io', rating_g2: 4.6, rating_capterra: 4.8, is_open_source: true, tags: ['analitica', 'privacidad', 'open-source'], alternatives: ['google-analytics', 'matomo'] },
  { id: 'tool-27', slug: 'shopify', name: 'Shopify', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg', description_es: 'La plataforma de e-commerce más popular. Crea tu tienda online sin código.', description_en: 'The most popular e-commerce platform. Create your online store without code.', category_id: 'cat-13', price_model: 'paid', price_starting: 25, website_url: 'https://shopify.com', rating_g2: 4.4, rating_capterra: 4.5, is_open_source: false, tags: ['ecommerce', 'tienda-online', 'nocode'], alternatives: ['woocommerce', 'prestashop', 'ecwid'] },
  { id: 'tool-28', slug: 'woocommerce', name: 'WooCommerce', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/WooCommerce_logo.svg', description_es: 'Plugin de e-commerce open source para WordPress. Flexible y sin comisiones.', description_en: 'Open source e-commerce plugin for WordPress. Flexible and commission-free.', category_id: 'cat-13', price_model: 'free', price_starting: 0, website_url: 'https://woocommerce.com', rating_g2: 4.4, rating_capterra: 4.5, is_open_source: true, tags: ['ecommerce', 'open-source', 'wordpress', 'gratis'], alternatives: ['shopify', 'prestashop'] },
  { id: 'tool-29', slug: 'zoho-crm', name: 'Zoho CRM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Zoho_logo_2023.svg', description_es: 'CRM completo y económico con IA, automatización y suite de aplicaciones integradas.', description_en: 'Complete and affordable CRM with AI, automation and integrated suite of apps.', category_id: 'cat-4', price_model: 'free', price_starting: 0, website_url: 'https://zoho.com/crm', rating_g2: 4.1, rating_capterra: 4.3, is_open_source: false, tags: ['crm', 'ventas', 'gratis'], alternatives: ['hubspot', 'pipedrive', 'holded'] },
  { id: 'tool-30', slug: 'holded', name: 'Holded', logo_url: null, description_es: 'ERP español para pymes: facturación, contabilidad, CRM, inventario y proyectos.', description_en: 'Spanish ERP for SMBs: invoicing, accounting, CRM, inventory and projects.', category_id: 'cat-8', price_model: 'paid', price_starting: 15, website_url: 'https://holded.com', rating_g2: 4.3, rating_capterra: 4.4, is_open_source: false, tags: ['erp', 'espanol', 'pymes', 'facturacion'], alternatives: ['quipu', 'factura-directa', 'anfix'] },
]

// ============================================================
// GROQ CLIENT
// ============================================================

const groqApiKey = process.env.GROQ_API_KEY
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null

const MODEL = 'llama-3.3-70b-versatile'

async function generateIntro(toolName, category, priceModel, isOpenSource, lang) {
  if (!groq) return null
  const l = lang === 'en' ? 'ingles' : 'espanol'

  try {
    const system = `Eres un asistente que SOLO escribe introducciones para paginas de comparacion de herramientas SaaS. Solo produces JSON con clave "intro". Maximo 180 palabras. No inventas precios ni haces recomendaciones. No usas markdown. Idioma: ${l}.`
    const user = `Genera una introduccion en ${l} para la pagina de alternativas a ${toolName}. Categoria: ${category}. Modelo de precio: ${priceModel}. Es open source: ${isOpenSource ? 'si' : 'no'}. Explica brevemente por que alguien buscaria alternativas a ${toolName}. NO menciones precios exactos.`

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    })

    const raw = response.choices[0]?.message?.content
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const intro = parsed.intro
    if (!intro || typeof intro !== 'string' || intro.length < 50 || intro.length > 1500) return null
    if (intro.includes('$') || intro.includes('€')) return null
    return intro.trim()
  } catch (err) {
    console.error(`  [groq] Intro failed for ${toolName} (${lang}):`, err.message)
    return null
  }
}

async function generateFAQ(toolName, category, lang) {
  if (!groq) return []
  const l = lang === 'en' ? 'ingles' : 'espanol'

  try {
    const system = `Eres un asistente que SOLO genera FAQs sobre alternativas a herramientas SaaS. Solo produces JSON con clave "faq" que contiene array de 4-5 objetos {question, answer}. Cada answer maximo 80 palabras. Idioma: ${l}. No inventas precios.`
    const user = `Genera 4-5 FAQs en ${l} sobre alternativas a ${toolName}. Categoria: ${category}. Las preguntas que la gente busca en Google.`

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    })

    const raw = response.choices[0]?.message?.content
    if (!raw) return []
    const parsed = JSON.parse(raw)
    const faqs = parsed.faq
    if (!Array.isArray(faqs) || faqs.length < 2 || faqs.length > 6) return []
    return faqs.filter(f => f.question && f.answer && f.question.length >= 10 && f.answer.length >= 20)
  } catch (err) {
    console.error(`  [groq] FAQ failed for ${toolName} (${lang}):`, err.message)
    return []
  }
}

// ============================================================
// MAIN SEED
// ============================================================

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('[seed] ERROR: SUPABASE_URL y SUPABASE_ANON_KEY son necesarios.')
    console.error('[seed] Asegurate de tener el archivo .env configurado.')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log('[seed] Conectando a Supabase...')
  console.log(`[seed] URL: ${supabaseUrl}`)
  console.log(`[seed] Herramientas a insertar: ${tools.length}`)
  console.log(`[seed] Categorias: ${categories.length}`)
  console.log(`[seed] Groq: ${groq ? 'CONFIGURADO' : 'NO configurado - sin contenido IA'}`)
  console.log('')

  // 1. Insertar categorias
  console.log('[seed] 1/4 Insertando categorias...')
  for (const cat of categories) {
    const { error } = await supabase.from('categories').upsert({
      id: cat.id, slug: cat.slug, name_es: cat.name_es, name_en: cat.name_en,
      icon: cat.icon, description_es: cat.description_es, description_en: cat.description_en,
    }, { onConflict: 'slug' })
    console.log(error ? `  ⚠ ${cat.slug}: ${error.message}` : `  ✅ ${cat.slug}`)
  }

  // 2. Insertar herramientas
  console.log('\n[seed] 2/4 Insertando herramientas...')
  for (const tool of tools) {
    const { alternatives, ...toolData } = tool
    const { error } = await supabase.from('tools').upsert({
      ...toolData,
      is_verified: false,
      listing_tier: 'free',
    }, { onConflict: 'slug' })
    console.log(error ? `  ⚠ ${tool.slug}: ${error.message}` : `  ✅ ${tool.slug}`)

    // Relaciones
    if (alternatives && alternatives.length > 0) {
      for (const altSlug of alternatives) {
        const altTool = tools.find(t => t.slug === altSlug)
        if (!altTool) continue
        const { error: relErr } = await supabase.from('tool_alternatives').upsert({
          tool_id: tool.id, alternative_id: altTool.id, rank: alternatives.indexOf(altSlug) + 1,
        }, { onConflict: 'tool_id,alternative_id' })
        if (relErr) console.log(`    ⚠ relation ${tool.slug}->${altSlug}: ${relErr.message}`)
      }
    }
  }

  // 3. Generar contenido IA con Groq
  console.log('\n[seed] 3/4 Generando contenido IA...')
  if (!groq) {
    console.log('  ⚠ Groq no configurado. Saltando generacion de contenido.')
  } else {
    let contentCount = 0
    for (const tool of tools) {
      const cat = categories.find(c => c.id === tool.category_id)
      if (!cat) continue

      const toolName = tool.name
      const catEs = cat.name_es
      const catEn = cat.name_en

      console.log(`  Generando para ${toolName}...`)
      const [introEs, introEn, faqEs, faqEn] = await Promise.all([
        generateIntro(toolName, catEs, tool.price_model, tool.is_open_source, 'es'),
        generateIntro(toolName, catEn, tool.price_model, tool.is_open_source, 'en'),
        generateFAQ(toolName, catEs, 'es'),
        generateFAQ(toolName, catEn, 'en'),
      ])

      const { error } = await supabase.from('generated_content').upsert({
        tool_id: tool.id,
        intro_es: introEs,
        intro_en: introEn,
        faq_es: faqEs,
        faq_en: faqEn,
        last_generated_at: new Date().toISOString(),
      }, { onConflict: 'tool_id' })

      if (error) {
        console.log(`    ⚠ ${tool.slug}: ${error.message}`)
      } else {
        contentCount++
        console.log(`    ✅ ${tool.slug} (${contentCount}/${tools.length})`)
      }

      // Pausa para rate limit (28/min = ~1 cada 2 segundos)
      await new Promise(r => setTimeout(r, 2500))
    }
    console.log(`  ✅ ${contentCount}/${tools.length} contenidos generados`)
  }

  // 4. Verificar
  console.log('\n[seed] 4/4 Verificando...')
  const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true })
  const { count: toolCount } = await supabase.from('tools').select('*', { count: 'exact', head: true })
  const { count: contentCount } = await supabase.from('generated_content').select('*', { count: 'exact', head: true })

  console.log(`  Categorias: ${catCount}`)
  console.log(`  Herramientas: ${toolCount}`)
  console.log(`  Contenidos IA: ${contentCount}`)

  console.log('\n✅ Seed completo!')
}

main().catch(err => {
  console.error('\n❌ Error fatal:', err)
  process.exit(1)
})
