import { DataStoreService } from '../datastore/services/datastore.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataType } from '@shared/interfaces/DataType';
import { Observable } from 'rxjs';

export interface dataKeywords {
  keyword: string;
  nbRepetitions: string;
}

@Component({
  selector: 'app-datatype-detail',
  templateUrl: './datatype-detail.component.html',
  styleUrls: ['./datatype-detail.component.scss'],
  standalone: false
})
export class DatatypeDetailComponent implements OnInit, AfterViewInit {
  showMyContainer: boolean = true;
  // dataTile$: Observable<string[]>;
  // DataType$: Observable<DataType[]>;
  dataTypes$: Observable<any>;
  selected: number;
  tileSelected: string;
  publicationsDisplayedColumns: string[] = ['name', 'subtitle'];
  keywordsDisplayedColumns: string[] = ['name'];
  currentDataTypes: any[] = [];
  currentTile: string | any;

  constructor (
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit (): void {
    const mapParams = this.activeRoute.snapshot.paramMap;
    this.currentTile = mapParams.get('tile');

    // -- get datatype by tile value
    if (this.currentTile) {
      this.dataTypes$ = this.dataStoreService.getDataTypesInTile(this.currentTile);
      this.dataTypes$.subscribe(data => {
      })
    }
  }

  ngAfterViewInit (): void {
  }

  onSelectCard (index: number) {
    this.selected = index;
  }

  onSelectDatatype (index: number, dataType: string) {
    this.selected = index;
    this.router.navigate(['tile', this.currentTile, 'datatype', dataType]);
  }

  // -- todo : navigate to different SubType view (remove or not ?)
  private navigateToSubtype (name: string) {
    switch (name.toLocaleUpperCase()) {
      case 'cits'.toLocaleUpperCase(): {
        this.navigateTo('/SubtypeCits');
        // this.navigateTo('/dataflow');
        break;
      }
      case 'application'.toLocaleUpperCase(): {
        this.navigateTo('/SubtypeApp');
        break;
      }
      case 'video'.toLocaleUpperCase(): {
        this.navigateTo('/Subtypevideo');
        break;
      }
      case 'image'.toLocaleUpperCase(): {
        this.navigateTo('/Subtypeimage');
        break;
      }
      case 'Text'.toLocaleUpperCase(): {
        this.navigateTo('/Subtypetext');
        break;
      }
      case 'Audio'.toLocaleUpperCase(): {
        this.navigateTo('/Subtypeaudio');
        break;
      }
    }
  }

  private navigateTo (navigate: string) {
    this.router.navigate([navigate], {
      queryParams: { tile: this.tileSelected }
    });
  }
}
