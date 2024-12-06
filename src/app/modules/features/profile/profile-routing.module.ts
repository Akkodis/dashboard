import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { BusinessInformationComponent } from './business-information/business-information.component';

const routes: Routes = [{ path: '', component: ProfileComponent },
{ path: 'business-info', component: BusinessInformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
