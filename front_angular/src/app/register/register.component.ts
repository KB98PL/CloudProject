import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_helpers/_alert/alert.service';
import { FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { Router } from '@angular/router';

import {AppComponent} from '../app.component'
import { UserIdleService } from 'angular-user-idle';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent
 {
    registerForm;

   constructor(
     private UserService: UserService,
     private AlertService: AlertService,
     private formBuilder: FormBuilder,
     private router:Router,
     public userIdle: UserIdleService,
     private AppComponent: AppComponent
    ){
        this.registerForm = this.formBuilder.group({
          adminPanel: [false],
          nick: ['', Validators.required],
          imie:['', [Validators.required]],
          password: ['', [Validators.required,Validators.minLength(6)]],
          password2: ['', Validators.required],
          nazwisko:['', Validators.required],
          adres:['', Validators.required],
          telefon:['', Validators.required]
        },{validator: MustMatch('password', 'password2')})
   }


   ngOnInit(){
     if(sessionStorage.getItem("token")){
      this.UserService.logout(sessionStorage.getItem("token")).subscribe((data:any) => {
        sessionStorage.clear();
        this.AlertService.success(data.resultOfLogging);
       
    });
     }
   }


   onSubmit(){
  
     if (!this.registerForm.invalid) {
      const formData = this.registerForm.value;
              
          this.UserService.registerUser(formData).subscribe((data:any) => {
                if(data.token){
                  sessionStorage.setItem("token",data.token);
                  this.userIdle.startWatching();
                  this.AppComponent.ngOnInit();
                  this.router.navigate(['home']);
                  this.AlertService.success(data.resultOfLogging);
                  }
                  else{
                    this.AlertService.error(data.resultOfLogging);
                  }
          });
        
    }
    else 
    {
      this.AlertService.error("cos nie tak z walidacja");
    }
   }

 }