import { Livre } from "./Livre.js";

export class LivreNumerique extends Livre{
constructor(titre, auteur, annee, tailleFichier){
    super(titre, auteur, annee);
    this.tailleFichier = tailleFichier
}
afficherInfo(){
    return `${super.afficherInfo()}, Taille du fichier : ${this.tailleFichier} Mo`;
}
}