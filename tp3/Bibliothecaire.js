import { User } from "./User.js"

export class Bibliothecaire extends User{
    constructor(nom){
        super(nom);
    }
    ajouterLivre(livre, bibliotheque) {
    bibliotheque.push(livre);
    console.log(`${super.nom} a ajouté le livre : ${livre.titre}`);
  }
}