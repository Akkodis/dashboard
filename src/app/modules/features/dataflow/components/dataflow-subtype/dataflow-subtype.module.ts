import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataflowSubtypeRoutingModule } from './dataflow-subtype-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    DataflowSubtypeRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class DataflowSubtypeModule { }
