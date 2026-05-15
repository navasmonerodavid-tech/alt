export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name_es: string
          name_en: string
          icon: string
          description_es: string
          description_en: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      tools: {
        Row: {
          id: string
          slug: string
          name: string
          logo_url: string | null
          description_es: string
          description_en: string
          category_id: string
          price_model: string
          price_starting: number | null
          website_url: string
          affiliate_url: string | null
          rating_g2: number | null
          rating_capterra: number | null
          is_open_source: boolean
          is_verified: boolean
          listing_tier: string
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tools']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['tools']['Insert']>
      }
      tool_alternatives: {
        Row: {
          id: string
          tool_id: string
          alternative_id: string
          rank: number
          pros_es: string | null
          pros_en: string | null
          cons_es: string | null
          cons_en: string | null
        }
        Insert: Omit<Database['public']['Tables']['tool_alternatives']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['tool_alternatives']['Insert']>
      }
      generated_content: {
        Row: {
          id: string
          tool_id: string
          intro_es: string | null
          intro_en: string | null
          faq_es: Record<string, unknown> | null
          faq_en: Record<string, unknown> | null
          last_generated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['generated_content']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['generated_content']['Insert']>
      }
    }
  }
}
