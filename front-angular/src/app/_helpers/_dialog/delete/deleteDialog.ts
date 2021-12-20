import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'deleteDialog',
  templateUrl: 'deleteDialog.html',
})
export class DeleteDialog {

  constructor(
    
    private dialogRef: MatDialogRef<DeleteDialog>) {
      
      
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

  close(){
    this.dialogRef.close(false);
  }
}