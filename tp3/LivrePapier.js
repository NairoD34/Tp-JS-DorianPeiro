import { Livre } from "./Livre.js";

export class LivrePapier extends Livre{
constructor(titre, auteur, annee, nombrePages){
    super(titre, auteur, annee);
    this.nombrePages = nombrePages
}
afficherInfo(){
    return `${super.afficherInfo()}, Nombre de page : ${this.nombrePages} pages`;
}
}