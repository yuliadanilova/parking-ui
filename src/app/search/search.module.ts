import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import {GMapModule, TabViewModule} from 'primeng/primeng';
import { MapComponent } from './map/map.component';
import { GMapComponent } from './g-map/g-map.component';



@NgModule({
  declarations: [SearchComponent, MapComponent, GMapComponent],
  imports: [
    CommonModule,
    TableModule,
    RouterModule,
    TabViewModule,
    GMapModule
  ]
})
export class SearchModule { }
