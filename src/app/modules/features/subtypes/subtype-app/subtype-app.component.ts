import { DataService } from './../data/data.services';
import { Component, OnInit } from '@angular/core';
import { NavsearchService } from '@core/components/nav-search/navsearch.service';
import { QuickAccessItem } from '@shared/interfaces/quick-access-item';
import { SubtypeData } from '@shared/interfaces/subtype';
import { map, Observable, Subscription } from 'rxjs';
import { SubtypeCits } from '../subtype-cits/interfaces/subtype-city';

@Component({
    selector: 'app-subtype-app',
    templateUrl: './subtype-app.component.html',
    styleUrls: ['./subtype-app.component.scss'],
    standalone: false
})
export class SubtypeAppComponent implements OnInit {
  quickAccessItems$: Observable<QuickAccessItem[]>;
  SubtypeCits$: Observable<SubtypeCits[]>;
  selected: SubtypeCits;
  searchText = '';
  searchSubscription: Subscription;

  constructor(
    private navSearchData: NavsearchService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.SubtypeCits$ = this.dataService.createDb().pipe(
      map((data: SubtypeData) => {
        return data.SubtypeCits;
      })
    );

    this.quickAccessItems$ = this.dataService.createDb().pipe(
      map((data: SubtypeData) => {
        return data.quickAccessItems;
      })
    );

    this.searchSubscription = this.navSearchData.currentSearchText.subscribe(
      (searched) => {
        this.searchText = searched;
      }
    );
  }

  onSelectCard(value: SubtypeCits) {
    this.selected = value;
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
