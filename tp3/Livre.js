export class Livre{
  constructor(nom, auteur, annee) {
    this.titre = nom;
    this.auteur = auteur;
    this.annee = annee;
    this.id = Date.now();
  }
  afficherInfo(){
    return `Titre : ${this.titre}, Auteur : ${this.auteur}, Année : ${this.annee}, ID : ${this.id}`;
  }
}