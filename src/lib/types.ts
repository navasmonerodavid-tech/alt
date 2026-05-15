export interface Category {
  id: string
  slug: string
  name_es: string
  name_en: string
  icon: string
  description_es: string
  description_en: string
}

export interface Tool {
  id: string
  slug: string
  name: string
  logo_url: string
  description_es: string
  description_en: string
  category_id: string
  price_model: 'free' | 'freemium' | 'paid'
  price_starting: number | null
  website_url: string
  affiliate_url: string | null
  rating_g2: number | null
  rating_capterra: number | null
  is_open_source: boolean
  is_verified: boolean
  listing_tier: 'free' | 'featured' | 'premium'
  tags: string[]
  created_at: string
  updated_at: string
}

export interface ToolAlternative {
  id: string
  tool_id: string
  alternative_id: string
  rank: number
  pros_es: string | null
  pros_en: string | null
  cons_es: string | null
  cons_en: string | null
}

export interface GeneratedContent {
  id: string
  tool_id: string
  intro_es: string | null
  intro_en: string | null
  faq_es: FAQ[] | null
  faq_en: FAQ[] | null
  last_generated_at: string | null
}

export interface FAQ {
  question: string
  answer: string
}

export interface ToolWithAlternatives extends Tool {
  alternatives: (Tool & {
    rank: number
    pros_es: string | null
    pros_en: string | null
    cons_es: string | null
    cons_en: string | null
  })[]
  content: GeneratedContent | null
  category: Category | null
}
