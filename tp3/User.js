export class User{
    constructor(nom){
        this.nom = nom;
        this.id = Date.now().toString();
    }
    voirProfil(){
        return`Nom d'utilisateur : ${this.nom}, ID : ${this.id}`
    }
}