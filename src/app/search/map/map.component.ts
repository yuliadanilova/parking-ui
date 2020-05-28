import {Component, Input, OnInit} from '@angular/core';
import {Map, View, Feature} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Point from 'ol/geom/Point';
import {SearchService} from '../search.service';
import {Router} from '@angular/router';
import Overlay from "ol/Overlay";
import { toStringHDMS } from "ol/coordinate";
import { fromLonLat, toLonLat } from "ol/proj";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public vectorLayer: VectorLayer;
  public vectorSource: VectorSource;
  public osmTileLayer: TileLayer;
  public map;
  public iconStyle;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.vectorSource = new VectorSource();
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

    this.osmTileLayer = new TileLayer({
      source: new OSM(),
      zIndex: 1,
      visible: true
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 3,
      visible: true
    });

    this.osmTileLayer = new TileLayer({
      source: new OSM(),
      zIndex: 1
    });

    this.map = new Map({
      target: 'mapOL',
      layers: [
        this.osmTileLayer,
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([30.358760, 59.931391]),
        zoom: 13
      })
    });

  }
}
