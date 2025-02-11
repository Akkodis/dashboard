import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { FavoriteComponent } from './favorite.component';
import { FavoriteRoutingModule } from './Favorite-routing.module';

@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class FavoriteModule { }
