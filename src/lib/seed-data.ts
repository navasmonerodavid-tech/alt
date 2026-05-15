import type { Category, Tool, ToolAlternative, GeneratedContent } from './types'

// ============================================================
// SEED DATA — 20 categorias + 30 herramientas reales
// ============================================================

export const categories: Category[] = [
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

export const tools: (Tool & { alternatives?: { alternative_slug: string; rank: number }[] })[] = [
  {
    id: 'tool-1', slug: 'notion', name: 'Notion',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    description_es: 'Espacio de trabajo todo en uno: notas, documentos, bases de datos y wikis.',
    description_en: 'All-in-one workspace: notes, docs, databases and wikis.',
    category_id: 'cat-12', price_model: 'freemium', price_starting: 10,
    website_url: 'https://notion.so', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, is_verified: true, listing_tier: 'free',
    tags: ['colaboracion', 'documentos', 'bases-datos', 'wiki'],
    alternatives: [
      { alternative_slug: 'obsidian', rank: 1 },
      { alternative_slug: 'clickup', rank: 2 },
      { alternative_slug: 'anytype', rank: 3 },
      { alternative_slug: 'craft', rank: 4 },
      { alternative_slug: 'nimbus-note', rank: 5 },
    ]
  },
  {
    id: 'tool-2', slug: 'slack', name: 'Slack',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    description_es: 'Plataforma de mensajería para equipos con canales, integraciones y videollamadas.',
    description_en: 'Team messaging platform with channels, integrations and video calls.',
    category_id: 'cat-3', price_model: 'freemium', price_starting: 7.25,
    website_url: 'https://slack.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, is_verified: true, listing_tier: 'free',
    tags: ['chat', 'equipos', 'integraciones'],
    alternatives: [
      { alternative_slug: 'discord', rank: 1 },
      { alternative_slug: 'google-chat', rank: 2 },
      { alternative_slug: 'mattermost', rank: 3 },
      { alternative_slug: 'rocket-chat', rank: 4 },
      { alternative_slug: 'zulip', rank: 5 },
    ]
  },
  {
    id: 'tool-3', slug: 'figma', name: 'Figma',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    description_es: 'Herramienta de diseño UI/UX colaborativa en la nube con prototipado y design systems.',
    description_en: 'Collaborative cloud-based UI/UX design tool with prototyping and design systems.',
    category_id: 'cat-2', price_model: 'freemium', price_starting: 12,
    website_url: 'https://figma.com', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, is_verified: true, listing_tier: 'free',
    tags: ['ui', 'ux', 'prototipado', 'colaboracion'],
    alternatives: [
      { alternative_slug: 'penpot', rank: 1 },
      { alternative_slug: 'sketch', rank: 2 },
      { alternative_slug: 'adobe-xd', rank: 3 },
      { alternative_slug: 'lunacy', rank: 4 },
      { alternative_slug: 'framer', rank: 5 },
    ]
  },
  {
    id: 'tool-4', slug: 'trello', name: 'Trello',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello-logo-blue.svg',
    description_es: 'Gestión visual de proyectos con tableros Kanban, listas y tarjetas.',
    description_en: 'Visual project management with Kanban boards, lists and cards.',
    category_id: 'cat-1', price_model: 'freemium', price_starting: 5,
    website_url: 'https://trello.com', affiliate_url: null,
    rating_g2: 4.3, rating_capterra: 4.5, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['kanban', 'tareas', 'equipos'],
    alternatives: [
      { alternative_slug: 'asana', rank: 1 },
      { alternative_slug: 'clickup', rank: 2 },
      { alternative_slug: 'linear', rank: 3 },
      { alternative_slug: 'taiga', rank: 4 },
      { alternative_slug: 'planka', rank: 5 },
    ]
  },
  {
    id: 'tool-5', slug: 'asana', name: 'Asana',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Asana_logo.svg',
    description_es: 'Gestión de proyectos y trabajo en equipo con listas, calendarios y timelines.',
    description_en: 'Project management and teamwork with lists, calendars and timelines.',
    category_id: 'cat-1', price_model: 'freemium', price_starting: 10.99,
    website_url: 'https://asana.com', affiliate_url: null,
    rating_g2: 4.4, rating_capterra: 4.5, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['proyectos', 'tareas', 'equipos', 'calendario'],
    alternatives: [
      { alternative_slug: 'clickup', rank: 1 },
      { alternative_slug: 'trello', rank: 2 },
      { alternative_slug: 'monday', rank: 3 },
      { alternative_slug: 'linear', rank: 4 },
    ]
  },
  {
    id: 'tool-6', slug: 'clickup', name: 'ClickUp',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Clickup_logo.svg',
    description_es: 'Plataforma todo-en-uno: proyectos, docs, chat, objetivos y automatización.',
    description_en: 'All-in-one platform: projects, docs, chat, goals and automation.',
    category_id: 'cat-1', price_model: 'freemium', price_starting: 7,
    website_url: 'https://clickup.com', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.6, is_open_source: false, is_verified: true, listing_tier: 'free',
    tags: ['proyectos', 'documentos', 'automatizacion'],
    alternatives: [
      { alternative_slug: 'asana', rank: 1 },
      { alternative_slug: 'notion', rank: 2 },
      { alternative_slug: 'monday', rank: 3 },
    ]
  },
  {
    id: 'tool-7', slug: 'monday', name: 'Monday.com',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Monday.com_Logo.svg',
    description_es: 'Sistema operativo de trabajo visual para gestionar proyectos, procesos y flujos.',
    description_en: 'Visual work operating system to manage projects, processes and workflows.',
    category_id: 'cat-1', price_model: 'paid', price_starting: 9,
    website_url: 'https://monday.com', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.6, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['proyectos', 'crm', 'equipos'],
    alternatives: [
      { alternative_slug: 'asana', rank: 1 },
      { alternative_slug: 'clickup', rank: 2 },
      { alternative_slug: 'smartsheet', rank: 3 },
    ]
  },
  {
    id: 'tool-8', slug: 'hubspot', name: 'HubSpot CRM',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/HubSpot_Logo.svg',
    description_es: 'CRM gratuito con gestión de contactos, pipeline de ventas y marketing integrado.',
    description_en: 'Free CRM with contact management, sales pipeline and integrated marketing.',
    category_id: 'cat-4', price_model: 'free', price_starting: 0,
    website_url: 'https://hubspot.com', affiliate_url: null,
    rating_g2: 4.4, rating_capterra: 4.5, is_open_source: false, is_verified: true, listing_tier: 'free',
    tags: ['crm', 'ventas', 'marketing', 'gratis'],
    alternatives: [
      { alternative_slug: 'pipedrive', rank: 1 },
      { alternative_slug: 'zoho-crm', rank: 2 },
      { alternative_slug: 'holded', rank: 3 },
    ]
  },
  {
    id: 'tool-9', slug: 'pipedrive', name: 'Pipedrive',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pipedrive_logo.svg',
    description_es: 'CRM enfocado en pipeline de ventas con automatizaciones, informes y email integrado.',
    description_en: 'CRM focused on sales pipeline with automations, reports and integrated email.',
    category_id: 'cat-4', price_model: 'paid', price_starting: 14,
    website_url: 'https://pipedrive.com', affiliate_url: null,
    rating_g2: 4.2, rating_capterra: 4.6, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['crm', 'ventas', 'pipeline'],
    alternatives: [
      { alternative_slug: 'hubspot', rank: 1 },
      { alternative_slug: 'zoho-crm', rank: 2 },
      { alternative_slug: 'salesflare', rank: 3 },
    ]
  },
  {
    id: 'tool-10', slug: 'semrush', name: 'Semrush',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Semrush_logo.svg',
    description_es: 'Suite SEO completa: keywords, auditorías, backlinks, competencia y contenido.',
    description_en: 'Complete SEO suite: keywords, audits, backlinks, competition and content.',
    category_id: 'cat-15', price_model: 'paid', price_starting: 129.95,
    website_url: 'https://semrush.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.6, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['seo', 'marketing', 'analitica'],
    alternatives: [
      { alternative_slug: 'ahrefs', rank: 1 },
      { alternative_slug: 'mangools', rank: 2 },
      { alternative_slug: 'serpstat', rank: 3 },
    ]
  },
  {
    id: 'tool-11', slug: 'ahrefs', name: 'Ahrefs',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Ahrefs_logo.svg',
    description_es: 'Herramienta SEO líder en análisis de backlinks, keywords y auditorías de sitio.',
    description_en: 'Leading SEO tool for backlink analysis, keywords and site audits.',
    category_id: 'cat-15', price_model: 'paid', price_starting: 99,
    website_url: 'https://ahrefs.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['seo', 'backlinks', 'marketing'],
    alternatives: [
      { alternative_slug: 'semrush', rank: 1 },
      { alternative_slug: 'mangools', rank: 2 },
    ]
  },
  {
    id: 'tool-12', slug: 'canva', name: 'Canva',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
    description_es: 'Diseño gráfico fácil para todos: presentaciones, redes sociales, vídeos y docs.',
    description_en: 'Easy graphic design for everyone: presentations, social media, videos and docs.',
    category_id: 'cat-2', price_model: 'freemium', price_starting: 12.99,
    website_url: 'https://canva.com', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['diseno', 'redes-sociales', 'facil'],
    alternatives: [
      { alternative_slug: 'figma', rank: 1 },
      { alternative_slug: 'adobe-express', rank: 2 },
      { alternative_slug: 'vista-create', rank: 3 },
    ]
  },
  {
    id: 'tool-13', slug: 'obsidian', name: 'Obsidian',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg',
    description_es: 'Aplicación de notas con enlaces bidireccionales, grafos y plugins. Basada en Markdown local.',
    description_en: 'Note-taking app with backlinks, graphs and plugins. Based on local Markdown files.',
    category_id: 'cat-12', price_model: 'free', price_starting: 0,
    website_url: 'https://obsidian.md', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.8, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['notas', 'markdown', 'local', 'gratis'],
    alternatives: [
      { alternative_slug: 'notion', rank: 1 },
      { alternative_slug: 'anytype', rank: 2 },
      { alternative_slug: 'logseq', rank: 3 },
    ]
  },
  {
    id: 'tool-14', slug: 'anytype', name: 'Anytype',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Anytype_logo.svg',
    description_es: 'Alternativa open source a Notion, descentralizada, privada y offline-first.',
    description_en: 'Open source Notion alternative, decentralized, private and offline-first.',
    category_id: 'cat-12', price_model: 'free', price_starting: 0,
    website_url: 'https://anytype.io', affiliate_url: null,
    rating_g2: 4.3, rating_capterra: 4.4, is_open_source: true, is_verified: false, listing_tier: 'free',
    tags: ['open-source', 'notas', 'privacidad', 'gratis'],
    alternatives: [
      { alternative_slug: 'notion', rank: 1 },
      { alternative_slug: 'obsidian', rank: 2 },
      { alternative_slug: 'appflowy', rank: 3 },
    ]
  },
  {
    id: 'tool-15', slug: 'linear', name: 'Linear',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Linear_Logo.svg',
    description_es: 'Gestión de proyectos ultrarrápida para equipos de software. Issues, sprints y roadmaps.',
    description_en: 'Lightning-fast project management for software teams. Issues, sprints and roadmaps.',
    category_id: 'cat-1', price_model: 'freemium', price_starting: 8,
    website_url: 'https://linear.app', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.6, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['desarrollo', 'sprints', 'issues'],
    alternatives: [
      { alternative_slug: 'jira', rank: 1 },
      { alternative_slug: 'asana', rank: 2 },
      { alternative_slug: 'shortcut', rank: 3 },
    ]
  },
  {
    id: 'tool-16', slug: 'jira', name: 'Jira',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Jira_Logo.svg',
    description_es: 'Gestión de proyectos ágiles de Atlassian. Scrum, Kanban y seguimiento de bugs.',
    description_en: 'Agile project management by Atlassian. Scrum, Kanban and bug tracking.',
    category_id: 'cat-1', price_model: 'free', price_starting: 0,
    website_url: 'https://atlassian.com/software/jira', affiliate_url: null,
    rating_g2: 4.2, rating_capterra: 4.4, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['agil', 'scrum', 'bugs', 'desarrollo'],
    alternatives: [
      { alternative_slug: 'linear', rank: 1 },
      { alternative_slug: 'clickup', rank: 2 },
      { alternative_slug: 'shortcut', rank: 3 },
    ]
  },
  {
    id: 'tool-17', slug: 'discord', name: 'Discord',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Discord_logo.svg',
    description_es: 'Plataforma de chat por voz, texto y vídeo con servidores, canales y comunidades.',
    description_en: 'Voice, text and video chat platform with servers, channels and communities.',
    category_id: 'cat-3', price_model: 'free', price_starting: 0,
    website_url: 'https://discord.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.5, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['chat', 'voz', 'comunidades', 'gratis'],
    alternatives: [
      { alternative_slug: 'slack', rank: 1 },
      { alternative_slug: 'mattermost', rank: 2 },
    ]
  },
  {
    id: 'tool-18', slug: 'mattermost', name: 'Mattermost',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Mattermost_logo_horizontal.svg',
    description_es: 'Alternativa open source a Slack. Auto-hospedada, privada y personalizable.',
    description_en: 'Open source Slack alternative. Self-hosted, private and customizable.',
    category_id: 'cat-3', price_model: 'free', price_starting: 0,
    website_url: 'https://mattermost.com', affiliate_url: null,
    rating_g2: 4.3, rating_capterra: 4.5, is_open_source: true, is_verified: false, listing_tier: 'free',
    tags: ['open-source', 'self-hosted', 'chat', 'privacidad'],
    alternatives: [
      { alternative_slug: 'slack', rank: 1 },
      { alternative_slug: 'rocket-chat', rank: 2 },
    ]
  },
  {
    id: 'tool-19', slug: 'penpot', name: 'Penpot',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Penpot_logo.svg',
    description_es: 'Alternativa open source a Figma. Diseño y prototipado UI/UX en navegador.',
    description_en: 'Open source Figma alternative. UI/UX design and prototyping in browser.',
    category_id: 'cat-2', price_model: 'free', price_starting: 0,
    website_url: 'https://penpot.app', affiliate_url: null,
    rating_g2: 4.4, rating_capterra: 4.4, is_open_source: true, is_verified: false, listing_tier: 'free',
    tags: ['open-source', 'diseno', 'ui', 'gratis'],
    alternatives: [
      { alternative_slug: 'figma', rank: 1 },
      { alternative_slug: 'lunacy', rank: 2 },
    ]
  },
  {
    id: 'tool-20', slug: 'mailchimp', name: 'Mailchimp',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Mailchimp_Logo.svg',
    description_es: 'Plataforma de email marketing y automatización. Newsletters, formularios y analytics.',
    description_en: 'Email marketing and automation platform. Newsletters, forms and analytics.',
    category_id: 'cat-5', price_model: 'freemium', price_starting: 13,
    website_url: 'https://mailchimp.com', affiliate_url: null,
    rating_g2: 4.3, rating_capterra: 4.5, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['email', 'newsletter', 'automatizacion'],
    alternatives: [
      { alternative_slug: 'brevo', rank: 1 },
      { alternative_slug: 'mailer-lite', rank: 2 },
      { alternative_slug: 'active-campaign', rank: 3 },
    ]
  },
  {
    id: 'tool-21', slug: 'brevo', name: 'Brevo',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Brevo_Logo.svg',
    description_es: 'Antes Sendinblue. Email marketing, SMS, chat y CRM en una plataforma económica.',
    description_en: 'Formerly Sendinblue. Email marketing, SMS, chat and CRM in an affordable platform.',
    category_id: 'cat-5', price_model: 'free', price_starting: 0,
    website_url: 'https://brevo.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.5, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['email', 'sms', 'crm', 'gratis'],
    alternatives: [
      { alternative_slug: 'mailchimp', rank: 1 },
      { alternative_slug: 'mailer-lite', rank: 2 },
    ]
  },
  {
    id: 'tool-22', slug: 'zapier', name: 'Zapier',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Zapier_logo.svg',
    description_es: 'Automatización entre 5.000+ apps sin código. Conecta tus herramientas SaaS fácilmente.',
    description_en: 'Automation between 5,000+ apps without code. Connect your SaaS tools easily.',
    category_id: 'cat-10', price_model: 'freemium', price_starting: 19.99,
    website_url: 'https://zapier.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['automatizacion', 'nocode', 'integraciones'],
    alternatives: [
      { alternative_slug: 'make', rank: 1 },
      { alternative_slug: 'n8n', rank: 2 },
      { alternative_slug: 'ifttt', rank: 3 },
    ]
  },
  {
    id: 'tool-23', slug: 'make', name: 'Make',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Make_logo.svg',
    description_es: 'Antes Integromat. Automatización visual con escenarios, más potente y flexible que Zapier.',
    description_en: 'Formerly Integromat. Visual automation with scenarios, more powerful and flexible than Zapier.',
    category_id: 'cat-10', price_model: 'free', price_starting: 0,
    website_url: 'https://make.com', affiliate_url: null,
    rating_g2: 4.7, rating_capterra: 4.7, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['automatizacion', 'nocode', 'visual'],
    alternatives: [
      { alternative_slug: 'zapier', rank: 1 },
      { alternative_slug: 'n8n', rank: 2 },
    ]
  },
  {
    id: 'tool-24', slug: 'n8n', name: 'n8n',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/N8n_logo.svg',
    description_es: 'Automatización open source y auto-hospedada con editor visual. Alternativa a Zapier y Make.',
    description_en: 'Open source self-hosted automation with visual editor. Alternative to Zapier and Make.',
    category_id: 'cat-10', price_model: 'free', price_starting: 0,
    website_url: 'https://n8n.io', affiliate_url: null,
    rating_g2: 4.6, rating_capterra: 4.7, is_open_source: true, is_verified: false, listing_tier: 'free',
    tags: ['open-source', 'automatizacion', 'self-hosted'],
    alternatives: [
      { alternative_slug: 'zapier', rank: 1 },
      { alternative_slug: 'make', rank: 2 },
    ]
  },
  {
    id: 'tool-25', slug: 'google-analytics', name: 'Google Analytics',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Analytics_Logo.svg',
    description_es: 'Analítica web gratuita de Google. Tráfico, conversiones, audiencia y comportamiento.',
    description_en: 'Free web analytics by Google. Traffic, conversions, audience and behavior.',
    category_id: 'cat-6', price_model: 'free', price_starting: 0,
    website_url: 'https://analytics.google.com', affiliate_url: null,
    rating_g2: 4.5, rating_capterra: 4.7, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['analitica', 'web', 'gratis'],
    alternatives: [
      { alternative_slug: 'plausible', rank: 1 },
      { alternative_slug: 'matomo', rank: 2 },
      { alternative_slug: 'fathom', rank: 3 },
    ]
  },
  {
    id: 'tool-26', slug: 'plausible', name: 'Plausible Analytics',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Plausible_logo.svg',
    description_es: 'Analítica web simple, privada y ligera. Open source, sin cookies, cumple GDPR.',
    description_en: 'Simple, private and lightweight web analytics. Open source, cookieless, GDPR compliant.',
    category_id: 'cat-6', price_model: 'paid', price_starting: 9,
    website_url: 'https://plausible.io', affiliate_url: null,
    rating_g2: 4.6, rating_capterra: 4.8, is_open_source: true, is_verified: false, listing_tier: 'free',
    tags: ['analitica', 'privacidad', 'open-source'],
    alternatives: [
      { alternative_slug: 'google-analytics', rank: 1 },
      { alternative_slug: 'matomo', rank: 2 },
    ]
  },
  {
    id: 'tool-27', slug: 'shopify', name: 'Shopify',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
    description_es: 'La plataforma de e-commerce más popular. Crea tu tienda online sin código.',
    description_en: 'The most popular e-commerce platform. Create your online store without code.',
    category_id: 'cat-13', price_model: 'paid', price_starting: 25,
    website_url: 'https://shopify.com', affiliate_url: null,
    rating_g2: 4.4, rating_capterra: 4.5, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['ecommerce', 'tienda-online', 'nocode'],
    alternatives: [
      { alternative_slug: 'woocommerce', rank: 1 },
      { alternative_slug: 'prestashop', rank: 2 },
      { alternative_slug: 'ecwid', rank: 3 },
    ]
  },
  {
    id: 'tool-28', slug: 'woocommerce', name: 'WooCommerce',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/WooCommerce_logo.svg',
    description_es: 'Plugin de e-commerce open source para WordPress. Flexible y sin comisiones.',
    description_en: 'Open source e-commerce plugin for WordPress. Flexible and commission-free.',
    category_id: 'cat-13', price_model: 'free', price_starting: 0,
    website_url: 'https://woocommerce.com', affiliate_url: null,
    rating_g2: 4.4, rating_capterra: 4.5, is_open_source: true, is_verified: false, listing_tier: 'free',
    tags: ['ecommerce', 'open-source', 'wordpress', 'gratis'],
    alternatives: [
      { alternative_slug: 'shopify', rank: 1 },
      { alternative_slug: 'prestashop', rank: 2 },
    ]
  },
  {
    id: 'tool-29', slug: 'zoho-crm', name: 'Zoho CRM',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Zoho_logo_2023.svg',
    description_es: 'CRM completo y económico con IA, automatización y suite de aplicaciones integradas.',
    description_en: 'Complete and affordable CRM with AI, automation and integrated suite of apps.',
    category_id: 'cat-4', price_model: 'free', price_starting: 0,
    website_url: 'https://zoho.com/crm', affiliate_url: null,
    rating_g2: 4.1, rating_capterra: 4.3, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['crm', 'ventas', 'gratis'],
    alternatives: [
      { alternative_slug: 'hubspot', rank: 1 },
      { alternative_slug: 'pipedrive', rank: 2 },
      { alternative_slug: 'holded', rank: 3 },
    ]
  },
  {
    id: 'tool-30', slug: 'holded', name: 'Holded',
    logo_url: 'https://www.holded.com/es/favicon.svg',
    description_es: 'ERP español para pymes: facturación, contabilidad, CRM, inventario y proyectos.',
    description_en: 'Spanish ERP for SMBs: invoicing, accounting, CRM, inventory and projects.',
    category_id: 'cat-8', price_model: 'paid', price_starting: 15,
    website_url: 'https://holded.com', affiliate_url: null,
    rating_g2: 4.3, rating_capterra: 4.4, is_open_source: false, is_verified: false, listing_tier: 'free',
    tags: ['erp', 'espanol', 'pymes', 'facturacion'],
    alternatives: [
      { alternative_slug: 'quipu', rank: 1 },
      { alternative_slug: 'factura-directa', rank: 2 },
      { alternative_slug: 'anfix', rank: 3 },
    ]
  },
]

// ============================================================
// GENERATED CONTENT MOCK
// ============================================================

export const generatedContent: GeneratedContent[] = [
  {
    id: 'gc-1', tool_id: 'tool-1',
    intro_es: 'Notion se ha convertido en una de las herramientas más populares del mercado, pero no es para todos. Su curva de aprendizaje, la falta de acceso offline real o simplemente el precio pueden hacerte buscar alternativas. Aquí tienes las mejores opciones según tu caso de uso: desde herramientas más simples hasta opciones open source que respetan tu privacidad.',
    intro_en: 'Notion has become one of the most popular tools on the market, but it\'s not for everyone. Its learning curve, lack of true offline access, or simply the price may make you look for alternatives. Here are the best options based on your use case: from simpler tools to open source options that respect your privacy.',
    faq_es: [
      { question: '¿Cuál es la mejor alternativa gratis a Notion?', answer: 'Anytype y Obsidian son las mejores alternativas gratuitas. Anytype es la más parecida en concepto (bloques, bases de datos) pero con cifrado local. Obsidian es ideal si prefieres trabajar con archivos Markdown locales.' },
      { question: '¿Existe una alternativa open source a Notion?', answer: 'Sí. Anytype y AppFlowy son open source. Anytype está más madura y ofrece una experiencia similar con bloques y bases de datos, mientras que AppFlowy está creciendo rápido.' },
      { question: '¿Merece la pena pagar Notion o hay alternativas mejores?', answer: 'Depende de tu uso. Si solo necesitas notas y documentos, Obsidian es mejor y gratuito. Si necesitas gestión de proyectos además de docs, ClickUp ofrece más funcionalidades por un precio similar.' },
      { question: '¿Se puede migrar de Notion a otra herramienta fácilmente?', answer: 'Notion permite exportar en Markdown, CSV y HTML. La mayoría de alternativas como Obsidian y Anytype aceptan importación Markdown, lo que facilita la migración.' },
      { question: '¿Qué alternativa a Notion funciona offline?', answer: 'Obsidian y Anytype funcionan perfectamente offline. Obsidian guarda todo en archivos locales Markdown. Anytype tiene sincronización P2P cifrada que funciona sin conexión.' },
    ],
    faq_en: [
      { question: 'What is the best free alternative to Notion?', answer: 'Anytype and Obsidian are the best free alternatives. Anytype is closest in concept (blocks, databases) but with local encryption. Obsidian is ideal if you prefer working with local Markdown files.' },
      { question: 'Is there an open source alternative to Notion?', answer: 'Yes. Anytype and AppFlowy are open source. Anytype is more mature and offers a similar experience with blocks and databases, while AppFlowy is growing rapidly.' },
      { question: 'Is Notion worth paying for or are there better alternatives?', answer: 'It depends on your use. If you only need notes and documents, Obsidian is better and free. If you need project management along with docs, ClickUp offers more features at a similar price.' },
      { question: 'Can I easily migrate from Notion to another tool?', answer: 'Notion allows export in Markdown, CSV and HTML. Most alternatives like Obsidian and Anytype accept Markdown import, making migration easier.' },
      { question: 'Which Notion alternative works offline?', answer: 'Obsidian and Anytype work perfectly offline. Obsidian stores everything in local Markdown files. Anytype has encrypted P2P sync that works without connection.' },
    ],
    last_generated_at: '2026-05-12T00:00:00Z',
  },
  {
    id: 'gc-2', tool_id: 'tool-2',
    intro_es: 'Slack domina la comunicación empresarial, pero su precio por usuario puede dispararse en equipos grandes. Además, las notificaciones constantes y la retención de mensajes limitada en el plan gratuito son quejas frecuentes. Aquí tienes alternativas reales para equipos de cualquier tamaño.',
    intro_en: 'Slack dominates business communication, but its per-user pricing can skyrocket for large teams. Additionally, constant notifications and limited message retention on the free plan are frequent complaints. Here are real alternatives for teams of any size.',
    faq_es: [
      { question: '¿Cuál es la mejor alternativa gratis a Slack?', answer: 'Discord es la alternativa gratuita más completa, con canales de voz, texto y vídeo sin límite de mensajes. Para equipos que buscan algo profesional, Mattermost y Rocket.Chat tienen versiones gratuitas auto-hospedadas.' },
      { question: '¿Hay alguna alternativa open source a Slack?', answer: 'Sí. Mattermost, Rocket.Chat y Zulip son open source y puedes instalarlas en tu propio servidor. Mattermost es la más parecida a Slack en experiencia de uso.' },
      { question: '¿Merece la pena pagar Slack o hay alternativas más baratas?', answer: 'Para equipos de más de 10 personas, Mattermost auto-hospedado o Google Chat (incluido en Google Workspace) pueden ahorrar cientos de euros al mes respecto a Slack.' },
      { question: '¿Qué herramienta usan los desarrolladores en vez de Slack?', answer: 'Muchos equipos de desarrollo están migrando a Discord por sus comunidades, o a Zulip por su modelo de hilos organizado por temas que evita el caos de canales.' },
    ],
    faq_en: [
      { question: 'What is the best free alternative to Slack?', answer: 'Discord is the most complete free alternative, with unlimited voice, text and video channels. For professional teams, Mattermost and Rocket.Chat have free self-hosted versions.' },
      { question: 'Is there an open source alternative to Slack?', answer: 'Yes. Mattermost, Rocket.Chat and Zulip are open source and can be installed on your own server. Mattermost is closest to Slack in user experience.' },
    ],
    last_generated_at: '2026-05-12T00:00:00Z',
  },
  {
    id: 'gc-3', tool_id: 'tool-3',
    intro_es: 'Figma es el estándar en diseño UI/UX, pero desde la compra de Adobe los precios han subido y muchos diseñadores buscan alternativas. Si te preocupa el precio, la privacidad o simplemente quieres probar algo diferente, aquí tienes las mejores opciones en 2026.',
    intro_en: 'Figma is the standard in UI/UX design, but since the Adobe acquisition, prices have risen and many designers are looking for alternatives. If you\'re concerned about price, privacy, or just want to try something different, here are the best options in 2026.',
    faq_es: [
      { question: '¿Cuál es la mejor alternativa gratuita a Figma?', answer: 'Penpot es la mejor alternativa gratuita. Es open source, funciona en navegador sin instalar nada, y ofrece funcionalidades muy similares a Figma incluyendo componentes, auto-layout y prototipado.' },
      { question: '¿Penpot es realmente tan bueno como Figma?', answer: 'Para diseño UI/UX de nivel medio-superior, Penpot ya cubre el 80% de lo que hace Figma. Le faltan algunos plugins avanzados y la comunidad es más pequeña, pero para la mayoría de proyectos es más que suficiente.' },
      { question: '¿Hay alternativas a Figma que funcionen offline?', answer: 'Sketch (macOS) y Lunacy (Windows/macOS) son aplicaciones de escritorio que funcionan offline. Ambas soportan archivos .fig y .sketch.' },
    ],
    faq_en: [
      { question: 'What is the best free alternative to Figma?', answer: 'Penpot is the best free alternative. It\'s open source, works in the browser without installing anything, and offers features very similar to Figma including components, auto-layout and prototyping.' },
    ],
    last_generated_at: '2026-05-12T00:00:00Z',
  },
]
