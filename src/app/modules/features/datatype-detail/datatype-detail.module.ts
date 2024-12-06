import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatypeDetailRoutingModule } from './datatype-detail-routing.module';
import { DatatypeDetailComponent } from './datatype-detail.component';
import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatatypeDetailComponent
  ],
  imports: [
    CommonModule,
    DatatypeDetailRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ]
})
export class DatatypeDetailModule { }
