import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qiqvywkviglckiqkfdak.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QKAjtGCVGRlDCIuIgV_9RA_nM4DN7hE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
