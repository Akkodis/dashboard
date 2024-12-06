import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtypeAudiRoutingModule } from './subtype-audio-routing.module';
import { SubtypeAudioComponent } from './subtype-audio.component';



@NgModule({
  declarations: [
    SubtypeAudioComponent
  ],
  imports: [
    CommonModule,
    SubtypeAudiRoutingModule,
    SharedModule
  ]
})
export class SubtypeAudioModule  {



}
