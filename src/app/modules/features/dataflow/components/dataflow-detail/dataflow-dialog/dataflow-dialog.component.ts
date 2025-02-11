import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Sla } from '@shared/interfaces/sla';
import { DataDialog } from './../../../../../../shared/interfaces/data-catalog';
import { Reservation } from './../../../../../../shared/interfaces/reservation';

@Component({
  selector: 'app-dataflow-dialog',
  templateUrl: './dataflow-dialog.component.html',
  styleUrls: ['./dataflow-dialog.component.scss'],
})
export class DataflowDialogComponent implements OnInit {
  reservationId$: Observable<Reservation>;
  dataType: string;
  listSla$: Observable<Sla[]>;

  constructor(
    public dialogRef: MatDialogRef<DataflowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog
  ) {}

  ngOnInit(): void {
    this.listSla$ = this.data.listSla;
  }

  cancel() {
    this.dialogRef.close();
  }
}
