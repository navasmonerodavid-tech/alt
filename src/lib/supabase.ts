import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not set. Using mock data.')
}

export const supabase = createClient<Database>(
  supabaseUrl || 'http://localhost:54321',
  supabaseKey || 'placeholder-key'
)
