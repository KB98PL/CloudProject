import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'deleteUserDialog',
  templateUrl: 'deleteUserDialog.html',
})
export class DeleteUserDialog {

  constructor(
    
    private dialogRef: MatDialogRef<DeleteUserDialog>) {
      
      
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

  close(){
    this.dialogRef.close(false);
  }
}