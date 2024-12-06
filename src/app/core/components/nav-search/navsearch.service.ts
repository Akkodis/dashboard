import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavsearchService {
  private searchTextSource = new BehaviorSubject('');
  currentSearchText = this.searchTextSource.asObservable();

  searchThis(searchText: string) {
    this.searchTextSource.next(searchText)
  }

  constructor() { }
}
