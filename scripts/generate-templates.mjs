import fs from 'fs'

const seedSrc = fs.readFileSync('src/lib/seed-data.ts', 'utf8')

// Categories with templates
const cats = []
const catRegex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*name_es:\s*'([^']+)',\s*name_en:\s*'([^']+)'/g
let catMatch
while ((catMatch = catRegex.exec(seedSrc)) !== null) {
  cats.push({ id: catMatch[1], slug: catMatch[2], name_es: catMatch[3], name_en: catMatch[4] })
}

// Category-specific intro templates
const categoryIntros = {
  'cat-1': { es: 'gestión de proyectos y organización de tareas', en: 'project management and task organization' },
  'cat-2': { es: 'diseño gráfico y creación visual', en: 'graphic design and visual creation' },
  'cat-3': { es: 'comunicación en equipo y mensajería', en: 'team communication and messaging' },
  'cat-4': { es: 'gestión de relaciones con clientes (CRM)', en: 'customer relationship management (CRM)' },
  'cat-5': { es: 'email marketing y automatización de correos', en: 'email marketing and automation' },
  'cat-6': { es: 'analítica web y datos', en: 'web analytics and data' },
  'cat-7': { es: 'desarrollo de software y herramientas para programadores', en: 'software development and developer tools' },
  'cat-8': { es: 'finanzas y contabilidad', en: 'finance and accounting' },
  'cat-9': { es: 'recursos humanos y gestión de personal', en: 'human resources and people management' },
  'cat-10': { es: 'desarrollo no-code y automatización', en: 'no-code development and automation' },
  'cat-11': { es: 'ciberseguridad y protección de datos', en: 'cybersecurity and data protection' },
  'cat-12': { es: 'productividad personal y gestión del tiempo', en: 'personal productivity and time management' },
  'cat-13': { es: 'comercio electrónico y ventas online', en: 'e-commerce and online sales' },
  'cat-14': { es: 'atención al cliente y soporte', en: 'customer service and support' },
  'cat-15': { es: 'marketing digital y crecimiento', en: 'digital marketing and growth' },
  'cat-16': { es: 'inteligencia artificial y machine learning', en: 'artificial intelligence and machine learning' },
  'cat-17': { es: 'gestión de contenido y CMS', en: 'content management and CMS' },
  'cat-18': { es: 'edición de video y producción multimedia', en: 'video editing and multimedia production' },
  'cat-19': { es: 'bases de datos y almacenamiento', en: 'databases and storage' },
  'cat-20': { es: 'gestión legal y documentación', en: 'legal management and documentation' },
}

function getIntro(cat, toolName, os, lang) {
  const domain = categoryIntros[cat] || { es: 'software y herramientas digitales', en: 'software and digital tools' }
  const osMention = os ? (lang === 'es' ? ' También hay alternativas de código abierto que ofrecen total transparencia y sin costes de licencia.' : ' There are also open-source alternatives offering full transparency and no licensing costs.') : ''
  if (lang === 'es') {
    return `${toolName} es una herramienta popular de ${domain.es}. Sin embargo, cada usuario y equipo tiene necesidades diferentes: algunos buscan opciones más económicas, otros necesitan funcionalidades específicas que ${toolName} no ofrece, y muchos simplemente quieren explorar el mercado antes de comprometerse. En esta página analizamos las mejores alternativas a ${toolName} disponibles actualmente, comparando precios, funcionalidades y casos de uso para ayudarte a encontrar la herramienta que mejor se adapte a ti.${osMention}`
  }
  return `${toolName} is a popular ${domain.en} tool. However, every user and team has different needs: some look for more affordable options, others need specific features that ${toolName} doesn't offer, and many simply want to explore the market before committing. On this page, we analyze the best ${toolName} alternatives currently available, comparing pricing, features, and use cases to help you find the tool that best fits your needs.${osMention}`
}

function getFAQs(cat, toolName, priceModel, os, lang) {
  const isEs = lang === 'es'
  const domain = categoryIntros[cat] || { es: 'software', en: 'software' }
  const fieldEn = domain.en
  const fieldEs = domain.es

  const questions = [
    {
      q: isEs ? `¿Cuál es la mejor alternativa gratuita a ${toolName}?` : `What's the best free ${toolName} alternative?`,
      a: isEs ? `Existen varias opciones gratuitas de ${fieldEs} que pueden sustituir a ${toolName}. La mejor dependerá de tus necesidades concretas: algunas ofrecen funcionalidades limitadas pero suficientes para equipos pequeños, mientras que otras son completamente gratuitas y de código abierto. Explora nuestra lista para encontrarlas.` : `There are several free ${fieldEn} options that can replace ${toolName}. The best one depends on your specific needs: some offer limited but sufficient features for small teams, while others are completely free and open-source. Explore our list to find them.`
    },
    {
      q: isEs ? `¿Vale la pena pagar por ${toolName} o hay alternativas mejores?` : `Is ${toolName} worth paying for or are there better alternatives?`,
      a: isEs ? `Depende de tu caso de uso. ${toolName} es una herramienta consolidada con buenas funcionalidades, pero muchas alternativas ofrecen características similares a un precio más competitivo o incluso gratis. Analiza tus necesidades reales y compara antes de decidir.` : `It depends on your use case. ${toolName} is a well-established tool with good features, but many alternatives offer similar capabilities at a more competitive price or even for free. Analyze your actual needs and compare before deciding.`
    },
    {
      q: isEs ? `¿Es fácil migrar de ${toolName} a otra herramienta?` : `Is it easy to migrate from ${toolName} to another tool?`,
      a: isEs ? `La mayoría de las alternativas ofrecen herramientas de importación para facilitar la migración desde ${toolName}. Puedes exportar tus datos en formatos estándar (CSV, JSON) y el proceso suele ser bastante directo. Algunas herramientas incluso ofrecen asistencia personalizada para la migración.` : `Most alternatives offer import tools to facilitate migration from ${toolName}. You can export your data in standard formats (CSV, JSON) and the process is usually straightforward. Some tools even offer personalized migration assistance.`
    },
    {
      q: os
        ? (isEs ? `¿Qué ventajas tiene elegir una alternativa open source a ${toolName}?` : `What are the advantages of choosing an open-source alternative to ${toolName}?`)
        : (isEs ? `¿Cómo elegir la mejor alternativa a ${toolName} para mi equipo?` : `How to choose the best ${toolName} alternative for my team?`),
      a: os
        ? (isEs ? `Las alternativas open source a ${toolName} ofrecen total transparencia, sin costes de licencia, posibilidad de personalizar el código, y control total sobre tus datos. Son ideales si tu equipo tiene conocimientos técnicos y valora la independencia tecnológica.` : `Open-source alternatives to ${toolName} offer full transparency, no licensing costs, code customization possibilities, and total control over your data. They're ideal if your team has technical knowledge and values technological independence.`)
        : (isEs ? `Define primero qué funcionalidades son imprescindibles para tu equipo, establece un presupuesto y prueba las opciones con versiones gratuitas o trials. Las mejores alternativas suelen ser aquellas que mejor se adaptan a tu flujo de trabajo existente, no las que tienen más funcionalidades.` : `First define which features are essential for your team, set a budget, and test options with free versions or trials. The best alternatives are usually those that best fit your existing workflow, not those with the most features.`)
    },
    {
      q: isEs ? `¿Hay alternativas a ${toolName} que funcionen sin conexión a internet?` : `Are there ${toolName} alternatives that work offline?`,
      a: isEs ? `Sí, varias alternativas ofrecen modo offline o son aplicaciones de escritorio que funcionan sin conexión. Esto es especialmente útil si trabajas desde lugares con conectividad limitada o prefieres tener control total sobre tus archivos locales.` : `Yes, several alternatives offer offline mode or are desktop applications that work without an internet connection. This is especially useful if you work from places with limited connectivity or prefer full control over your local files.`
    },
  ]

  return questions
}

const tools = []
const toolRegex = /id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?category_id:\s*'([^']+)',\s*price_model:\s*'([^']+)',[\s\S]*?is_open_source:\s*(true|false)/g
let toolMatch
while ((toolMatch = toolRegex.exec(seedSrc)) !== null) {
  tools.push({
    id: toolMatch[1], slug: toolMatch[2], name: toolMatch[3],
    category_id: toolMatch[4], price_model: toolMatch[5],
    is_open_source: toolMatch[6] === 'true'
  })
}

const contentPath = 'src/lib/content-data.ts'
const existingContent = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, 'utf8') : ''
const existingContentIds = new Set()
const idRegex = /tool_id:\s*'([^']+)'/g
let idMatch
while ((idMatch = idRegex.exec(existingContent)) !== null) {
  existingContentIds.add(idMatch[1])
}

