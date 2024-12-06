import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeAppComponent } from './subtype-app.component';
import { environment } from 'environments/environment';

const routes: Routes = [
  // first path is for the use of mockData, 
  // environment.withMockData ? { path: 'datatype/cits', component: SubtypeAppComponent } : 
  { path: '', component: SubtypeAppComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypeAppRoutingModule { }
