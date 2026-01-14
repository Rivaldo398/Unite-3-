// Connexion à Supabase
const supabaseUrl = "https://snekmvawnbzzwgxwkeru.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreWRwaGx1d2psdHN1eWpiemF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NTQ1MDUsImV4cCI6MjA4MzUzMDUwNX0.b9hPPqTuZpajF0POAvcyWa_hbXuvLt1hAI7oMUXojtA"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// Constantes
const TABLE_PANIER = "panier-achats"
const TAXE = 0.13

// Éléments HTML du résumé
const sumList = document.getElementById("sumList")
const sumSubtotal = document.getElementById("sumSubtotal")
const sumTax = document.getElementById("sumTax")
const sumTotal = document.getElementById("sumTotal")
const sumTotalTop = document.getElementById("sumTotalTop")

// Paiement
const payBtn = document.getElementById("payBtn")
const payMsg = document.getElementById("payMsg")

