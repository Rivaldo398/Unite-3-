import { supabase } from "./supabase-client.js"

// Éléments du formulaire
const formulaire = document.getElementById("formulaire-connexion")
const champCourriel = document.getElementById("champ-courriel-connexion")
const champMotdepasse = document.getElementById("champ-motdepasse-connexion")
const message = document.getElementById("message-connexion")

// Affiche un message sous le formulaire
function afficherMessage(texte) {
  message.textContent = texte
}

// Quand l'utilisateur clique sur "Se connecter"
formulaire.addEventListener("submit", async (e) => {
  e.preventDefault()
  afficherMessage("")

  // Récupérer ce que l'utilisateur a tapé
  const courriel = champCourriel.value.trim()
  const motdepasse = champMotdepasse.value

  // Vérification simple des champs
  if (!courriel || !motdepasse) {
    afficherMessage("Remplissez tous les champs")
    return
  }

  // Connexion Supabase avec email + mot de passe
  const { data, error } = await supabase.auth.signInWithPassword({
    email: courriel,
    password: motdepasse
  })

  // Si erreur, afficher le message
  if (error) {
    afficherMessage("Erreur: " + error.message)
    return
  }

  // Si succès, rediriger vers l'accueil
  console.log("Connecté:", data.user?.email)
  window.location.href = "accueil.html"
})
