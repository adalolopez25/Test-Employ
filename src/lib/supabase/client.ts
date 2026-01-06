// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export const getSupabaseBrowser = (): ReturnType<typeof createBrowserClient<Database>> => {
  if (typeof window === 'undefined') {
    throw new Error('getSupabaseBrowser() solo en cliente')
  }
  
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  
  return browserClient
}