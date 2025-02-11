import { Component, OnInit, Input, Optional, Self, OnDestroy, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, tap, takeWhile } from 'rxjs/operators';

import { MatFormFieldControlBase } from './mat-form-control-base';
import { Option } from '../../interfaces/Option';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-custom-mat-multiselect',
  templateUrl: './custom-mat-multiselect.component.html',
  styleUrls: ['./custom-mat-multiselect.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomMatMultiselectComponent },
  ],
})
export class CustomMatMultiselectComponent extends MatFormFieldControlBase
  implements MatFormFieldControl<Option[]>, ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

  @Input() value: Option[] | null;
  // @Input() disabled: boolean;
  @Input() options: Option[];
  @Input() currentGeoLimitOptionsSelected: Option[];
  @Input() currentCommercialOptionsSelected: Option[];
  @Input() selectAll: boolean;
  @Input() search: boolean;
  @Input() selectdeselectAllLabel: string;
  @Input() clearSelectionLabel: string;

  public searchControl: FormControl;
  public valueControl: FormControl;
  public isAllSelected: boolean;
  public filteredOptions: Observable<Option[]>;
  public allOptions: Option[];


  public onChange: (options: Option[]) => void;
  public onTouched: () => void;

  public stateChanges = new Subject<void>();

  private isComponentActive = true;

  @ViewChild('selectElement', { static: false }) selectElement: MatSelect;
  @ViewChild('searchElement', { static: false }) searchElement: HTMLInputElement;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.writeValue(this.currentGeoLimitOptionsSelected)
      this.writeValue(this.currentCommercialOptionsSelected)
    }, 3000)
    this.selectElement.openedChange.subscribe(opened => {
      if (opened) {
        this.selectElement.panel.nativeElement.addEventListener('mouseleave', () => {
          this.selectElement.close();
        })
      }
    })

  }
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;

  ngOnInit(): void {

    this.valueControl = new FormControl();
    this.searchControl = new FormControl();
    this.allOptions = JSON.parse(JSON.stringify(this.options));
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      takeWhile(() => this.isComponentActive),
      startWith(''),
      debounceTime(200),
      map(searchQuery => this.filterOptions(searchQuery)),
    );
    this.valueControl.valueChanges.pipe(
      takeWhile(() => this.isComponentActive),
      map(options => options.map(option => {
        return { label: option.label, id: option.id };
      })),
      tap(options => {
        this.stateChanges.next();
        if (this.ngControl) {
          const updatedOptions = options.filter(o => options.map(v => v.id).includes(o.id));
          this.onChange(updatedOptions);
          this.onTouched();
        }
      }),
    ).subscribe();
    this.valueControl.setValue(this.options);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  public filterOptions(searchQuery: string): Option[] {
    return this.allOptions.map(option => {
      option.isHidden = !option.label.toLowerCase().includes(searchQuery.toLowerCase());
      return option;
    });
  }

  public removeOption(optionToRemove: Option): void {
    this.valueControl.setValue(this.valueControl.value.filter(option => optionToRemove.id !== option.id));
    this.isAllSelected = false;
  }

  public clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.valueControl.setValue([]);
    this.isAllSelected = false;
  }

  public toggleSelection(isAllSelected: boolean): void {
    this.selectdeselectAllLabel = isAllSelected ? 'Deselect all' : 'Select all';
    this.valueControl.setValue(isAllSelected ? this.allOptions : []);
  }

  // Implements ControlValueAccessor
  public writeValue(options: Option[]): void {

    if (options) {
      this.isAllSelected = options.length == this.allOptions.length ? true : false;
      const updatedOptions = this.allOptions.filter(o => options.map(v => v.id).includes(o.id));
      this.valueControl.setValue(updatedOptions);
    }
  }

  public registerOnChange(fn: (options: Option[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Implements MatFormFieldControl
  get empty(): boolean {
    return !this.valueControl.value || this.valueControl.value.length === 0;
  }

  get errorState(): boolean {
    return this.ngControl && this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  public onContainerClick(): void {
    this.selectElement.open();
  }

}