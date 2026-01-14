// Connexion à Supabase
const supabaseUrl = "https://snekmvawnbzzwgxwkeru.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreWRwaGx1d2psdHN1eWpiemF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NTQ1MDUsImV4cCI6MjA4MzUzMDUwNX0.b9hPPqTuZpajF0POAvcyWa_hbXuvLt1hAI7oMUXojtA"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// Constantes de calcul
const TAXE = 0.13
const TABLE_PANIER = "panier-achats"

// Récupération des éléments HTML, grille et filtres
const itemsGrid = document.getElementById("itemsGrid")
const emptyText = document.getElementById("emptyText")
const sortSelect = document.getElementById("sortSelect")
const scrollProductsBtn = document.getElementById("scrollProductsBtn")

// Récupération des éléments HTML, panier
const openCartBtn = document.getElementById("openCartBtn")
const closeCartBtn = document.getElementById("closeCartBtn")
const cartBackdrop = document.getElementById("cartBackdrop")
const cartDrawer = document.getElementById("cartDrawer")

const cartList = document.getElementById("cartList")
const cartCount = document.getElementById("cartCount")
const cartSubtotal = document.getElementById("cartSubtotal")
const cartTax = document.getElementById("cartTax")
const cartTotal = document.getElementById("cartTotal")
const clearCartBtn = document.getElementById("clearCartBtn")
const checkoutBtn = document.getElementById("checkoutBtn")

// Récupération des éléments HTML, modal produit
const productModalBackdrop = document.getElementById("productModalBackdrop")
const closeModalBtn = document.getElementById("closeModalBtn")
const modalMainImage = document.getElementById("modalMainImage")
const modalThumbs = document.getElementById("modalThumbs")
const modalTitle = document.getElementById("modalTitle")
const modalPrice = document.getElementById("modalPrice")
const modalDesc = document.getElementById("modalDesc")
const modalAddToCart = document.getElementById("modalAddToCart")
const soldOutText = document.getElementById("soldOutText")
const qtyMinus = document.getElementById("qtyMinus")
const qtyPlus = document.getElementById("qtyPlus")
const qtyValue = document.getElementById("qtyValue")

