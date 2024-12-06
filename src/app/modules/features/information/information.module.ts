import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { InformationComponent } from './information.component';
import { InformationRoutingModule } from './information-routing.module';

@NgModule({
  declarations: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class InformationModule { }
