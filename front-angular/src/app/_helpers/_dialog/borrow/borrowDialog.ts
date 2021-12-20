import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeService } from 'src/app/_services/home.service';
import { AlertService } from '../../_alert/alert.service';


@Component({
  selector: 'borrowDialog',
  templateUrl: 'borrowDialog.html',
})
export class BorrowDialog {
  imie;
  nazwisko;
  userId;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private HomeService: HomeService,
    private AlertService: AlertService,
    private dialogRef: MatDialogRef<BorrowDialog>) {
      
      
  }

  onConfirmClick() {
    const send={
      token:sessionStorage.getItem("token"),
      filmId: this.data.id,
      userId: this.userId ? this.userId : null,
      imie: this.imie ? this.imie : null,
      nazwisko: this.nazwisko ? this.nazwisko : null
    }

   this.HomeService.borrowFilmAdmin(send).subscribe((data:any)=>{
    if(data.success){
      this.dialogRef.close(true);
    }
    else{
      this.AlertService.error(data.result);
    }
   })
  }

  close(){
    this.dialogRef.close(false);
  }
}