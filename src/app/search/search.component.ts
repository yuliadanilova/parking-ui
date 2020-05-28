import { Component, OnInit } from '@angular/core';
import { Parking } from './dto/parking';
import { SearchService } from './search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public parkings: Parking[] = [];
  public options: any;

  public overlays: any[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getTableData();
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
  }

  private getTableData(): void {
    this.searchService.getParkings().subscribe((parkings) => {
      this.parkings = parkings;
    });
  }
}
