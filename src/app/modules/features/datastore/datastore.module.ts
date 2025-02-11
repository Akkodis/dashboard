import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatastoreRoutingModule } from './datastore-routing.module';
import { DatastoreComponent } from './datastore.component';
import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatastoreComponent
  ],
  imports: [
    CommonModule,
    DatastoreRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ]
})
export class DatastoreModule { }
