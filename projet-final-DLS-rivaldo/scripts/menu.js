// Attend que la page soit entièrement chargée
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les items du menu
  const items = document.querySelectorAll(".menu-betty .menu-item")

  // Ferme tous les menus ouverts
  function fermerTout() {
    items.forEach((it) => {
      it.classList.remove("ouvert")
      const btn = it.querySelector(".menu-btn")
      if (btn) btn.setAttribute("aria-expanded", "false")
    })
  }

  // Gestion du clic sur chaque bouton de menu
  items.forEach((it) => {
    const btn = it.querySelector(".menu-btn")
    if (!btn) return

    btn.addEventListener("click", (e) => {
      e.preventDefault()

      // Vérifie si le menu est déjà ouvert
      const dejaOuvert = it.classList.contains("ouvert")

      // Ferme tous les menus
      fermerTout()

      // Ouvre le menu cliqué s’il était fermé
      if (!dejaOuvert) {
        it.classList.add("ouvert")
        btn.setAttribute("aria-expanded", "true")
      }
    })
  })

  // Ferme le menu si on clique à l’extérieur
  document.addEventListener("click", (e) => {
    const menu = document.querySelector(".menu-betty")
    if (!menu) return
    if (!menu.contains(e.target)) fermerTout()
  })

  // Ferme le menu avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermerTout()
  })
})
