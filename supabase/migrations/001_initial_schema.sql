-- ============================================================
-- alt/ SaaS Alternatives Directory — Schema v1.0
-- ============================================================

-- 1. CATEGORIAS
CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name_es         TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  icon            TEXT NOT NULL DEFAULT '📦',
  description_es  TEXT NOT NULL DEFAULT '',
  description_en  TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. HERRAMIENTAS
CREATE TABLE tools (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  logo_url        TEXT,
  description_es  TEXT NOT NULL DEFAULT '',
  description_en  TEXT NOT NULL DEFAULT '',
  category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  price_model     TEXT NOT NULL DEFAULT 'freemium'
                  CHECK (price_model IN ('free', 'freemium', 'paid')),
  price_starting  NUMERIC(8,2),
  website_url     TEXT NOT NULL,
  affiliate_url   TEXT,
  rating_g2       NUMERIC(3,1) CHECK (rating_g2 >= 0 AND rating_g2 <= 5),
  rating_capterra NUMERIC(3,1) CHECK (rating_capterra >= 0 AND rating_capterra <= 5),
  is_open_source  BOOLEAN NOT NULL DEFAULT false,
  is_verified     BOOLEAN NOT NULL DEFAULT false,
  listing_tier    TEXT NOT NULL DEFAULT 'free'
                  CHECK (listing_tier IN ('free', 'featured', 'premium')),
  tags            TEXT[] NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. RELACIONES (quien es alternativa de quien)
CREATE TABLE tool_alternatives (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id         UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  alternative_id  UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  rank            INT NOT NULL DEFAULT 0,
  pros_es         TEXT,
  pros_en         TEXT,
  cons_es         TEXT,
  cons_en         TEXT,
  UNIQUE(tool_id, alternative_id)
);

-- 4. CONTENIDO GENERADO CON IA
CREATE TABLE generated_content (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id           UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE UNIQUE,
  intro_es          TEXT,
  intro_en          TEXT,
  faq_es            JSONB DEFAULT '[]'::jsonb,
  faq_en            JSONB DEFAULT '[]'::jsonb,
  last_generated_at TIMESTAMPTZ
);

-- 5. INDICES
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_listing ON tools(listing_tier);
CREATE INDEX idx_tools_tags ON tools USING GIN (tags);
CREATE INDEX idx_alternatives_tool ON tool_alternatives(tool_id);
CREATE INDEX idx_alternatives_alt ON tool_alternatives(alternative_id);
CREATE INDEX idx_generated_tool ON generated_content(tool_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- 6. FUNCION para updated_at automatico
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();
