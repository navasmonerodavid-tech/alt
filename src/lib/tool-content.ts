/**
 * Contenido enciclopedico extendido por herramienta (slug → datos ricos)
 * Complementa los datos basicos de seed-data.ts
 */
import type { PricingTier } from './types'

export interface ToolContent {
  features_es: string[]
  features_en: string[]
  pros_es: string[]
  pros_en: string[]
  cons_es: string[]
  cons_en: string[]
  best_for_es: string
  best_for_en: string
  not_ideal_for_es: string
  not_ideal_for_en: string
  founded_year: number | null
  integrations: string[]
  pricing_tiers: PricingTier[]
  screenshots: string[]
}

type ContentMap = Record<string, ToolContent>

export const toolContent: ContentMap = {
  notion: {
    features_es: ['Documentos colaborativos en tiempo real','Bases de datos relacionales personalizables','Wiki de equipo con páginas anidadas','Vistas Kanban, calendario, timeline y galería','10,000+ templates de la comunidad','API pública y automatizaciones','Integración con Slack, GitHub, Figma','Notion AI asistente de escritura'],
    features_en: ['Real-time collaborative docs','Customizable relational databases','Team wiki with nested pages','Kanban, calendar, timeline and gallery views','10,000+ community templates','Public API and automations','Slack, GitHub, Figma integrations','Notion AI writing assistant'],
    pros_es: ['Extremadamente flexible y personalizable','Excelente para documentación de equipo','Base de datos potente sin código','Plan gratuito muy generoso'],
    pros_en: ['Extremely flexible and customizable','Excellent for team documentation','Powerful no-code database','Very generous free plan'],
    cons_es: ['Curva de aprendizaje alta para nuevos usuarios','Rendimiento lento con bases de datos grandes','Acceso offline limitado','Precio por usuario se acumula rápido'],
    cons_en: ['Steep learning curve for new users','Slow with large databases','Limited offline access','Per-user pricing adds up fast'],
    best_for_es: 'Equipos que necesitan docs + bases de datos + wiki en una sola herramienta y startups que quieren documentar todo su conocimiento.',
    best_for_en: 'Teams needing docs + databases + wiki in one tool and startups wanting to document all their knowledge.',
    not_ideal_for_es: 'No recomendado si necesitas acceso offline real, gestión de proyectos avanzada con dependencias, o buscas una herramienta simple de solo notas.',
    not_ideal_for_en: 'Not if you need real offline access, advanced project management with dependencies, or a simple note-only tool.',
    founded_year: 2016,
    integrations: ['Slack','GitHub','Figma','Google Drive','Zapier','Typeform','Jira','Trello'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Gratis', price_monthly: 0, features: ['Bloques ilimitados','10 invitados','Historial 7 días'], limits: 'Equipos hasta 10' },
      { name: 'Plus', price_monthly: 10, features: ['Bloques ilimitados','100 invitados','Historial 30 días','Carga ilimitada'], limits: '' },
      { name: 'Business', price_monthly: 15, features: ['SAML SSO','Exportación masiva PDF','Teams privados'], limits: '' },
    ],
  },
  slack: {
    features_es: ['Canales públicos y privados','Mensajería directa y grupal','Llamadas de voz y vídeo (Huddles)','Compartir pantalla y archivos','2,600+ integraciones con apps','Workflow Builder sin código','Búsqueda de mensajes históricos','Slack Connect para colaborar con externos'],
    features_en: ['Public and private channels','Direct and group messaging','Voice and video calls (Huddles)','Screen and file sharing','2,600+ app integrations','No-code Workflow Builder','Historical message search','Slack Connect for external collaboration'],
    pros_es: ['Ecosistema de integraciones enorme','Interfaz intuitiva y pulida','Muy buena búsqueda de mensajes','Slack Connect útil entre empresas'],
    pros_en: ['Massive integration ecosystem','Intuitive, polished interface','Great message search','Slack Connect useful between companies'],
    cons_es: ['Caro por usuario en equipos grandes','Notificaciones abrumadoras sin configurar','Plan gratuito limita historial a 90 días','Llamadas de vídeo básicas vs Zoom'],
    cons_en: ['Expensive per user on large teams','Overwhelming notifications without setup','Free plan limits history to 90 days','Basic video calls vs Zoom'],
    best_for_es: 'Equipos de tecnología y empresas que necesitan comunicación asíncrona con muchas integraciones.',
    best_for_en: 'Tech teams and companies needing structured async communication with many integrations.',
    not_ideal_for_es: 'No ideal si buscas algo simple y gratis sin límite de historial, o si necesitas videollamadas avanzadas.',
    not_ideal_for_en: 'Not ideal if you want something simple, free with no history limit, or need advanced video calls.',
    founded_year: 2013,
    integrations: ['Google Drive','Trello','GitHub','Jira','Zoom','Salesforce','Asana','Monday'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Gratis', price_monthly: 0, features: ['Historial 90 días','10 integraciones','1:1 llamadas'], limits: '10k mensajes' },
      { name: 'Pro', price_monthly: 7.25, features: ['Historial ilimitado','Integraciones ilimitadas','Llamadas grupales','Huddles'], limits: '' },
      { name: 'Business+', price_monthly: 12.50, features: ['SAML SSO','Exportación datos','Slack Connect','SLA 99.99%'], limits: '' },
    ],
  },
  figma: {
    features_es: ['Diseño vectorial en navegador','Prototipado interactivo avanzado','Componentes y auto-layout','Librerías de design system','Colaboración multijugador en tiempo real','Figma Slides para presentaciones','Dev Mode para handoff a desarrollo','Plugins y widgets'],
    features_en: ['Browser vector design','Advanced interactive prototyping','Components and auto-layout','Design system libraries','Real-time multiplayer collaboration','Figma Slides for presentations','Dev Mode for handoff','Plugins and widgets'],
    pros_es: ['Colaboración en tiempo real excelente','Basado en navegador, sin instalar nada','Auto-layout ahorra horas de trabajo','Dev Mode mejora el handoff a desarrollo'],
    pros_en: ['Excellent real-time collaboration','Browser-based, no installation','Auto-layout saves hours of work','Dev Mode improves developer handoff'],
    cons_es: ['Plan gratuito limitado a 3 archivos','Rendimiento lento en archivos muy grandes','Precio subiendo desde adquisición Adobe','Requiere internet para colaborar'],
    cons_en: ['Free plan limited to 3 files','Slow on very large files','Prices rising since Adobe acquisition','Requires internet for collaboration'],
    best_for_es: 'Equipos de diseño y producto que necesitan colaboración en tiempo real, design systems y prototipado profesional.',
    best_for_en: 'Design and product teams needing real-time collaboration, shared design systems and professional prototyping.',
    not_ideal_for_es: 'No ideal si trabajas offline, haces ilustración compleja o motion graphics, o buscas open source gratuito.',
    not_ideal_for_en: 'Not if you work offline, do complex illustration or motion graphics, or want free open source.',
    founded_year: 2012,
    integrations: ['Slack','Jira','GitHub','Storybook','Zeplin','Notion','Maze','UserTesting'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Starter', price_monthly: 0, features: ['3 archivos Figma Design','Colaboración ilimitada'], limits: '3 archivos' },
      { name: 'Professional', price_monthly: 12, features: ['Archivos ilimitados','Librerías equipo','Dev Mode','Historial 30 días'], limits: '' },
      { name: 'Organization', price_monthly: 45, features: ['Design systems','Analíticas','Branching','SSO'], limits: '' },
    ],
  },
  trello: {
    features_es: ['Tableros Kanban drag & drop','Listas, tarjetas y checklists','Automatizaciones con Butler','Power-Ups para extender funcionalidad','Plantillas de tablero','Vistas timeline, calendario, dashboard','App móvil completa','Integraciones con apps clave'],
    features_en: ['Drag & drop Kanban boards','Lists, cards and checklists','Butler automations','Power-Ups to extend functionality','Board templates','Timeline, calendar, dashboard views','Full mobile app','Key app integrations'],
    pros_es: ['Increíblemente fácil de usar','Gratuito con muchas funcionalidades','Interfaz visual clara y atractiva','Butler automatiza tareas repetitivas'],
    pros_en: ['Incredibly easy to use','Free tier has lots of functionality','Clean, attractive visual interface','Butler automates repetitive tasks'],
    cons_es: ['No escala bien para proyectos complejos','Sin vista Gantt nativa robusta','Power-Ups limitados en plan gratuito','Difícil seguir deadlines en muchos tableros'],
    cons_en: ["Doesn't scale for complex projects",'No robust native Gantt view','Free plan Power-Up limits','Hard to track deadlines across many boards'],
    best_for_es: 'Equipos pequeños e individuos que quieren simplicidad visual para organizar tareas sin complejidad.',
    best_for_en: 'Small teams and individuals wanting visual simplicity to organize tasks without complexity.',
    not_ideal_for_es: 'No recomendado para gestión empresarial, proyectos con dependencias complejas o reporting avanzado.',
    not_ideal_for_en: 'Not for enterprise portfolio management, complex dependency projects, or advanced reporting.',
    founded_year: 2011,
    integrations: ['Slack','Google Drive','Jira','Evernote','GitHub','Dropbox','Zapier'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Gratis', price_monthly: 0, features: ['10 tableros','Power-Ups ilimitados','Automatización Butler'], limits: '10 tableros' },
      { name: 'Standard', price_monthly: 5, features: ['Tableros ilimitados','Adjuntos 250MB','Vistas avanzadas','Campos personalizados'], limits: '' },
      { name: 'Premium', price_monthly: 10, features: ['Vistas timeline, dashboard','Exportación datos','Admin controls'], limits: '' },
    ],
  },
  asana: {
    features_es: ['Vistas lista, tablero, calendario, timeline/Gantt','Portafolios y objetivos SMART','Workflows automatizados','Formularios y aprobaciones','Dependencias entre tareas','Reporting y dashboards','Gestión de carga de trabajo','200+ integraciones'],
    features_en: ['List, board, calendar, timeline/Gantt views','Portfolios and SMART goals','Automated workflows','Forms and approvals','Task dependencies','Reporting and dashboards','Workload management','200+ integrations'],
    pros_es: ['Muy completo para gestión profesional','Vistas múltiples potentes (Gantt, calendario)','Buenas herramientas de reporting','Workflows y reglas automatizadas'],
    pros_en: ['Very complete for professional PM','Powerful multiple views','Good reporting tools','Automated workflows and rules'],
    cons_es: ['Precio elevado para equipos pequeños','Interfaz puede resultar abrumadora','Plan gratuito muy limitado','Curva de aprendizaje media-alta'],
    cons_en: ['High price for small teams','Interface can be overwhelming','Very limited free plan','Medium-high learning curve'],
    best_for_es: 'Equipos medianos-grandes que necesitan gestión estructurada con jerarquías, dependencias y reporting.',
    best_for_en: 'Mid-to-large teams needing structured management with hierarchies, dependencies and reporting.',
    not_ideal_for_es: 'No para freelancers solitarios o equipos pequeños que solo necesitan un tablero kanban.',
    not_ideal_for_en: 'Not for solo freelancers or very small teams just needing a kanban board.',
    founded_year: 2008,
    integrations: ['Slack','Google Drive','Microsoft Teams','Outlook','Adobe CC','Zoom','Jira','Salesforce'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Personal', price_monthly: 0, features: ['Tareas básicas','Lista y tablero'], limits: '10 personas' },
      { name: 'Starter', price_monthly: 10.99, features: ['Timeline','Workflows','Formularios','Dashboards'], limits: '' },
      { name: 'Advanced', price_monthly: 24.99, features: ['Portafolios','Objetivos','Aprobaciones','Reporting avanzado'], limits: '' },
    ],
  },
  clickup: {
    features_es: ['15+ vistas: lista, tablero, Gantt, calendario, mapa mental','Documentos colaborativos','Chat nativo del equipo','Objetivos y OKRs','Pizarras digitales','Automatizaciones sin código','Control de tiempo nativo','Formularios y dashboards'],
    features_en: ['15+ views: list, board, Gantt, calendar, mind map','Collaborative docs','Native team chat','Goals and OKRs','Digital whiteboards','No-code automations','Native time tracking','Forms and dashboards'],
    pros_es: ['Más funcionalidades que cualquier competidor','Excelente relación calidad-precio','Plan gratuito muy completo','Actualizaciones frecuentes'],
    pros_en: ['More features than any competitor','Great value for money','Very complete free plan','Frequent updates'],
    cons_es: ['Interfaz cargada, difícil al principio','Rendimiento irregular a veces','Muchas funcionalidades = abrumador','App móvil no está a la altura'],
    cons_en: ['Cluttered interface, difficult at first','Inconsistent performance','Feature overload = overwhelming','Mobile app not up to par'],
    best_for_es: 'Equipos que quieren consolidar múltiples herramientas en una sola plataforma con máximo control.',
    best_for_en: 'Teams wanting to consolidate multiple tools into one platform with maximum control.',
    not_ideal_for_es: 'No ideal si buscas simplicidad extrema o tu equipo se abruma con muchas opciones.',
    not_ideal_for_en: 'Not if you seek extreme simplicity or your team gets overwhelmed with options.',
    founded_year: 2017,
    integrations: ['Slack','GitHub','GitLab','Google Drive','Outlook','Calendar','Toggl','Zapier'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Free', price_monthly: 0, features: ['100MB','Tareas ilimitadas','60 automatizaciones/mes'], limits: '5 espacios' },
      { name: 'Unlimited', price_monthly: 7, features: ['Almacenamiento ilimitado','Automatizaciones ilimitadas','Dashboards','Invitados'], limits: '' },
      { name: 'Business', price_monthly: 12, features: ['Objetivos','Pizarras','Time tracking','SAML SSO'], limits: '' },
    ],
  },
  monday: {
    features_es: ['Tableros visuales con columnas personalizables','Vistas Gantt, Kanban, calendario, timeline','Automatizaciones visuales sin código','Dashboards con widgets','200+ plantillas por industria','Formularios de captura de datos','Control de tiempo y presupuesto','Workdocs colaborativos'],
    features_en: ['Visual boards with customizable columns','Gantt, Kanban, calendar, timeline views','Visual no-code automations','Widget dashboards','200+ industry templates','Data capture forms','Time and budget tracking','Collaborative Workdocs'],
    pros_es: ['Interfaz visual muy atractiva y colorida','Fácil de aprender y usar','Muchas plantillas pre-hechas','Buen soporte de automatizaciones'],
    pros_en: ['Very attractive, colorful interface','Easy to learn and use','Many ready-made templates','Good automation support'],
    cons_es: ['Mínimo 3 usuarios (27eur/mes mínimo)','Caro comparado con alternativas','Almacenamiento limitado en planes bajos','Menos potente para desarrollo software'],
    cons_en: ['Minimum 3 users (27eur/month min)','Expensive vs alternatives','Limited storage on lower plans','Less powerful for software dev'],
    best_for_es: 'Empresas que valoran interfaz visual premium y necesitan cubrir múltiples departamentos.',
    best_for_en: 'Companies valuing premium visual interface and needing to cover multiple departments.',
    not_ideal_for_es: 'No para freelancers solitarios, equipos con presupuesto ajustado o desarrollo software puro.',
    not_ideal_for_en: 'Not for solo freelancers, budget-constrained teams or pure software dev.',
    founded_year: 2012,
    integrations: ['Slack','Google Drive','Outlook','Jira','Salesforce','Zoom','HubSpot','Zapier'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Basic', price_monthly: 9, features: ['Tableros ilimitados','200+ plantillas'], limits: 'Min 3 usuarios (27eur/mes)' },
      { name: 'Standard', price_monthly: 12, features: ['Gantt y calendario','Invitados','Automatizaciones'], limits: '' },
      { name: 'Pro', price_monthly: 19, features: ['Dashboards','Time tracking','Formularios','Dependencias'], limits: '' },
    ],
  },
  hubspot: {
    features_es: ['CRM gratuito con contactos ilimitados','Pipeline de ventas drag & drop','Email marketing y automatización','Chat en vivo y chatbots','Landing pages y formularios','Informes y dashboards','CMS para web corporativa','API pública extensa'],
    features_en: ['Free CRM with unlimited contacts','Drag & drop sales pipeline','Email marketing and automation','Live chat and chatbots','Landing pages and forms','Reports and dashboards','Corporate website CMS','Extensive public API'],
    pros_es: ['CRM realmente gratuito y muy completo','Todo en uno: marketing, ventas y servicio','Gran ecosistema de partners y apps','Academia gratuita de formación'],
    pros_en: ['Truly free and very complete CRM','All-in-one: marketing, sales and service','Great partner and app ecosystem','Free training academy'],
    cons_es: ['Se vuelve caro al contratar módulos avanzados','Personalización limitada en reporting','Curva de aprendizaje usando todas las herramientas','Difícil migrar datos a otro CRM'],
    cons_en: ['Gets expensive with advanced modules','Limited reporting customization','Steep learning curve using all tools','Hard to migrate data to another CRM'],
    best_for_es: 'PYMES que empiezan con CRM y quieren escalar a marketing automation sin cambiar de plataforma.',
    best_for_en: 'SMBs starting with CRM wanting to scale to marketing automation without changing platforms.',
    not_ideal_for_es: 'No si solo necesitas tracking de ventas puro o tienes +1000 empleados con necesidades muy específicas.',
    not_ideal_for_en: 'Not if you need pure sales tracking or have 1000+ employees with very specific needs.',
    founded_year: 2006,
    integrations: ['Slack','Gmail','Outlook','Shopify','WordPress','Stripe','Zoom','LinkedIn'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Gratis', price_monthly: 0, features: ['CRM completo','Contactos ilimitados','Pipeline ventas','Chat en vivo'], limits: '' },
      { name: 'Starter', price_monthly: 15, features: ['Email marketing','Automatización simple','Landing pages'], limits: '1,000 contactos' },
      { name: 'Professional', price_monthly: 800, features: ['Marketing automation','Blog SEO','Reporting avanzado'], limits: '2,000 contactos' },
    ],
  },
  pipedrive: {
    features_es: ['Pipeline visual drag & drop','Seguimiento de emails y llamadas','Automatización de tareas repetitivas','Campos personalizables','Informes y pronósticos de ventas','App móvil completa','Web forms para capturar leads','API abierta'],
    features_en: ['Visual drag & drop pipeline','Email and call tracking','Repetitive task automation','Customizable fields','Sales reports and forecasts','Full mobile app','Web forms for lead capture','Open API'],
    pros_es: ['Enfoque láser en pipeline de ventas','Interfaz muy intuitiva','Buenas automatizaciones','Excelente app móvil'],
    pros_en: ['Laser focus on sales pipeline','Very intuitive interface','Good automations','Excellent mobile app'],
    cons_es: ['Solo CRM de ventas, sin marketing','Precio por usuario se acumula','Reporting avanzado solo en planes altos','Sin plan gratuito real (solo trial)'],
    cons_en: ['Sales-only CRM, no marketing','Per-user pricing adds up','Advanced reporting on higher plans only','No real free plan (trial only)'],
    best_for_es: 'Equipos de ventas B2B que quieren un CRM simple y visual enfocado en pipeline.',
    best_for_en: 'B2B sales teams wanting a simple, visual CRM focused exclusively on pipeline.',
    not_ideal_for_es: 'No si necesitas marketing automation, servicio al cliente o CMS integrado.',
    not_ideal_for_en: 'Not if you need marketing automation, customer service or integrated CMS.',
    founded_year: 2010,
    integrations: ['Google Workspace','Microsoft 365','Slack','Zapier','Trello','Asana','QuickBooks'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Essential', price_monthly: 14, features: ['Pipeline gestión','Contactos','Email tracking'], limits: '3,000 leads' },
      { name: 'Advanced', price_monthly: 34, features: ['Email sync','Automatizaciones','Templates email'], limits: '' },
      { name: 'Professional', price_monthly: 49, features: ['Reporting avanzado','Forecast','Contratos','Soporte 24/7'], limits: '' },
    ],
  },
  semrush: {
    features_es: ['Investigación de keywords avanzada','Auditoría técnica SEO del sitio','Análisis de backlinks','Espionaje de competidores','Content Marketing Toolkit','Plan de PPC y display','Social Media Toolkit','Monitor de marca y posición'],
    features_en: ['Advanced keyword research','Technical site SEO audit','Backlink analysis','Competitor intelligence','Content Marketing Toolkit','PPC and display planning','Social Media Toolkit','Brand and position monitoring'],
    pros_es: ['Suite SEO más completa del mercado','Excelente para espionaje competitivo','Herramientas de contenido muy útiles','Base de datos de keywords enorme'],
    pros_en: ['Most complete SEO suite','Excellent competitive intelligence','Very useful content tools','Massive keyword database'],
    cons_es: ['Muy caro para freelancers (130eur/mes)','Muchas funcionalidades = abrumador','Datos de tráfico no siempre precisos','Curva de aprendizaje larga'],
    cons_en: ['Very expensive for freelancers','Too many features = overwhelming','Traffic data not always accurate','Long learning curve'],
    best_for_es: 'Agencias de marketing y SEOs profesionales que necesitan la suite más completa con datos competitivos.',
    best_for_en: 'Marketing agencies and professional SEOs needing the most complete suite with competitive data.',
    not_ideal_for_es: 'No para bloggers o pequeños negocios con presupuesto limitado.',
    not_ideal_for_en: 'Not for bloggers or small businesses on a tight budget.',
    founded_year: 2008,
    integrations: ['Google Analytics','Google Search Console','Google Ads','Trello','Zapier','Slack'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Pro', price_monthly: 129.95, features: ['5 proyectos','500 keywords','10k resultados/informe'], limits: '' },
      { name: 'Guru', price_monthly: 249.95, features: ['15 proyectos','Content Marketing','Histórico datos'], limits: '' },
      { name: 'Business', price_monthly: 499.95, features: ['40 proyectos','API acceso','White label'], limits: '' },
    ],
  },
  ahrefs: {
    features_es: ['Mayor base de datos de backlinks del mundo','Site Explorer para auditar webs','Keywords Explorer con 11 motores','Site Audit técnico avanzado','Rank Tracker diario','Content Explorer para ideas','Ahrefs Webmaster Tools gratis','Alertas de menciones y backlinks'],
    features_en: ['Largest backlink database','Site Explorer for website auditing','Keywords Explorer with 11 engines','Advanced technical Site Audit','Daily Rank Tracker','Content Explorer for ideas','Free Webmaster Tools','Mention and backlink alerts'],
    pros_es: ['Mejor base de datos de backlinks','UI moderna y rápida','Webmaster Tools gratis','Content Explorer muy útil'],
    pros_en: ['Best backlink database','Modern, fast UI','Free Webmaster Tools','Content Explorer very useful'],
    cons_es: ['Caro (99$/mes mínimo)','Sin herramientas de PPC o social media','Plan Lite muy limitado'],
    cons_en: ['Expensive ($99/month min)','No PPC or social media tools','Lite plan very limited'],
    best_for_es: 'SEOs profesionales que priorizan backlinks y auditoría técnica con la base de datos más completa.',
    best_for_en: 'SEO pros prioritizing backlink analysis and technical audit with the most complete database.',
    not_ideal_for_es: 'No si necesitas PPC, social media o suite todo en uno de marketing digital.',
    not_ideal_for_en: 'Not for those needing PPC, social media tools, or all-in-one digital marketing suite.',
    founded_year: 2011,
    integrations: ['Google Search Console','Google Analytics','Slack','Data Studio'],
    screenshots: [],
    pricing_tiers: [
      { name: 'Lite', price_monthly: 99, features: ['Site Explorer','Keywords Explorer','Site Audit','Rank Tracker'], limits: '5 proyectos' },
      { name: 'Standard', price_monthly: 199, features: ['Content Explorer','Domain Comparison','6 meses histórico'], limits: '' },
      { name: 'Advanced', price_monthly: 399, features: ['API','Looker Studio','2 años histórico'], limits: '' },
    ],
  },
}

// Helper para obtener contenido extendido de una herramienta, con fallback a defaults
export function getToolContent(slug: string): ToolContent {
  return toolContent[slug] || {
    features_es: [], features_en: [], pros_es: [], pros_en: [],
    cons_es: [], cons_en: [], best_for_es: '', best_for_en: '',
    not_ideal_for_es: '', not_ideal_for_en: '', founded_year: null,
    integrations: [], screenshots: [], pricing_tiers: [],
  }
}

export function getToolContentKeys(): string[] {
  return Object.keys(toolContent)
}
