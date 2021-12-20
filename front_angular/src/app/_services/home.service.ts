import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Wypozyczenia} from '../_models/wypozyczenia.model';

@Injectable({
    providedIn: 'root',
})

export class HomeService{

    public url = environment.web_api_url_base;
    constructor(private http:HttpClient){};


    getBorrowList(id){
        return this.http.get<Wypozyczenia []>(this.url+'borrow/borrow_get_list.php?id='+id);
    }

    borrowFilm(data){
        return this.http.post(this.url+'borrow/borrow_film.php',data);
    }

    borrowFilmAdmin(data){
        return this.http.post(this.url+'borrow/a_borrow_film.php',data);
    }

    borrowBackFilm(data){
        return this.http.post<Wypozyczenia []>(this.url+'borrow/borrow_back_film.php',data);
    }

}