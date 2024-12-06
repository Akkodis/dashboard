import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScreenService {
    private resizeSource = new BehaviorSubject<any>(null);
    resize$ = this.resizeSource.asObservable();

    largeBreakpoint = 800;
    screenWidth = 1000;
    screenHeight = 800;

    constructor () {
      try {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        window.addEventListener('resize', (event) => this.onResize(event));
      } catch (e) {

      }
    }

    onResize ($event : any): void {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerWidth;
      this.resizeSource.next(null);
    }

    isLarge () : boolean {
      return this.screenWidth >= this.largeBreakpoint;
    }
}
