import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtypeVideoComponent } from './subtype-video.component';
import { SubtypeVideoRoutingModule } from './subtype-video-routing.module';

@NgModule({
  declarations: [SubtypeVideoComponent],
  imports: [CommonModule, SubtypeVideoRoutingModule, SharedModule],
})
export class SubtypeVideoModule {}
