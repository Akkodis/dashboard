import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenLargeDirective } from './screen-large.directive';
import { ScreenBelowLargeDirective } from './screen-below-large.directive';

@NgModule({
  declarations: [ScreenLargeDirective, ScreenBelowLargeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ScreenLargeDirective,
    ScreenBelowLargeDirective
  ]
})
export class DirectivesModule { }
