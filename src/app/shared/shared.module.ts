import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    FilterPipe,
    GroupByPipe,
    LoadingComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    KeycloakAngularModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FilterPipe,
    RouterModule,
    CommonModule,
    MaterialModule,
    LoadingComponent,
    MatConfirmDialogComponent
  ]
})
export class SharedModule { }
