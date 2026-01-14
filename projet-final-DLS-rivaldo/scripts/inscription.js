import { supabase } from "./supabase-client.js"

// Récupération des éléments du formulaire
const form = document.getElementById("formulaire-inscription")
const email = document.getElementById("champ-courriel-inscription")
const pass = document.getElementById("champ-motdepasse-inscription")
const pass2 = document.getElementById("champ-confirmation-inscription")
const msg = document.getElementById("message-inscription")

// Quand l’utilisateur soumet le formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  msg.textContent = ""

  // Vérifie que les mots de passe sont identiques
  if (pass.value !== pass2.value) {
    msg.textContent = "Les mots de passe ne correspondent pas."
    return
  }

  // Création du compte avec Supabase
  const { data, error } = await supabase.auth.signUp({
    email: email.value.trim(),
    password: pass.value,
    options: {
      // Redirection après confirmation du courriel
      emailRedirectTo: `${window.location.origin}/connexion.html`
    }
  })

  // Affiche l’erreur si l’inscription échoue
  if (error) {
    msg.textContent = error.message
    return
  }

  // Message de succès
  msg.textContent = "Compte créé. Vérifiez votre courriel."
  console.log(data)
})
