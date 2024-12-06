import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtypeImageRoutingModule } from './subtype-image-routing.module';
import { SubtypeImageComponent } from './subtype-image.component';

@NgModule({
  declarations: [SubtypeImageComponent],
  imports: [CommonModule, SubtypeImageRoutingModule, SharedModule],
})
export class SubtypeImageModule {}
