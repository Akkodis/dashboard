import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataflowDetailComponent } from './dataflow-detail.component';
import { HomeComponent } from 'app/modules/features/home/home.component';

const routes: Routes = [
  { path: '', component: DataflowDetailComponent },
  // { path: 'detail/235', component: DataflowDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataflowDetailRoutingModule { }