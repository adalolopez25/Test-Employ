// types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      // ... aquí irán todas tus tablas
    }
    Views: {
      [key: string]: {
        Row: {
          [key: string]: unknown
        }
        Insert?: never
        Update?: never
      }
    }
    Functions: {
      // tus functions si las tienes
    }
    Enums: {
      // tus enums si los tienes
    }
  }
}