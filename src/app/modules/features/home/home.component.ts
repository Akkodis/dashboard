import { DataService } from './../subtypes/data/data.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavsearchService } from '@core/components/nav-search/navsearch.service';
import { QuickAccessItem } from '@shared/interfaces/quick-access-item';
import { SubtypeData } from '@shared/interfaces/subtype';
import { FilterPipe } from '@shared/pipes/filter.pipe';
import { map, Observable, Subscription } from 'rxjs';
import { AppServiceService } from '../profile/appService/app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FilterPipe]
})
export class HomeComponent implements OnInit {
  quickAccessItems$: Observable<QuickAccessItem[]>;
  searchSubscription: Subscription;
  selected: number;
  isLoading = false;
  searchText = '';

  constructor(private navSearchData: NavsearchService,
    private dataService: DataService,
    private appService: AppServiceService,
    private router: Router) {
    let currentUserId = localStorage.getItem('currentUserId') || '{}';
    // check in businessInfoDataBase if currentUserId exist
    this.appService.getBusinessInfoById(currentUserId).subscribe(data => {
      if (data == null) {
        this.router.navigate(['/profile/business-info'])
      }
    })
  }

  ngOnInit(): void {
    this.quickAccessItems$ = this.dataService.createDb().pipe(
      map((data: SubtypeData) => {
        return data.quickAccessItems;
      })
    );

    this.searchSubscription = this.navSearchData.currentSearchText.subscribe(
      searched => {
        this.searchText = searched;
      }
    );
  }

  onSelectCard(value: number) {
    this.selected = value;
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

}
