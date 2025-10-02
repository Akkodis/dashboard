import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss'],
  standalone: false
})

export class MatConfirmDialogComponent {
  constructor (@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>
  ) {

  }

  confirmDialog () {
    this.dialogRef.close(true)
  }

  closeDialog () {
    this.dialogRef.close(false)
  }
}
