/**
 * Seed script — Puebla Supabase con datos iniciales
 * Se ejecuta como endpoint de API o manualmente.
 *
 * Uso:
 * - GET /api/seed → crea tablas y datos (requiere SERVICE_ROLE_KEY en .env)
 * - Se ejecuta una sola vez. Usa ON CONFLICT DO NOTHING para no duplicar.
 */

import { supabase } from './supabase'
import { categories as mockCategories, tools as mockTools } from './seed-data'
import { generateAllContentForTool } from './groq'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const results: string[] = []
  let status = 200

  try {
    // 1. Insertar categorias
    results.push('Seeding categories...')
    for (const cat of mockCategories) {
      const { error } = await supabase.from('categories').upsert({
        id: cat.id,
        slug: cat.slug,
        name_es: cat.name_es,
        name_en: cat.name_en,
        icon: cat.icon,
        description_es: cat.description_es,
        description_en: cat.description_en,
      }, { onConflict: 'slug' })

      if (error) {
        results.push(`  ⚠️ Category ${cat.slug}: ${error.message}`)
      } else {
        results.push(`  ✅ ${cat.slug}`)
      }
    }

    // 2. Insertar herramientas
    results.push('Seeding tools...')
    let toolCount = 0
    for (const tool of mockTools) {
      const { alternatives, ...toolData } = tool
      const { error } = await supabase.from('tools').upsert(toolData, { onConflict: 'slug' })

      if (error) {
        results.push(`  ⚠️ Tool ${tool.slug}: ${error.message}`)
      } else {
        toolCount++
        if (toolCount % 10 === 0) results.push(`  ✅ ${toolCount} tools inserted...`)
      }

      // Insertar relaciones de alternativas
      if (alternatives && alternatives.length > 0) {
        for (const alt of alternatives) {
          const altTool = mockTools.find(t => t.slug === alt.alternative_slug)
          if (!altTool) continue

          const { error: relError } = await supabase.from('tool_alternatives').upsert({
            tool_id: tool.id,
            alternative_id: altTool.id,
            rank: alt.rank,
          }, { onConflict: 'tool_id,alternative_id' })

          if (relError) {
            results.push(`  ⚠️ Relation ${tool.slug}→${alt.alternative_slug}: ${relError.message}`)
          }
        }
      }
    }
    results.push(`  ✅ ${toolCount} tools total`)

    // 3. Generar contenido con Groq
    results.push('Generating AI content (Groq)...')
    const groqApiKey = import.meta.env.GROQ_API_KEY
    if (!groqApiKey) {
      results.push('  ⚠️ GROQ_API_KEY not set. Skipping AI content.')
    } else {
      let contentCount = 0
      for (const tool of mockTools.slice(0, 5)) { // Solo 5 para no saturar el rate limit
        const cat = mockCategories.find(c => c.id === tool.category_id)
        if (!cat) continue

        try {
          const content = await generateAllContentForTool(
            tool.name,
            cat.name_es,
            cat.name_en,
            tool.price_model,
            tool.is_open_source
          )

          const { error } = await supabase.from('generated_content').upsert({
            tool_id: tool.id,
            intro_es: content.intro_es,
            intro_en: content.intro_en,
            faq_es: content.faq_es,
            faq_en: content.faq_en,
            last_generated_at: new Date().toISOString(),
          }, { onConflict: 'tool_id' })

          if (error) {
            results.push(`  ⚠️ Content for ${tool.slug}: ${error.message}`)
          } else {
            contentCount++
            results.push(`  ✅ Content generated for ${tool.slug}`)
          }
        } catch (err) {
          results.push(`  ❌ Content for ${tool.slug}: ${(err as Error).message}`)
        }

        // Pequena pausa para respetar rate limit
        await new Promise(r => setTimeout(r, 2000))
      }
      results.push(`  ✅ ${contentCount}/5 content generated`)
    }

    results.push('\n🎉 Seed complete!')
  } catch (err) {
    status = 500
    results.push(`❌ Fatal error: ${(err as Error).message}`)
  }

  return new Response(results.join('\n'), {
    status,
    headers: { 'Content-Type': 'text/plain' },
  })
}
