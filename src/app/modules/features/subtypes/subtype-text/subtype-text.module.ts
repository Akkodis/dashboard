import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtypeTextComponent } from './subtype-text.component';
import { SubtypeTextRoutingModule } from './subtype-text-routing.module';

@NgModule({
  declarations: [SubtypeTextComponent],
  imports: [CommonModule, SubtypeTextRoutingModule, SharedModule],
})
export class SubtypeTextModule {}
