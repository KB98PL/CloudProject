import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RegisterComponent } from './register.component';
import { AlertModule } from '../_helpers/_alert/alert.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
    imports:[
        CommonModule,
        AlertModule,
        ReactiveFormsModule,
        MatSliderModule
        
    ],
    declarations: [
        RegisterComponent
    ]
})
export class RegisterModule{}