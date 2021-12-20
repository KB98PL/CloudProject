import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminPanelComponent } from "./adminpanel.component";
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { PasswordUpdateDialog } from "../_helpers/_dialog/passwordUpdate/passwordUpdateDialog";
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        MatTableModule,
        ReactiveFormsModule,
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        BrowserModule,
        FormsModule,
        MatSelectModule
    ],
    declarations: [
        AdminPanelComponent,
        PasswordUpdateDialog
    ]
})
export class AdminPanelModule{}