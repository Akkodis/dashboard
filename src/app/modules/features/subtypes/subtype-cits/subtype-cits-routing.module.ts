import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeCitsComponent } from './subtype-cits.component';

const routes: Routes = [{ path: '', component: SubtypeCitsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypeCitsRoutingModule {
}
