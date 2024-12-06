/* eslint-disable accessor-pairs */
import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { ScreenService } from '@core/services/screen.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[screenBelowLarge]'
})
export class ScreenBelowLargeDirective implements OnDestroy {
  private hasView = false;
  private screenSubscription: Subscription;

  constructor (private viewContainer: ViewContainerRef,
    private template: TemplateRef<Object>,
    private screenService: ScreenService) {
    this.screenSubscription = this.screenService.resize$.subscribe((resized) => {
      this.onResize();
    });
  }

  ngOnDestroy (): void {
    this.screenSubscription.unsubscribe();
  }

  @Input()
  set screenBelowLarge (condition:any) {
    // ignore the passed condition and set it based on screen size
    condition = this.screenService.screenWidth < this.screenService.largeBreakpoint;
    if (condition && !this.hasView) {
      this.hasView = true;
      this.viewContainer.createEmbeddedView(this.template);
    } else if (!condition && this.hasView) {
      this.hasView = false;
      this.viewContainer.clear();
    }
  }

  onResize () {
    // trigger the sitter
    this.screenBelowLarge = false;
  }
}
