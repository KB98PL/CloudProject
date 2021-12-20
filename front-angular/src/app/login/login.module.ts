import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AlertModule } from '../_helpers/_alert/alert.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        AlertModule,
        ReactiveFormsModule
        
     
        ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule{}
