import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import {SubtypeAppRoutingModule } from './subtype-app-routing.module';
import { SubtypeAppComponent } from './subtype-app.component';



@NgModule({
  declarations: [
    SubtypeAppComponent
  ],
  imports: [
    CommonModule,
    SubtypeAppRoutingModule,
    SharedModule
  ]
})
export class SubtypeAppModule  {



}