// Liste des produits affichés dans la boutique
let displayItems = [
  {
    id: 0,
    nom: "SuperMoist™ Dad Cap",
    prix: 28.5,
    stock: 999,
    description: "Washed red dad cap style.",
    image: "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/produit1-3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL3Byb2R1aXQxLTMucG5nIiwiaWF0IjoxNzY4MzY4OTk1LCJleHAiOjE3OTk5MDQ5OTV9.4oXLNTwOyvyQAn7EUDDggoUEcNjsUKQbGGJNgnC8omc",
    images: []
  },
  {
    id: 1,
    nom: "Porte-clés de motel SuperMoist™Clavier",
    prix: 5.99,
    stock: 999,
    description: "Porte-clés rétro en plastique résistant.",
    image: "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/CLE.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL0NMRS5QTkciLCJpYXQiOjE3NjgzNjkxMzcsImV4cCI6MTc5OTkwNTEzN30.MEMk1J5SJyuhF_CvT_VQ5sARq-ZbViBBp4kwGxlZSVk",
    images: [
      "https://snekmvawnbzzwgxwkeru.supabase.co/storage/v1/object/public/image/clavier.png"
    ]
  },
  {
    id: 2,
    nom: "Sweat-shirts universitaires SuperMoist™",
    prix: 40.00,
    stock: 50,
    description: "Tailles disponibles haute définition.",
    image: "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Sweat-shirts.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1N3ZWF0LXNoaXJ0cy5wbmciLCJpYXQiOjE3Njg0MDIzOTksImV4cCI6MTc5OTkzODM5OX0.5JsJVifXjUqbzxsQGjwlDNlI-cwtRm039c6e9JtmLWs",
    images: [
      "https://snekmhttps://https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Sweat-shirts.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1N3ZWF0LXNoaXJ0cy5wbmciLCJpYXQiOjE3Njg0MDIzOTksImV4cCI6MTc5OTkzODM5OX0.5JsJVifXjUqbzxsQGjwlDNlI-cwtRm039c6e9JtmLWs://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Sweat-shirts.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1N3ZWF0LXNoaXJ0cy5wbmciLCJpYXQiOjE3Njg0MDIyNjcsImV4cCI6MTc5OTkzODI2N30.CjSYS_xWiLpPHQG7msHPcpT7CtrulNGFoJjN4LWAZZsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Sweat-shirts.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1N3ZWF0LXNoaXJ0cy5QTkciLCJpYXQiOjE3NjgzNjk3NTEsImV4cCI6MTc5OTkwNTc1MX0.5LayRmZYc8jMVlO5DU8YLugBpDJFRJdMmPV3EcZo5LUawnbzzwgxwkeru.supabase.co/storage/v1/object/public/image/ecran.png"
    ]
  },
  {
    id: 3,
    nom: "Sac fourre-tout en toile SuperMoist™",
    prix: 15.00,
    stock: 999,
    description: "Affichez votre fierté d'équipe partout avec le sac fourre-tout Betty's SuperMoist™. Car la préparation pour gâteau numéro 1 aux États-Unis n'est pas seulement moelleuse, elle est SuperMoist.",
    image: "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Sac%20fourre.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1NhYyBmb3VycmUucG5nIiwiaWF0IjoxNzY4NDAyNDg5LCJleHAiOjE3OTk5Mzg0ODl9.oeRXFoiU9J1EPs-brPi4SOunfZRgQ7O4XP2saLy4i3I",
    images: [
      "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Sac%20fourre.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1NhYyBmb3VycmUucG5nIiwiaWF0IjoxNzY4NDAyNDg5LCJleHAiOjE3OTk5Mzg0ODl9.oeRXFoiU9J1EPs-brPi4SOunfZRgQ7O4XP2saLy4i3I"
    ]
  },
  {
    id: 4,
    nom: "Pack d'autocollants Betty Crocker™",
    prix: 5.00,
    stock: 999,
    description: "Affichez votre passion pour la pâtisserie partout où vous allez ! De votre gourde à votre ordinateur portable, ces autocollants sont faits pour les pâtissiers qui aiment afficher leur amour de la pâtisserie..",
    image: "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Pack.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1BhY2sucG5nIiwiaWF0IjoxNzY4NDAyODM5LCJleHAiOjE3OTk5Mzg4Mzl9.aLvJHF6enZfsxTJdtQxT9dXkF8nu09VStt9QKw4Xxf0",
    images: [
      "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/Pack.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1BhY2sucG5nIiwiaWF0IjoxNzY4NDAyODM5LCJleHAiOjE3OTk5Mzg4Mzl9.aLvJHF6enZfsxTJdtQxT9dXkF8nu09VStt9QKw4Xxf0"
    ]
  },
  {
    id: 5,
    nom: "SuperMoist™ Super Pack",
    prix: 80.00,
    stock: 50,
    description: "Profitez de 10 % de réduction sur toute la collection SuperMoist™ et affichez votre préférence pour les gâteaux, tous les jours. Car la préparation pour gâteaux numéro 1 aux États-Unis n'est pas seulement moelleuse : elle est SuperMoist.",
    image: "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/SuperMoist.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1N1cGVyTW9pc3QucG5nIiwiaWF0IjoxNzY4NDAzMDU1LCJleHAiOjE3OTk5MzkwNTV9.4wG6ndkuQ-655jAl8nvPrCbq3aZpn42DX1PRvua8hZI",
    images: [
      "https://ukydphluwjltsuyjbzay.supabase.co/storage/v1/object/sign/shop-image/SuperMoist.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNzBmZDk5NS03MDBmLTQyYzItYjc3MS04ZTdlZGNiYmZjNTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wLWltYWdlL1N1cGVyTW9pc3QucG5nIiwiaWF0IjoxNzY4NDAzMDU1LCJleHAiOjE3OTk5MzkwNTV9.4wG6ndkuQ-655jAl8nvPrCbq3aZpn42DX1PRvua8hZI"
    ]
  }
]

// Données du panier
let panierId = 0
let panier = []
let produitActif = null

// Formate un prix pour l’affichage
function formatPrix(n) {
  return "$" + Number(n).toFixed(2)
}

// Compte combien d’articles il y a dans le panier
function calculeComptePanier() {
  let t = 0
  for (let i = 0; i < panier.length; i++) t += panier[i].quantite
  return t
}

// Calcule sous total, taxe et total
function calculeTotaux() {
  let sousTotal = 0
  for (let i = 0; i < panier.length; i++) {
    sousTotal += panier[i].prix * panier[i].quantite
  }
  let taxe = sousTotal * TAXE
  let total = sousTotal + taxe
  return { sousTotal, taxe, total }
}

// Charge le panier sauvegardé dans Supabase
async function chargerPanierSupabase() {
  const { data, error } = await supabaseClient.from(TABLE_PANIER).select("*").limit(1)
  if (error || !data || data.length === 0) {
    panierId = 0
    panier = []
    return
  }
  panierId = data[0].id
  panier = data[0].item || []
}

// Sauvegarde le panier dans Supabase
async function sauverPanierSupabase() {
  if (panierId === 0) {
    const { data, error } = await supabaseClient
      .from(TABLE_PANIER)
      .insert([{ item: panier }])
      .select("*")
      .limit(1)

    if (!error && data && data.length) panierId = data[0].id
    return
  }

  await supabaseClient.from(TABLE_PANIER).update({ item: panier }).eq("id", panierId)
}

