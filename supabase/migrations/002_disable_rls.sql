-- ============================================================
-- RLS Policies — Permitir inserts con anon key para desarrollo
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Deshabilitar RLS temporalmente en las 4 tablas
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
ALTER TABLE tool_alternatives DISABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content DISABLE ROW LEVEL SECURITY;
