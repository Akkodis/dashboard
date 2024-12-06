import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtypeAudioComponent } from './subtype-audio.component';

const routes: Routes = [{ path: '', component: SubtypeAudioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypeAudiRoutingModule {}
