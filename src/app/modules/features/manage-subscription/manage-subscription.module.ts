import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageSubscriptionRoutingModule } from './manage-subscription-routing.module';
import { ManageSubscriptionComponent } from './manage-subscription.component';
import { DataFlowModule } from '../dataflow/components/dataflow.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ManageSubscriptionComponent
  ],
  imports: [
    CommonModule,
    ManageSubscriptionRoutingModule,
    DataFlowModule,
    SharedModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_DIALOG_DATA, useValue: {} }

  ]
})
export class ManageSubscriptionModule { }
