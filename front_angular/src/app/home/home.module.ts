import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FilterCommentPipe } from '../_helpers/pipe/filterComment.pipe'
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule  } from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { BorrowDialog } from '../_helpers/_dialog/borrow/borrowDialog';

@NgModule({
    imports:[
        CommonModule,
        JwPaginationModule,
        RouterModule,
        MatTableModule,
        BrowserModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatDialogModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule
      
    ],
    declarations: [
        HomeComponent,
        BorrowDialog,
        FilterCommentPipe
    ]
})
export class HomeModule{}