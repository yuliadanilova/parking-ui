import { Component, OnInit } from '@angular/core';
import { Parking } from './dto/parking';
import { SearchService } from './search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public parkings: Parking[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.searchService.getParkings().subscribe((parkings) => {
      this.parkings = parkings;
    });
  }
}
