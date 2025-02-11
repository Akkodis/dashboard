import { DataflowDetailComponent } from './dataflow-detail/dataflow-detail.component';
import { DataFlowComponent } from './dataflow.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DataFlowComponent },
{ path: 'detail', component: DataflowDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFlowRoutingModule { }
