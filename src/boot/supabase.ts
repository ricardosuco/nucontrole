import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl: any = process.env.PUBLIC_SUPABASE_URL
const supabaseKey: any = process.env.PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { authUser } = useAuthUser()
  if (event === 'PASSWORD_RECOVERY') authUser.value = null
  else authUser.value = session?.user || null
})

export default function useSupabase() {
  return {
    supabase
  }
}
