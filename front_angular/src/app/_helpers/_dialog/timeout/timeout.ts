import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserIdleService } from "angular-user-idle";

export interface DialogData {
    time: number;
  }

@Component({
    selector: 'timeout',
    templateUrl: 'timeout.html',
  })
  export class Timeout {
  
    constructor(
      public dialogRef: MatDialogRef<Timeout>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public userIdle: UserIdleService ) {}
  
    onClick(): void {
        this.userIdle.resetTimer();
      this.dialogRef.close();
    }
  
  }