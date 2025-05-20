import { LivrePapier } from "./LivrePapier.js";
import { LivreNumerique } from "./LivreNumerique.js";
import { Bibliothecaire } from "./Bibliothecaire.js";
import { Membre } from "./Membre.js";
const bibliotheque = [];

function getLivresNum() {
  return JSON.parse(localStorage.getItem("bibliothequeNum") || "[]");
}
function getLivresPap() {
  return JSON.parse(localStorage.getItem("bibliothequePap") || "[]");
}
const ajoutLivreForm = document.getElementById("ajout-livre-form");
if (ajoutLivreForm) {
  ajoutLivreForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const titre = document.getElementById("titre").value;
    const auteur = document.getElementById("auteur").value;
    const annee = parseInt(document.getElementById("annee").value);
    const type = document.getElementById("type-livre").value;

    let livre;
    console.log("livre", titre, auteur, annee, type);

    if (type === "numerique") {
      const tailleFichier = parseFloat(
        document.getElementById("tailleFichier").value
      );
      livre = new LivreNumerique(titre, auteur, annee, tailleFichier);
      console.log("prout", livre);
      let bibliothequeNum =
        JSON.parse(localStorage.getItem("bibliothequeNum")) || [];

      // Ajouter le nouveau livre
      bibliothequeNum.push(livre);

      // Sauvegarder la bibliothèque mise à jour dans localStorage
      localStorage.setItem("bibliothequeNum", JSON.stringify(bibliothequeNum));

      alert("Livre ajouté avec succès !");
      console.log("bibliothequeNum", JSON.stringify(bibliothequeNum));
    } else if (type === "papier") {
      const nombrePages = parseInt(
        document.getElementById("nombrePages").value
      );
      console.log("pouet", titre);

      livre = new LivrePapier(titre, auteur, annee, nombrePages);
      let bibliothequePap =
        JSON.parse(localStorage.getItem("bibliothequePap")) || [];

      // Ajouter le nouveau livre
      bibliothequePap.push(livre);

      // Sauvegarder la bibliothèque mise à jour dans localStorage
      localStorage.setItem("bibliothequePap", JSON.stringify(bibliothequePap));

      alert("Livre ajouté avec succès !");
      console.log(localStorage.getItem("bibliothequePap"));
    }
  });
}

function afficherLivres() {
  const listeNum = document.getElementById("liste-livre-num");
  const listePap = document.getElementById("liste-livre-pap");

  listePap.innerHTML = "";
  listeNum.innerHTML = "";

  // Récupère les deux bibliothèques
  const bibliothequePap =
    JSON.parse(localStorage.getItem("bibliothequePap")) || [];
  const bibliothequeNum =
    JSON.parse(localStorage.getItem("bibliothequeNum")) || [];

  if (bibliothequePap.length > 0) {
    const titrePapier = document.createElement("h3");
    titrePapier.textContent = "📘 Livres papier";
    listePap.appendChild(titrePapier);

    bibliothequePap.forEach((livreData) => {
      const livre = new LivrePapier(
        livreData.titre,
        livreData.auteur,
        livreData.annee,
        livreData.nombrePages
      );
      const li = document.createElement("li");
      li.textContent = livre.afficherInfo();
    if(user.role === "membre"){
        const btn = document.createElement("button");
      btn.textContent = "Emprunter";
      btn.addEventListener("click", () => {
        EmprunterLivrePap(livre);
      });
      li.appendChild(btn);
    }
      listePap.appendChild(li);
    });
  }

  if (bibliothequeNum.length > 0) {
    const titreNum = document.createElement("h3");
    titreNum.textContent = "📱 Livres numériques";
    listeNum.appendChild(titreNum);

    bibliothequeNum.forEach((livreData) => {
      const livre = new LivreNumerique(
        livreData.titre,
        livreData.auteur,
        livreData.annee,
        livreData.tailleFichier
      );
      const li = document.createElement("li");
      li.textContent = livre.afficherInfo();
   if(user.role === "membre"){
       const btn = document.createElement("button");
      btn.textContent = "Emprunter";
      btn.addEventListener("click", () => {
        EmprunterLivreNum(livre);
      });
      li.appendChild(btn);
   }
      listeNum.appendChild(li);
    });
  }

  if (bibliothequePap.length === 0 && bibliothequeNum.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun livre disponible.";
    listeNum.appendChild(li);
  }
}

const btnAfficher = document.getElementById("btnAfficher");
if (btnAfficher) {
  btnAfficher.addEventListener("click", afficherLivres);
}

