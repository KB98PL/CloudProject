import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
    providedIn: 'root',
})

export class UserService{

    public url = environment.web_api_url_base;
    constructor(private http:HttpClient){};
    
    registerUser(data){
        return this.http.post(this.url+'auth/user_add.php',data);
    }
    
    login(data) {
        return this.http.post(this.url+"auth/login.php",data);
    }

    logout(id) {
        return this.http.get(this.url+"auth/logout.php?id="+id);
    }

    getUser(data){
        return this.http.post<User>(this.url+"auth/user_get.php",data);
    }

    getThisUser(id){
        return this.http.get(this.url+"auth/user_get_this.php?id="+id);
    }

    getUserList(id){
        return this.http.get<User[]>(this.url+"auth/user_get_list.php?id="+id);
    }

    delUser(data){
        return this.http.post(this.url+"auth/user_delete.php",data);
    }

    updateUser(data){
        return this.http.post(this.url+"auth/user_update.php",data);
    }

    adminPassChange(data){
        return this.http.post(this.url+"auth/user_password_change.php",data);
    }
}