// Met à jour le nombre affiché sur le bouton panier
function updateBadge() {
  cartCount.textContent = String(calculeComptePanier())
}

// Ouvre le tiroir du panier
function ouvrirPanier() {
  cartDrawer.classList.add("is-open")
  cartBackdrop.classList.add("is-open")
  cartDrawer.setAttribute("aria-hidden", "false")
  cartBackdrop.setAttribute("aria-hidden", "false")
}

// Ferme le tiroir du panier
function fermerPanier() {
  cartDrawer.classList.remove("is-open")
  cartBackdrop.classList.remove("is-open")
  cartDrawer.setAttribute("aria-hidden", "true")
  cartBackdrop.setAttribute("aria-hidden", "true")
}

// Ouvre la fenêtre produit
function ouvrirModal() {
  productModalBackdrop.classList.add("is-open")
  productModalBackdrop.setAttribute("aria-hidden", "false")
}

// Ferme la fenêtre produit et remet la quantité à 1
function fermerModal() {
  productModalBackdrop.classList.remove("is-open")
  productModalBackdrop.setAttribute("aria-hidden", "true")
  produitActif = null
  qtyValue.value = 1
}

// Trie la liste des produits selon le choix
function triProduits(liste, mode) {
  const copy = [...liste]
  if (mode === "price_asc") copy.sort((a, b) => a.prix - b.prix)
  if (mode === "price_desc") copy.sort((a, b) => b.prix - a.prix)
  if (mode === "name_asc") copy.sort((a, b) => a.nom.localeCompare(b.nom, "fr"))
  return copy
}

// Affiche les cartes produits dans la grille
function renderProduits() {
  const mode = sortSelect.value
  const liste = triProduits(displayItems, mode)

  itemsGrid.innerHTML = ""
  emptyText.hidden = liste.length !== 0

  for (let i = 0; i < liste.length; i++) {
    const p = liste[i]
    const card = document.createElement("div")
    card.className = "item-card"

    card.innerHTML = `
      <img src="${p.image}" alt="${p.nom}" data-open="${p.id}">
      <div class="item-body">
        <h3 class="item-title" data-open="${p.id}">${p.nom}</h3>
        <p class="item-price">${formatPrix(p.prix)}</p>
        <div class="item-actions">
          <button class="btn-primary" type="button" data-add="${p.id}">Ajouter</button>
          <button class="btn-ghost" type="button" data-open="${p.id}">Voir</button>
        </div>
      </div>
    `
    itemsGrid.appendChild(card)
  }

  // Clique pour ouvrir la fenêtre produit
  itemsGrid.querySelectorAll("[data-open]").forEach(el => {
    el.addEventListener("click", () => {
      const id = Number(el.getAttribute("data-open"))
      ouvrirProduit(id)
    })
  })

  // Clique pour ajouter au panier
  itemsGrid.querySelectorAll("[data-add]").forEach(el => {
    el.addEventListener("click", async () => {
      const id = Number(el.getAttribute("data-add"))
      await ajouterAuPanier(id, 1)
      await afficherPanier()
      ouvrirPanier()
    })
  })
}

// Affiche les mini images dans la fenêtre produit
function setThumbs(images) {
  modalThumbs.innerHTML = ""
  for (let i = 0; i < images.length; i++) {
    const im = document.createElement("img")
    im.className = "thumb" + (i === 0 ? " is-active" : "")
    im.src = images[i]
    im.alt = "mini " + (i + 1)
    im.addEventListener("click", () => {
      modalMainImage.src = images[i]
      modalThumbs.querySelectorAll(".thumb").forEach(t => t.classList.remove("is-active"))
      im.classList.add("is-active")
    })
    modalThumbs.appendChild(im)
  }
}

// Remplit la fenêtre produit avec les infos du produit choisi
function ouvrirProduit(id) {
  const p = displayItems.find(x => x.id === id)
  if (!p) return

  produitActif = p
  modalTitle.textContent = p.nom
  modalPrice.textContent = formatPrix(p.prix)
  modalDesc.textContent = p.description || ""

  const imgs = Array.isArray(p.images) && p.images.length ? p.images : [p.image]
  modalMainImage.src = imgs[0]
  modalMainImage.alt = p.nom
  setThumbs(imgs)

  // Active ou bloque l’achat selon le stock
  const okStock = (p.stock ?? 0) > 0
  soldOutText.hidden = okStock
  modalAddToCart.disabled = !okStock

  qtyValue.value = 1
  ouvrirModal()
}

