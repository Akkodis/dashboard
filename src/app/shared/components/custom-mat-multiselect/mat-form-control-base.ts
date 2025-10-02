import { Input, HostBinding, OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
@Component({
    template: '',
    standalone: false
})
export class MatFormFieldControlBase implements OnDestroy {

  // Implements unique id
  static nextId = 0;
  @HostBinding() id = `base-mat-form-control-${MatFormFieldControlBase.nextId++}`;

  // Implements disabled
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  // Implements focused
  get focused(): boolean {
    return this._focused;
  }
  set focused(isFocused: boolean) {
    this._focused = isFocused;
    this.stateChanges.next();
  }
  private _focused: boolean;

  // Implements required
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  // Implements placeholder
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  // Implements setDescribedByIds
  @HostBinding('attr.aria-describedby') describedBy = '';
  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public stateChanges = new Subject<void>();

  constructor() { }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

}
