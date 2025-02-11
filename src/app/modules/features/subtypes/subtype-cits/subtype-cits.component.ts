import { DataStoreService } from 'app/modules/features/datastore/services/datastore.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavsearchService } from '@core/components/nav-search/navsearch.service';
import { QuickAccessItem } from '@shared/interfaces/quick-access-item';
import { Subscription, Observable, map } from 'rxjs';
import { DataService } from '../data/data.services';
import { SubtypeData } from '@shared/interfaces/subtype';
import { SubtypeCits } from './interfaces/subtype-city';

@Component({
  selector: 'app-subtype-cits',
  templateUrl: './subtype-cits.component.html',
  styleUrls: ['./subtype-cits.component.scss']
})
export class SubtypeCitsComponent implements OnInit {
  quickAccessItems$: Observable<QuickAccessItem[]>;
  SubtypeCits$: Observable<SubtypeCits[]>;
  searchSubscription: Subscription;
  selected: SubtypeCits;
  tile: string;
  idMec: string;
  readonly TYPE = 'cits';
  searchText = '';

  constructor(
    private router: Router,
    private navSearchData: NavsearchService,
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.tile = params.tile;
    });

    this.dataStoreService.getMec(this.tile).subscribe(data => {
      this.idMec = data[0].id;
    });

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
    this.router.navigate(['/dataflow'], {
      queryParams: {
        type: this.TYPE,
        subType: value.name,
        icon: value.icon,
        tile: this.tile,
        idMec: this.idMec
      }
    });
  }
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