const champRecherche = document.getElementById("champ-recherche");
if (champRecherche) {
  champRecherche.addEventListener("input", () => {
    const recherche = champRecherche.value.toLowerCase();
    const livresPap = getLivresPap();
    const livresNum = getLivresNum();
    console.log("cc", livresNum);
    const ulpap = document.getElementById("resultats-recherche-pap");
    const ulnum = document.getElementById("resultats-recherche-num");

    ulnum.innerHTML = "";
    ulpap.innerHTML = "";

    console.log("rec", recherche);
    const resultatsNum = livresNum.filter((livre) =>
      livre.titre.toLowerCase().includes(recherche)
    );
    const resultatsPap = livresPap.filter((livre) =>
      livre.titre.toLowerCase().includes(recherche)
    );
    console.log("result", resultatsNum, resultatsPap);
    if (resultatsPap.length === 0 && resultatsNum.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No results found";
      ul.appendChild(li);
    }
    if (resultatsNum) {
      const h3 = document.createElement("h3");
      h3.textContent = "Nos livres Numériques";
      ulnum.appendChild(h3);
      resultatsNum.forEach((livre, index) => {
        const li = document.createElement("li");
        li.textContent = livre.titre;

        if (user.role === "biblio") {
          const boutonSuppr = document.createElement("button");
          boutonSuppr.textContent = "Supprimer";
          boutonSuppr.addEventListener("click", () => {
            supprimerLivreNum(livre.titre);
          });

          li.appendChild(boutonSuppr);
        }
        ulnum.appendChild(li);
      });
    }
    if (resultatsPap) {
      const h3 = document.createElement("h3");
      h3.textContent = "Nos livres Papier";
      ulpap.appendChild(h3);
      resultatsPap.forEach((livre, index) => {
        const li = document.createElement("li");
        li.textContent = livre.titre;

        if (user.role === "biblio") {
          const boutonSuppr = document.createElement("button");
          boutonSuppr.textContent = "Supprimer";
          boutonSuppr.addEventListener("click", () => {
            supprimerLivrePap(livre.titre);
          });

          li.appendChild(boutonSuppr);
        }
        ulpap.appendChild(li);
      });
    }
  });
}
function supprimerLivrePap(titreASupprimer) {
  let livres = getLivresPap();
  livres = livres.filter((livre) => livre.titre !== titreASupprimer);
  setLivresPap(livres);
  // Recharge les résultats
  champRecherche.dispatchEvent(new Event("input"));
}
function supprimerLivreNum(titreASupprimer) {
  let livres = getLivresNum();
  livres = livres.filter((titre) => titre !== titreASupprimer);
  setLivresNum(livres);
  // Recharge les résultats
  champRecherche.dispatchEvent(new Event("input"));
}
function setLivresNum(livres) {
  localStorage.setItem("bibliothequeNum", JSON.stringify(livres));
}
function setLivresPap(livres) {
  localStorage.setItem("bibliothequePap", JSON.stringify(livres));
}
function EmprunterLivrePap(livre) {
  let emprunts = JSON.parse(localStorage.getItem("empruntPap")) || [];
  const dejaEmprunte = emprunts.some((emprunt) => emprunt.id === livre.id);

  if (dejaEmprunte) {
    alert("Livre déjà emprunté");
  } else {
    emprunts.push(livre);
    localStorage.setItem("empruntPap", JSON.stringify(emprunts));
    alert("Vous avez bien emprunté le livre : " + livre.titre);
    console.log("emprunts actuels :", emprunts);
  }
}
function EmprunterLivreNum(livre) {
  let emprunts = JSON.parse(localStorage.getItem("empruntNum")) || [];
  const dejaEmprunte = emprunts.some((emprunt) => emprunt.id === livre.id);

  if (dejaEmprunte) {
    alert("Livre déjà emprunté");
  } else {
    emprunts.push(livre);
    localStorage.setItem("empruntNum", JSON.stringify(emprunts));
    alert("Vous avez bien emprunté le livre : " + livre.titre);
    console.log("emprunts actuels :", emprunts);
  }
}

const loginMembre = document.getElementById("login-membre");
if (loginMembre) {
  loginMembre.addEventListener("click", () => {
    let actualUser = localStorage.getItem("user") || [];
    let Benjamin = new Membre("Benjamin");
    actualUser = { nom: Benjamin.nom, role: "membre" };
    localStorage.setItem("user", JSON.stringify(actualUser));
    console.log(localStorage.getItem("user"));
  });
}
const loginBiblio = document.getElementById("login-biblio");
if (loginBiblio) {
  loginBiblio.addEventListener("click", () => {
    let actualUser = localStorage.getItem("user") || [];
    let Martine = new Bibliothecaire("Martine");
    actualUser = { nom: Martine.nom, role: "biblio" };
    localStorage.setItem("user", JSON.stringify(actualUser));
    console.log(localStorage.getItem("user"));
  });
}
const localUser = localStorage.getItem("user");
const user = JSON.parse(localUser)
console.log("user", user.role)

function afficherEmprunts() {
  const listeNum = document.getElementById("liste-emprunt-num");
  const listePap = document.getElementById("liste-emprunt-pap");

  listePap.innerHTML = "";
  listeNum.innerHTML = "";

  // Récupère les deux bibliothèques
  const bibliothequePap =
    JSON.parse(localStorage.getItem("empruntPap")) || [];
  const bibliothequeNum =
    JSON.parse(localStorage.getItem("empruntNum")) || [];

  if (bibliothequePap.length > 0) {
    const titrePapier = document.createElement("h3");
    titrePapier.textContent = "📘 Livres empruntés papier";
    listePap.appendChild(titrePapier);

    bibliothequePap.forEach((livreData) => {
      const livre = new LivrePapier(
        livreData.titre,
        livreData.auteur,
        livreData.annee,
        livreData.nombrePages
      );
      const li = document.createElement("li");
      li.textContent = livre.afficherInfo();
    
      listePap.appendChild(li);
    });
  }

  if (bibliothequeNum.length > 0) {
    const titreNum = document.createElement("h3");
    titreNum.textContent = "📱 Livres empruntés numériques";
    listeNum.appendChild(titreNum);

    bibliothequeNum.forEach((livreData) => {
      const livre = new LivreNumerique(
        livreData.titre,
        livreData.auteur,
        livreData.annee,
        livreData.tailleFichier
      );
      const li = document.createElement("li");
      li.textContent = livre.afficherInfo();
   
      listeNum.appendChild(li);
    });
  }

  if (bibliothequePap.length === 0 && bibliothequeNum.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun livre disponible.";
    listeNum.appendChild(li);
  }
}
const btnEmprunt = document.getElementById("btnEmprunt");
if (btnEmprunt) {
  btnEmprunt.addEventListener("click", afficherEmprunts);
}