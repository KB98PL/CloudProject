import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'passwordUpdateDialog',
  templateUrl: 'passwordUpdateDialog.html',
})
export class PasswordUpdateDialog {
  pass;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private UserService:UserService,
    private dialogRef: MatDialogRef<PasswordUpdateDialog>) {
  }

  onConfirmClick() {

    const send={
      token:sessionStorage.getItem("token"),
      userId: this.data.id,
      password: this.pass,
    }
   this.UserService.adminPassChange(send).subscribe((response:any) =>{
     if(response.result=="Zmieniono"){
      this.dialogRef.close(true);
     }
     else{
      this.dialogRef.close(false);
     }
   })
  }

  close(){
    this.dialogRef.close(false);
  }
}