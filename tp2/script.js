// Utilise localStorage pour stocker la liste des livres
function getLivres() {
  return JSON.parse(localStorage.getItem("livres") || "[]");
}

function setLivres(livres) {
  localStorage.setItem("livres", JSON.stringify(livres));
}

// --- Page formulaire.html ---
const formAjout = document.getElementById("form-ajout");
if (formAjout) {
  formAjout.addEventListener("submit", (e) => {
    e.preventDefault();
    const titre = document.getElementById("titre-livre").value.trim();
    if (titre) {
      const livres = getLivres();
      livres.push(titre);
      setLivres(livres);
      window.location.href = "index.html";
    }
  });
}

// --- Page index.html ---
function afficherLivres() {
  const ul = document.getElementById("liste-livres");
  if (ul) {
    ul.innerHTML = "";
    const livres = getLivres();
    livres.forEach(titre => {
      const li = document.createElement("li");
      li.textContent = titre;
      ul.appendChild(li);
    });
  }
}

function quitter() {
  alert("Merci d'avoir utilisé l'application !");
  window.close(); // peut ne pas marcher selon le navigateur
}

// --- Page recherche.html ---
const champRecherche = document.getElementById("champ-recherche");
if (champRecherche) {
  champRecherche.addEventListener("input", () => {
    const recherche = champRecherche.value.toLowerCase();
    const livres = getLivres();
    const ul = document.getElementById("resultats-recherche");
    ul.innerHTML = "";

    const resultats = livres.filter(titre => titre.toLowerCase().includes(recherche));

    if (resultats.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No results found";
      ul.appendChild(li);
    } else {
      resultats.forEach((titre, index) => {
        const li = document.createElement("li");
        li.textContent = titre;

        const boutonSuppr = document.createElement("button");
        boutonSuppr.textContent = "Supprimer";
        boutonSuppr.addEventListener("click", () => {
          supprimerLivre(titre);
        });

        li.appendChild(boutonSuppr);
        ul.appendChild(li);
      });
    }
  });
}

function supprimerLivre(titreASupprimer) {
  let livres = getLivres();
  livres = livres.filter(titre => titre !== titreASupprimer);
  setLivres(livres);
  // Recharge les résultats
  champRecherche.dispatchEvent(new Event("input"));
}
