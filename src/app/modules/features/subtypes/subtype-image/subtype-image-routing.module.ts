import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeImageComponent } from './subtype-image.component';

const routes: Routes = [{ path: '', component: SubtypeImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypeImageRoutingModule {}
