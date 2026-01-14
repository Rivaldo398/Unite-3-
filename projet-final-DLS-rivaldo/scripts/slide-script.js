// Attend que la page soit chargée
document.addEventListener("DOMContentLoaded", () => {
  // Ligne horizontale des recettes
  const rangee = document.querySelector(".rangee-recettes")

  // Boutons de navigation
  const next = document.querySelector(".btn.next")
  const prev = document.querySelector(".btn.prev")

  // Arrête le script si un élément manque
  if (!rangee || !next || !prev) return

  // Largeur d’une carte avec l’espace entre les cartes
  const largeurCarte = rangee.querySelector(".carte-h").offsetWidth + 20

  // Bouton suivant, défile vers la droite
  next.addEventListener("click", () => {
    rangee.scrollLeft += largeurCarte * 4
  })

  // Bouton précédent, défile vers la gauche
  prev.addEventListener("click", () => {
    rangee.scrollLeft -= largeurCarte * 4
  })
})
