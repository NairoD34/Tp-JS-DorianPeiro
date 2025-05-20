import { User } from "./User.js";

export class Membre extends User {
  constructor(nom) {
    super(nom)
    this.livresEmpruntes = [];
  }
  emprunteLivre(livre){
    this.livresEmpruntes.push(livre);
    console.log(`${this.nom} a emprunté : ${livre.titre}`);
  }
}
