import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import {Map, View, Feature} from 'ol';
import Point from 'ol/geom/Point';
declare var ol: any;

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements OnInit {

  latitude: number = 18.5204;
  longitude: number = 73.8567;
  public vectorSource: VectorSource;
  public iconStyle;
  map: any;


  constructor(private searchService: SearchService) {}

  ngOnInit() {
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    this.iconStyle = new Style({
      image: new Icon({
        // anchor: [0.5, 46],
        // anchorXUnits: 'fraction',
        //  anchorYUnits: 'pixels',
        crossOrigin: 'anonymos',
        src: 'assets/icon.png',
        //scale: 1,
        imgSize: [60, 60]
      })
    });

    this.vectorSource = new VectorSource();
    this.searchService.getParkings().subscribe((data) => {
      data.forEach(p => {
        let geom = new Point(fromLonLat([p.lon, p.lat]));
        let feature = new Feature({
          geometry: geom,
          info: p,
        });
        feature.setStyle(this.iconStyle);
        this.vectorSource.addFeature(feature);
      });
    });

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: this.vectorSource
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      var lon = lonlat[0];
      var lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
    });
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

}
