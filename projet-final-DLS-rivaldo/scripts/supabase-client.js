import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://ukydphluwjltsuyjbzay.supabase.co";
const supabaseKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreWRwaGx1d2psdHN1eWpiemF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NTQ1MDUsImV4cCI6MjA4MzUzMDUwNX0.b9hPPqTuZpajF0POAvcyWa_hbXuvLt1hAI7oMUXojtA";

export function creerClientSupabase(stockage) {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storage: stockage
    }
  });
}

export const supabase = creerClientSupabase(localStorage);
