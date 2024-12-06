import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { MapComponent } from './map.component';
import { mapRoutingModule } from './map-routing.module';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    mapRoutingModule,
    SharedModule,
    DirectivesModule,
    CommonModule
  ],
  exports: [MapComponent]
})
export class mapModule {}
