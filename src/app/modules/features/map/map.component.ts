import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'google-maps';

  private map: google.maps.Map;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyB6TdOqMOIgBaE9Unn9pQUG4tRrZgtPJXg'
    });

    loader.load().then(() => {
      const location = { lat: 43.604652, lng: 1.444209 };
      this.map = new google.maps.Map(document.getElementById('map')!, {
        center: location,
        zoom: 2,
        styles: styles
      });
      const marker = new google.maps.Marker({
        position: location,
        map: this.map
      });
    });
  }
}
