import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://hlpszstbsjqbevyqqrql.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscHN6c3Ric2pxYmV2eXFxcnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMDc0MjEsImV4cCI6MjEwMTY4MzQyMX0.sVf1ih_K_isqb05ap5SqA4OwJNNtte0DceAxdpnTfec";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);