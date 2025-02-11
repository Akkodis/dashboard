import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeTextComponent } from './subtype-text.component';

const routes: Routes = [{ path: '', component: SubtypeTextComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypeTextRoutingModule {}
