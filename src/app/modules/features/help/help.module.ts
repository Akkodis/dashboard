import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help-routing.module';

@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class HelpModule { }
