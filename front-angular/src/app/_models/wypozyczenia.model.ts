export class Wypozyczenia implements IWypozyczenia{
    _id: string[];
    daneKlienta: string[];
    tytul:string;
    dataWypozyczenia: {
        $date: {
            $numberLong: string;
        }
    };
    dataZwrotu: {
        $date: {
            $numberLong: string;
        }
    };
    dataFaktycznegoZwrotu:string;
   

    constructor(_id: string[]) {
        this._id = _id;
       
    }
}

export interface IWypozyczenia{
    _id: string[];
    daneKlienta: string[];
    tytul:string;
    dataWypozyczenia: {
        $date: {
            $numberLong: string;
        }
    };
    dataZwrotu: {
        $date: {
            $numberLong: string;
        }
    };
    dataFaktycznegoZwrotu:string;
   
}