// Cherche un produit dans le panier
function findInPanier(id) {
  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === id) return i
  }
  return -1
}

// Ajoute un produit au panier et sauvegarde
async function ajouterAuPanier(id, qte) {
  const p = displayItems.find(x => x.id === id)
  if (!p) return

  const idx = findInPanier(id)
  if (idx >= 0) panier[idx].quantite += qte
  else {
    panier.push({
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      image: p.image,
      quantite: qte
    })
  }

  await sauverPanierSupabase()
  updateBadge()
}

// Change la quantité d’un item, puis met à jour l’affichage
async function changerQuantite(id, delta) {
  const idx = findInPanier(id)
  if (idx < 0) return

  const nv = panier[idx].quantite + delta
  if (nv <= 0) panier.splice(idx, 1)
  else panier[idx].quantite = nv

  await sauverPanierSupabase()
  updateBadge()
  await afficherPanier()
}

// Vide complètement le panier
async function viderPanier() {
  panier = []
  if (panierId !== 0) {
    await supabaseClient.from(TABLE_PANIER).delete().eq("id", panierId)
    panierId = 0
  }
  updateBadge()
  await afficherPanier()
}

// Affiche le panier et calcule les totaux
async function afficherPanier() {
  cartList.innerHTML = ""

  if (panier.length === 0) {
    cartSubtotal.textContent = formatPrix(0)
    cartTax.textContent = formatPrix(0)
    cartTotal.textContent = formatPrix(0)
    return
  }

  for (let i = 0; i < panier.length; i++) {
    const it = panier[i]
    const row = document.createElement("div")
    row.className = "cart-item"

    row.innerHTML = `
      <img src="${it.image}" alt="${it.nom}">
      <div>
        <p class="cart-item-title">${it.nom}</p>
        <p class="cart-item-price">${formatPrix(it.prix)}</p>
        <div class="cart-qty">
          <button type="button" data-moins="${it.id}">-</button>
          <span>${it.quantite}</span>
          <button type="button" data-plus="${it.id}">+</button>
        </div>
      </div>
    `
    cartList.appendChild(row)
  }

  // Boutons moins
  cartList.querySelectorAll("[data-moins]").forEach(b => {
    b.addEventListener("click", async () => {
      const id = Number(b.getAttribute("data-moins"))
      await changerQuantite(id, -1)
    })
  })

  // Boutons plus
  cartList.querySelectorAll("[data-plus]").forEach(b => {
    b.addEventListener("click", async () => {
      const id = Number(b.getAttribute("data-plus"))
      await changerQuantite(id, +1)
    })
  })

  const t = calculeTotaux()
  cartSubtotal.textContent = formatPrix(t.sousTotal)
  cartTax.textContent = formatPrix(t.taxe)
  cartTotal.textContent = formatPrix(t.total)
}

// Événements, ouverture du panier
openCartBtn.addEventListener("click", async () => {
  await afficherPanier()
  ouvrirPanier()
})

// Événements, fermeture du panier
closeCartBtn.addEventListener("click", fermerPanier)
cartBackdrop.addEventListener("click", fermerPanier)

// Événements, fermeture de la fenêtre produit
closeModalBtn.addEventListener("click", fermerModal)
productModalBackdrop.addEventListener("click", (e) => {
  if (e.target === productModalBackdrop) fermerModal()
})

// Événements, boutons quantité dans la fenêtre produit
qtyMinus.addEventListener("click", () => {
  const v = Math.max(1, Number(qtyValue.value || 1) - 1)
  qtyValue.value = v
})

qtyPlus.addEventListener("click", () => {
  const v = Math.max(1, Number(qtyValue.value || 1) + 1)
  qtyValue.value = v
})

// Événement, ajouter au panier depuis la fenêtre produit
modalAddToCart.addEventListener("click", async () => {
  if (!produitActif) return
  const qte = Math.max(1, Number(qtyValue.value || 1))
  await ajouterAuPanier(produitActif.id, qte)
  await afficherPanier()
  fermerModal()
  ouvrirPanier()
})

// Événement, vider le panier
clearCartBtn.addEventListener("click", viderPanier)

// Événement, aller au paiement
checkoutBtn.addEventListener("click", async () => {
  await afficherPanier()
  if (panier.length === 0) return
  window.location.href = "checkout.html"
})

// Événement, tri des produits
sortSelect.addEventListener("change", renderProduits)

// Événement, descendre vers la section produits
scrollProductsBtn.addEventListener("click", () => {
  const sec = document.getElementById("productsSection")
  if (sec) sec.scrollIntoView({ behavior: "smooth" })
})

// Démarrage de la page
async function start() {
  await chargerPanierSupabase()
  updateBadge()
  renderProduits()
  await afficherPanier()
}

start()
