import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Film } from '../_models/film.model';

@Injectable({
    providedIn: 'root',
})

export class FilmService{

    public url = environment.web_api_url_base;
    constructor(private http:HttpClient){};
    
    addFilm(data){
        return this.http.post(this.url+'film/film_add.php',data);
    }
    updateFilm(data){
        return this.http.post(this.url+'film/film_update.php',data);
        
    }
    delFilm(data){
        return this.http.post(this.url+'film/film_delete.php',data);
    }
    getFilm(data){
        return this.http.post<Film>(this.url+"film/film_get.php",data);
    }
    getFilmList(){
        return this.http.get<Film []>(this.url+'film/film_get_list.php');
    }

}