import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataStoreService } from './services/datastore.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import tileMath from 'quadkey-tilemath';
import * as L from 'leaflet';

export interface dataKeywords {
  keyword: string;
  nbRepetitions: string;
}

@Component({
  selector: 'app-datastore',
  templateUrl: './datastore.component.html',
  styleUrls: ['./datastore.component.scss']
})
export class DatastoreComponent implements OnInit, AfterViewInit {
  dataTile$: Observable<string[]>;
  dataTypeFlow$: Observable<any>;
  selected: number;
  tileSelected: string;
  map: L.Map;

  constructor(
    private router: Router,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.dataTile$ = this.dataStoreService.getTile();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [50, 0],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 0,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const icon = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        iconUrl: 'assets/icons/marker-icon.png',
        iconRetinaUrl: 'assets/icons/marker-icon-2x.png',
        shadowUrl: 'assets/icons/marker-shadow.png'
      })
    };

    this.dataTile$.subscribe(data => {
      // todo
      // foreach get all datatypes for tile
      // stock map => tile : datatypeTotal

      data.forEach(tile => {
        // const tile = "0313331232";

        const box = tileMath?.quadkeyToBoundingBox(tile);
        const bounds = L.latLngBounds(L.latLng(box.north, box.west), L.latLng(box.south, box.east));
        const center = bounds.getCenter();

        const rectangle = L.rectangle(bounds, { color: '#6e89c5', weight: 1 }).addTo(this.map);
        rectangle.addTo(this.map);

        const that = this;

        // -- define button and action inside leaflet popup
        // -- -- get total datatypes by tile
        // let totalDatatypes = '0';
        // totalDatatypes = this.onSelectTile(tile);

        const div = document.createElement('div');
        div.innerHTML = '<b>Quadkey:</b> ' + tile + '<br>'; //+ '<br> <b>Available data types:</b> ' + totalDatatypes + '<br>';

        const button = document.createElement('button');
        button.innerHTML = 'Show data types';
        button.className = 'leafletBtn';
        button.id = 'lfBtn';
        button.onclick = function () {
          that.onClickButton(tile);
        }

        div.appendChild(button);

        const marker = L.marker(center, icon).bindPopup(div);

        marker.addTo(this.map);
      });
    });
  }

  // --
  onSelectTile(tile: string) {
    const isTileNotEmpty = !!tile.trim();
    if (isTileNotEmpty) {
      this.dataStoreService.getDataTypesInTile(tile).subscribe(datatypes => {
        if (datatypes) {
          return '1';
        } else {
          return '0';
        }
      });
    }

    // if null
    return '0';
  }

  // -- button inside popup : route to datatype detail
  onClickButton(tile: string) {
    this.router.navigate(['/tile/', tile]);
  }
}
