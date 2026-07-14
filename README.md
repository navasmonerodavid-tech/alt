# alt/ — SaaS Alternatives Directory / Directorio de Alternativas SaaS

[English](#english) | [Español](#español)

---

<a name="english"></a>
# English 🇬🇧

`alt/` is an ultra-fast, modern, and open-source directory designed to help users find the best SaaS alternatives. It features AI-powered automated comparisons, localized content, and real-time listings with a beautiful green-and-cream aesthetic. 

🚀 **Live site:** [alt-dusky.vercel.app](https://alt-dusky.vercel.app/)

---

## ✨ Features

- **Double-language routing:** Structured multilingual setup with Spanish routes (e.g. `/alternativas-a/notion`) and English routes (e.g. `/en/alternatives-to/notion`).
- **AI-Powered comparisons:** Integrates Groq SDK (`llama-3.3-70b-versatile` model) to automatically generate descriptions, pros, cons, and localized FAQs.
- **Hybrid Data Fetching:** Fast Static Site Generation (SSG) with automatic mock data fallbacks (`src/lib/seed-data.ts`) when connection keys are absent.
- **Interactive Multi-language Search:** Real-time search engine component written in React 19.
- **Sponsorship integration:** Pre-configured with Polar.sh for paid listing integrations and Resend for custom tool suggestion workflows.
- **Ultra-fast hosting:** Built with Astro 6.x and optimized for static hosting via the Vercel adapter.

---

## 🛠️ Tech Stack

- **Framework:** [Astro 6.3.3](https://astro.build/) (Static Output Mode)
- **Styling:** [Tailwind CSS v4.0](https://tailwindcss.com/) (using the new `@tailwindcss/vite` plugin)
- **Components:** [React 19](https://react.dev/) (Client-side interactive UI components)
- **Database:** [Supabase (Postgres)](https://supabase.com/)
- **AI API:** [Groq Cloud SDK](https://groq.com/) (`llama-3.3-70b-versatile`)
- **Emails:** [Resend](https://resend.com/)
- **Monetization:** [Polar.sh](https://polar.sh/)
- **Deployment:** [Vercel](https://vercel.com/) (using `@astrojs/vercel` adapter)

---

## 📂 Project Structure

```text
alt/
├── public/                  # Static assets (favicons, logos)
├── scripts/                 # Utility scripts (database seed)
│   └── seed.mjs             # Populates Supabase with categories, tools, and AI comparisons
├── src/
│   ├── assets/              # SVG and media assets
│   ├── components/          # Reusable Astro/React UI components (SearchBar, ToolCard, FAQ...)
│   ├── layouts/             # Page layouts (BaseLayout)
│   ├── lib/                 # Core utilities, Supabase client, and Groq SDK configurations
│   ├── pages/               # Routing directories
│   │   ├── alternativas-a/  # Spanish alternative pages
│   │   ├── blog/            # Spanish blog
│   │   ├── comparar/        # Spanish VS tool comparison pages
│   │   ├── en/              # English pages (mirrored structures: tools, alternatives-to)
│   │   ├── herramientas/    # Spanish category listings
│   │   ├── legal/           # Legal terms
│   │   ├── index.astro      # Spanish home page
│   │   └── robots.txt.ts    # Dynamic robots.txt
│   └── styles/              # Global styles & custom design theme overrides (global.css)
├── supabase/
│   └── migrations/          # SQL files defining the DB tables, indexes, and constraints
└── package.json
```

---

## 🗄️ Database Schema

The database is built on Supabase with the following schema:

### `categories`
Stores tool categories (e.g. Design, Project Management).
- `id` (UUID, PK)
- `slug` (TEXT, Unique)
- `name_es` / `name_en` (TEXT)
- `icon` (TEXT)
- `description_es` / `description_en` (TEXT)

### `tools`
Stores the SaaS tools listed in the directory.
- `id` (UUID, PK)
- `slug` (TEXT, Unique)
- `name` (TEXT)
- `logo_url` (TEXT)
- `description_es` / `description_en` (TEXT)
- `category_id` (UUID, FK -> `categories.id`)
- `price_model` (TEXT: `'free'`, `'freemium'`, `'paid'`)
- `price_starting` (NUMERIC)
- `website_url` / `affiliate_url` (TEXT)
- `rating_g2` / `rating_capterra` (NUMERIC)
- `is_open_source` / `is_verified` (BOOLEAN)
- `listing_tier` (TEXT: `'free'`, `'featured'`, `'premium'`)
- `tags` (TEXT[])

### `tool_alternatives`
Manages the relationships mapping tools to their direct alternatives.
- `id` (UUID, PK)
- `tool_id` (UUID, FK -> `tools.id`)
- `alternative_id` (UUID, FK -> `tools.id`)
- `rank` (INT)
- `pros_es` / `pros_en` / `cons_es` / `cons_en` (TEXT)

### `generated_content`
Stores AI-generated localized descriptions and FAQs.
- `id` (UUID, PK)
- `tool_id` (UUID, FK -> `tools.id`, Unique)
- `intro_es` / `intro_en` (TEXT)
- `faq_es` / `faq_en` (JSONB)
- `last_generated_at` (TIMESTAMPTZ)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** `>= 22.12.0`
- A **Supabase** account and project.
- A **Groq Cloud** API key (optional for local mock data, required for database seeding).

### 2. Environment Variables Setup
Copy the example environment file:
```bash
cp .env.example .env
```
Fill in the credentials in `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

RESEND_API_KEY=re_xxxxx
RESEND_FROM=alt@altsaas.com

POLAR_ACCESS_TOKEN=polar_xxx
POLAR_ORGANIZATION_ID=xxx

GROQ_API_KEY=gsk_xxxxx

SITE_URL=https://alt-dusky.vercel.app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Seeding
Execute the SQL migrations located in `supabase/migrations` inside your Supabase project's SQL editor.

To seed the database with categories, tools, and dynamically generated AI descriptions:
```bash
npm run seed
```

### 5. Running Locally
Run the development environment:
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

---

<a name="español"></a>
# Español 🇪🇸

`alt/` es un directorio moderno, ultra rápido y de código abierto diseñado para ayudar a los usuarios a encontrar las mejores alternativas a herramientas SaaS. Cuenta con comparativas automatizadas con inteligencia artificial, soporte multilenguaje y un diseño minimalista y elegante en tonos crema y verde.

🚀 **Web en producción:** [alt-dusky.vercel.app](https://alt-dusky.vercel.app/)

---

## ✨ Características principales

- **Ruteo multilenguaje estructurado:** Configuración nativa que soporta rutas en español (ej. `/alternativas-a/notion`) y rutas en inglés (ej. `/en/alternatives-to/notion`).
- **Comparativas asistidas por IA:** Integra el SDK de Groq (`llama-3.3-70b-versatile`) para generar de forma controlada descripciones cortas, pros/contras y FAQs localizadas.
- **Datos Híbridos con Fallbacks:** Generación estática (SSG) de alto rendimiento. En ausencia de llaves de base de datos, el proyecto utiliza datos simulados localmente en `src/lib/seed-data.ts`.
- **Buscador interactivo:** Barra de búsqueda en tiempo real e instantánea construida en React 19.
- **Integración comercial:** Soporte preconfigurado para patrocinadores mediante Polar.sh y envío automatizado de correos con Resend para el formulario de sugerencias.
- **Despliegue optimizado:** Optimizado para Astro 6.x y desplegado estáticamente usando el adaptador oficial de Vercel.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Astro 6.3.3](https://astro.build/) (Modo salida estática)
- **Estilos:** [Tailwind CSS v4.0](https://tailwindcss.com/) (usando el nuevo plugin `@tailwindcss/vite`)
- **Componentes:** [React 19](https://react.dev/) (Componentes dinámicos cliente)
- **Base de Datos:** [Supabase (Postgres)](https://supabase.com/)
- **API de IA:** [Groq Cloud SDK](https://groq.com/) (`llama-3.3-70b-versatile`)
- **Correos:** [Resend](https://resend.com/)
- **Monetización:** [Polar.sh](https://polar.sh/)
- **Despliegue:** [Vercel](https://vercel.com/) (vía adaptador `@astrojs/vercel`)

---

## 📂 Estructura del Proyecto

```text
alt/
├── public/                  # Archivos estáticos (favicons, logos)
├── scripts/                 # Scripts auxiliares (carga de base de datos)
│   └── seed.mjs             # Popula Supabase con categorías, herramientas y comparativas por IA
├── src/
│   ├── assets/              # Archivos SVG y multimedia
│   ├── components/          # Componentes UI reusables Astro/React (SearchBar, ToolCard, FAQ...)
│   ├── layouts/             # Plantillas base (BaseLayout)
│   ├── lib/                 # Utilidades clave, cliente Supabase y configuración de Groq
│   ├── pages/               # Directorios de ruteo principal
│   │   ├── alternativas-a/  # Páginas de alternativas en español
│   │   ├── blog/            # Blog en español
│   │   ├── comparar/        # Comparativas directas VS (ej. A-vs-B) en español
│   │   ├── en/              # Páginas en inglés (tools, alternatives-to)
│   │   ├── herramientas/    # Listados por categorías en español
│   │   ├── legal/           # Textos legales
│   │   ├── index.astro      # Página de inicio en español
│   │   └── robots.txt.ts    # Generación de robots.txt
│   └── styles/              # Estilos globales y variables de color custom (global.css)
├── supabase/
│   └── migrations/          # Archivos SQL para estructurar la DB
└── package.json
```

---

## 🗄️ Esquema de Base de Datos

La base de datos en Supabase se compone de las siguientes tablas principales:

### `categories`
Almacena las distintas categorías de software (ej. Diseño, Gestión de Proyectos).
- `id` (UUID, PK)
- `slug` (TEXT, Único)
- `name_es` / `name_en` (TEXT)
- `icon` (TEXT)
- `description_es` / `description_en` (TEXT)

### `tools`
Almacena las herramientas SaaS listadas en el directorio.
- `id` (UUID, PK)
- `slug` (TEXT, Único)
- `name` (TEXT)
- `logo_url` (TEXT)
- `description_es` / `description_en` (TEXT)
- `category_id` (UUID, FK -> `categories.id`)
- `price_model` (TEXT: `'free'`, `'freemium'`, `'paid'`)
- `price_starting` (NUMERIC)
- `website_url` / `affiliate_url` (TEXT)
- `rating_g2` / `rating_capterra` (NUMERIC)
- `is_open_source` / `is_verified` (BOOLEAN)
- `listing_tier` (TEXT: `'free'`, `'featured'`, `'premium'`)
- `tags` (TEXT[])

### `tool_alternatives`
Gestiona la relación de equivalencias entre herramientas (quién es alternativa de quién).
- `id` (UUID, PK)
- `tool_id` (UUID, FK -> `tools.id`)
- `alternative_id` (UUID, FK -> `tools.id`)
- `rank` (INT)
- `pros_es` / `pros_en` / `cons_es` / `cons_en` (TEXT)

### `generated_content`
Almacena el contenido auto-generado por IA y FAQs traducidos.
- `id` (UUID, PK)
- `tool_id` (UUID, FK -> `tools.id`, Único)
- `intro_es` / `intro_en` (TEXT)
- `faq_es` / `faq_en` (JSONB)
- `last_generated_at` (TIMESTAMPTZ)

---

## 🚀 Instalación y Uso Local

### 1. Requisitos
- **Node.js:** `>= 22.12.0`
- Cuenta activa en **Supabase** con un proyecto creado.
- Clave de API de **Groq Cloud** (opcional para desarrollo básico con mocks, requerida para poblar la DB).

### 2. Configuración de Variables de Entorno
Duplica el archivo de ejemplo:
```bash
cp .env.example .env
```
Introduce tus credenciales en el archivo `.env`:
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

RESEND_API_KEY=re_xxxxx
RESEND_FROM=alt@altsaas.com

POLAR_ACCESS_TOKEN=polar_xxx
POLAR_ORGANIZATION_ID=xxx

GROQ_API_KEY=gsk_xxxxx

SITE_URL=https://alt-dusky.vercel.app
```

### 3. Instalación de Dependencias
```bash
npm install
```

### 4. Estructuración y Carga de Datos (Seed)
Ejecuta las migraciones SQL contenidas en `supabase/migrations` dentro del editor SQL de tu panel de Supabase.

Para rellenar la base de datos con las categorías predefinidas, herramientas y generar automáticamente el contenido con IA (Groq):
```bash
npm run seed
```

### 5. Iniciar en Desarrollo
```bash
npm run dev
```
Accede a [http://localhost:4321](http://localhost:4321) en tu navegador web.
