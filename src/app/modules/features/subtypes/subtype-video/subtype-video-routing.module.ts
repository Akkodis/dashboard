import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeVideoComponent } from './subtype-video.component';

const routes: Routes = [{ path: '', component: SubtypeVideoComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypeVideoRoutingModule  {

  

}



