# 📦 Sistema de Publicidad para alt/

## Estado actual: **DESACTIVADO** ✅

Los anuncios y banners publicitarios están **ocultos por defecto**. La página es completamente gratuita y limpia para todos los usuarios.

---

## 🚀 Cómo activar la publicidad

Cuando quieras monetizar tu sitio con Google AdSense, sigue estos pasos:

### 1. Obtén tu cuenta de Google AdSense

1. Regístrate en [Google AdSense](https://www.google.com/adsense)
2. Añade tu dominio
3. Espera la aprobación (puede tardar varios días)
4. Una vez aprobado, obtendrás tu **Publisher ID** (ej: `ca-pub-1234567890`)

### 2. Configura las variables de entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local
PUBLIC_ADS_ENABLED=true
PUBLIC_ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXXXXXX"
```

### 3. Activa los banners en las páginas

Edita el layout principal o las páginas donde quieras mostrar anuncios:

**Opción A: Activar en todo el sitio (recomendado)**

En `/workspace/src/layouts/BaseLayout.astro`, cambia:

```astro
<BaseLayout ... showAds={true}>
```

**Opción B: Activar solo en páginas específicas**

En cada página que quieras monetizar:

```astro
<BaseLayout ... showAds={true}>
  <!-- Contenido de la página -->
</BaseLayout>
```

### 4. Inserta los slots de anuncios

Los componentes ya están creados y listos para usar:

#### Banner superior e inferior (automáticos)
Se muestran automáticamente cuando `showAds={true}` en el layout.

#### Anuncios inline en el contenido

```astro
import AdSlot from '@/components/AdSlot.astro'

<!-- Anuncio horizontal después del hero -->
<AdSlot slot="1234567890" format="horizontal" />

<!-- Anuncio rectangular en sidebar -->
<AdSlot slot="0987654321" format="rectangle" class="my-4" />

<!-- Anuncio vertical -->
<AdSlot slot="1122334455" format="vertical" />
```

---

## 📋 Componentes disponibles

### `AdBanner.astro`
Banner sticky en la parte superior o inferior de la página.

**Props:**
- `slot` (required): ID del slot de AdSense
- `position`: `'top'` | `'bottom'` | `'sidebar'` (default: `'top'`)
- `class`: Clases CSS adicionales
- `label`: Texto para el placeholder (desarrollo)

**Ejemplo:**
```astro
<AdBanner slot="1234567890" position="top" />
```

### `AdSlot.astro`
Espacio publicitario flexible para insertar en cualquier lugar.

**Props:**
- `slot` (required): ID del slot de AdSense
- `format`: `'auto'` | `'horizontal'` | `'rectangle'` | `'vertical'` | `'banner'` (default: `'auto'`)
- `class`: Clases CSS adicionales
- `label`: Texto para el placeholder (desarrollo)

**Ejemplo:**
```astro
<AdSlot slot="0987654321" format="rectangle" />
```

---

## 🎨 Modos de visualización

### 🔒 Modo desactivado (por defecto)
- `PUBLIC_ADS_ENABLED=false` o no definido
- **No se muestra ningún anuncio**
- Los componentes renderizan un `<div class="hidden">` vacío
- Ideal para desarrollo y producción sin ads

### 🧪 Modo desarrollo (placeholder)
- `PUBLIC_ADS_ENABLED=true`
- `PUBLIC_ADSENSE_CLIENT` no definido o vacío
- Muestra un **placeholder visual** con bordes discontinuos
- Perfecto para diseñar la ubicación de anuncios antes de la aprobación

### ✅ Modo producción (anuncios reales)
- `PUBLIC_ADS_ENABLED=true`
- `PUBLIC_ADSENSE_CLIENT="ca-pub-XXXXX"`
- Carga el script de Google AdSense
- Muestra anuncios reales a los usuarios

---

## 📍 Ubicaciones recomendadas

### Página de inicio (`index.astro`)
```astro
<!-- Después del hero section -->
<AdSlot slot="1234567890" format="horizontal" />

<!-- Entre categorías y herramientas destacadas -->
<AdSlot slot="0987654321" format="rectangle" />
```

### Página de herramienta (`herramienta/[slug].astro`)
```astro
<!-- En el sidebar -->
<div class="space-y-6">
  <AdSlot slot="1122334455" format="rectangle" class="mb-6" />
  
  <div class="bg-white border...">
    <!-- Datos rápidos -->
  </div>
</div>

<!-- Después de las alternativas -->
<AdSlot slot="5544332211" format="horizontal" />
```

### Página de categoría (`herramientas/[categoria].astro`)
```astro
<!-- Después del header -->
<AdSlot slot="6677889900" format="horizontal" />

<!-- Entre herramientas (cada 5-10 items) -->
{tools.map((tool, index) => (
  <>
    <ToolCard {...tool} />
    {index === 4 && <AdSlot slot="9988776655" format="horizontal" />}
  </>
))}
```

---

## ⚠️ Consideraciones importantes

1. **Rendimiento**: Los anuncios pueden afectar el Core Web Vitals. Monitoriza LCP y CLS.

2. **Experiencia de usuario**: No abuses de los anuncios. Máximo 3-4 por página.

3. **Políticas de AdSense**: 
   - No hagas clic en tus propios anuncios
   - Respeta las políticas de contenido de Google
   - Añade las páginas legales requeridas (privacidad, cookies)

4. **GDPR/Privacidad**: Si tienes tráfico europeo, necesitarás:
   - Banner de consentimiento de cookies
   - Política de privacidad actualizada
   - Gestión de consentimiento para ads personalizados

---

## 🛠️ Desarrollo y testing

### Verificar que los anuncios están ocultos
```bash
npm run dev
# Visita cualquier página - no deberías ver anuncios
```

### Verificar placeholders
```bash
# .env.local
PUBLIC_ADS_ENABLED=true

npm run dev
# Deberías ver recuadros discontinuos grises
```

### Verificar configuración real
```bash
# .env.local
PUBLIC_ADS_ENABLED=true
PUBLIC_ADSENSE_CLIENT="ca-pub-test123456789"

npm run dev
# Inspecciona el HTML - deberías ver <ins class="adsbygoogle">
```

---

## 📊 Variables de entorno

| Variable | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `PUBLIC_ADS_ENABLED` | boolean | `false` | Activa/desactiva todo el sistema de ads |
| `PUBLIC_ADSENSE_CLIENT` | string | `""` | Tu Publisher ID de Google AdSense |

---

## 📝 Checklist de lanzamiento

- [ ] Dominio aprobado en AdSense
- [ ] Publisher ID obtenido
- [ ] Variables de entorno configuradas
- [ ] `showAds={true}` en las páginas deseadas
- [ ] Slots de anuncios insertados estratégicamente
- [ ] Política de privacidad actualizada
- [ ] Banner de cookies implementado (si es necesario)
- [ ] Testing en móvil y desktop
- [ ] Monitoring de rendimiento activado

---

**Hecho con ❤️ para alt/**

Última actualización: 2026-08-09