const pending = tools.filter(t => !existingContentIds.has(t.id))
console.log(`Total: ${tools.length} | Done: ${existingContentIds.size} | Pending: ${pending.length}`)

if (pending.length === 0) { console.log('All done!'); process.exit(0) }

function escape(str) {
  return String(str).replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

let fileContent = existingContent
for (const t of pending) {
  const cat = t.category_id
  const priceModel = t.price_model
  const os = t.is_open_source

  const introEs = escape(getIntro(cat, t.name, os, 'es'))
  const introEn = escape(getIntro(cat, t.name, os, 'en'))
  const faqsEs = getFAQs(cat, t.name, priceModel, os, 'es')
  const faqsEn = getFAQs(cat, t.name, priceModel, os, 'en')

  const faqEs = faqsEs.map(f => `      { question: \`${escape(f.q)}\`, answer: \`${escape(f.a)}\` }`).join(',\n')
  const faqEn = faqsEn.map(f => `      { question: \`${escape(f.q)}\`, answer: \`${escape(f.a)}\` }`).join(',\n')

  const entry = `  {
    tool_id: '${t.id}',
    intro_es: \`${introEs}\`,
    intro_en: \`${introEn}\`,
    faq_es: [
${faqEs}
    ],
    faq_en: [
${faqEn}
    ],
  },`

  fileContent = fileContent.replace('];', entry + '\n];')
}

fs.writeFileSync(contentPath, fileContent, 'utf8')
console.log(`Generated ${pending.length} template entries. Total: ${existingContentIds.size + pending.length}`)
