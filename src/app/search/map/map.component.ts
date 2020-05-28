import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options: any;

  overlays: any[];

  infoWindow: any;

  ngOnInit() {
    this.options = {
      center: {lat: 59.931391, lng: 30.358760},
      zoom: 12
    };

    this.infoWindow = new google.maps.InfoWindow();

    this.overlays = [
      new google.maps.Marker({position: {lat: 59.932341, lng: 30.318734}, title:"Konyaalti", url: '/parking/1'}),
      new google.maps.Marker({position: {lat: 59.921543, lng: 30.358760}, title:"Ataturk Park", url: '/parking/2'}),
      new google.maps.Marker({position: {lat: 59.951315, lng: 30.388743}, title:"Oldtown", url: '/parking/2'}),
    ];
  }

  handleMapClick(event) {
    //event: MouseEvent of Google Maps api
  }

  handleOverlayClick(event) {
    const isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      const title = event.overlay.getTitle();
      const url = event.overlay.url;
      this.infoWindow.setContent(this.getTooltipContent(title, url));
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  private getTooltipContent(title: string, url: string): string {
    return`<p>${title}</p><p><a href="${url}">Открыть</a></p>`;
  }
}
