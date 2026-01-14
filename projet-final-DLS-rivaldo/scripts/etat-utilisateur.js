import { supabase } from "./supabase-client.js"

// Boutons du menu
const boutonConnexion = document.getElementById("bouton-connexion")
const boutonInscription = document.getElementById("bouton-inscription")

// Vérifie si un utilisateur est connecté
async function demarrer() {
  const { data, error } = await supabase.auth.getUser()
  if (error) return
  if (!data.user) return

  // Met à jour le menu si l’utilisateur est connecté
  boutonInscription.textContent = "Déconnexion"
  boutonInscription.href = "#"

  boutonConnexion.textContent = data.user.email
  boutonConnexion.href = "#"

  // Déconnexion au clic
  boutonInscription.addEventListener("click", async (e) => {
    e.preventDefault()
    await supabase.auth.signOut()
    window.location.reload()
  })
}

// Lancement du script
demarrer()
