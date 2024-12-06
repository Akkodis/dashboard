import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataflowSubtypeComponent } from './dataflow-subtype.component';

const routes: Routes = [{ path: '', component: DataflowSubtypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataflowSubtypeRoutingModule { }
