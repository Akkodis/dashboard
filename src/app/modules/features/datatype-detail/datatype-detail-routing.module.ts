import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatypeDetailComponent } from './datatype-detail.component';

const routes: Routes = [{ path: '', component: DatatypeDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatatypeDetailRoutingModule { }
