export class Film implements IFilm{
    _id: string[];
    tytul: string;
    gatunek:string;
    rezyser: string;
    czas_trwania: string;
    obsada:string[];
    streszczenie_fabuly:string;
    ocena_filmu:number;
    dostepnosc:boolean;

    constructor(_id: string[], dostepnosc: boolean) {
        this._id = _id;
        this.dostepnosc = dostepnosc;
    }
}

export interface IFilm{
    _id: string[];
    tytul: string;
    gatunek:string;
    rezyser: string;
    czas_trwania: string;
    obsada:string[];
    streszczenie_fabuly:string;
    ocena_filmu:number;
    dostepnosc:boolean;
}