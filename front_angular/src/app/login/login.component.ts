import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../_models/user.model';
import {UserService} from '../_services/user.service';
import { AlertService } from '../_helpers/_alert/alert.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserIdleService } from 'angular-user-idle';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent {
    loginForm;
    user: User[];

    constructor(
      private UserService: UserService, 
      private formBuilder: FormBuilder,
      private AlertService: AlertService,
      public userIdle: UserIdleService,
      private AppComponent: AppComponent,
     private router:Router
    ){
        this.loginForm = this.formBuilder.group({
          nick: [''],
          password: [''],   
        })
   }



   onSubmit(){
    this.UserService.login(this.loginForm.value).subscribe((data:any) => {
      if(data.token){
          sessionStorage.setItem("token",data.token);
          this.userIdle.startWatching();
         
          this.router.navigate(['home']);
          this.AppComponent.ngOnInit();
          this.AlertService.success(data.resultOfLogging);
      }
      else{
        this.AlertService.success(data.resultOfLogging);
      }
      })
   }

}
