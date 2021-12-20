export class User implements IUser{
    _id: string[];
    nick: string;
    imie:string;
    password: string;
    dataRejestracji: Date;
    token:string;
    resultOfLogging:string;
    nazwisko:string;
    adres:string;
    telefon:string;
  

    constructor(_id: string[]) {
        this._id = _id;
    }
}

export interface IUser{
    _id: string[];
    nick: string;
    imie:string;
    password: string;
    dataRejestracji: Date;
    token:string;
    resultOfLogging:string;
    nazwisko:string;
    adres:string;
    telefon:string;
}