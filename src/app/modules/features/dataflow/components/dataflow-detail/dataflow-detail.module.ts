import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataflowDetailRoutingModule } from './dataflow-detail-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    DataflowDetailRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class DataflowDetailModule { }
