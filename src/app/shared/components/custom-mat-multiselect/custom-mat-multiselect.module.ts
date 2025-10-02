import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatSelectModule, MatChipsModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { CustomMatMultiselectComponent } from './custom-mat-multiselect.component';
import { MaterialModule } from '@shared/material.module';
import { MatSelectModule } from '@angular/material/select';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomMatMultiselectComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [
    CustomMatMultiselectComponent
  ]
})
export class CustomMatMultiselectModule { }
