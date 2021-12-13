export class Menu {
    id?: number;
    libelle! : string;
    code! : string;
    icon? : string;
    parentId? : number;
    priorite! : number;
    profilId! : number;
    route! : string
}

export class Profil {
    id? : number;
    nom! : string;
    code! : string;
    domaine! : string;
}

