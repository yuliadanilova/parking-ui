import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options: any;

  overlays = [];

  infoWindow: any;

  constructor(private searchService: SearchService) {}

   ngOnInit() {

    this.searchService.getParkings().subscribe((parkings) => {
      parkings.forEach((park) => {
        this.overlays.push(new google.maps.Marker({
          position: {lat: park.lat, lng: park.lon}, title: park.address, url: '/parking/' + park.id
        }));
      });
    });

    this.options = {
      center: {lat: 59.931391, lng: 30.358760},
      zoom: 12
    };

    this.infoWindow = new google.maps.InfoWindow();

  }

  handleMapClick(event) {
    console.log(event);
  }

  handleOverlayClick(event) {
    const isMarker = event.overlay.getTitle !== undefined;

    if (isMarker) {
      const title = event.overlay.getTitle();
      const url = event.overlay.url;
      this.infoWindow.setContent(this.getTooltipContent(title, url));
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  private getTooltipContent(title: string, url: string): string {
    return`<p>${title}</p><p><a href="${url}">Подробнее о парковке</a></p>`;
  }
}
