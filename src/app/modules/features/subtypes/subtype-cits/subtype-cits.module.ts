import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtypeCitsRoutingModule } from './subtype-cits-routing.module';
import { SubtypeCitsComponent } from './subtype-cits.component';

@NgModule({
  declarations: [
    SubtypeCitsComponent
  ],
  imports: [
    CommonModule,
    SubtypeCitsRoutingModule,
    SharedModule
  ]
})
export class SubtypeCitsModule {}
