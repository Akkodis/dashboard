import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@shared/shared.module';
import { BusinessInformationComponent } from './business-information/business-information.component';
import { CustomMatMultiselectModule } from '@shared/components/custom-mat-multiselect/custom-mat-multiselect.module';
import { KeycloakUserInformationComponent } from './keycloak-user-information/keycloak-user-information/keycloak-user-information.component';

@NgModule({
  declarations: [
    ProfileComponent,
    BusinessInformationComponent,
    KeycloakUserInformationComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CustomMatMultiselectModule,
    SharedModule,
    // HttpClientModule
  ]
})
export class ProfileModule { }
