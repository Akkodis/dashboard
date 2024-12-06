import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatastoreComponent } from './datastore.component';

const routes: Routes = [{ path: '', component: DatastoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatastoreRoutingModule { }
