import { createClient } from '@supabase/supabase-js'

const supabaseUrl: any = process.env.PUBLIC_SUPABASE_URL
const supabaseKey: any = process.env.PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function useSupabase() {
  return {
    supabase
  }
}
