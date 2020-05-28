import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ParkingComponent } from './parking/parking.component';
import {MapComponent} from './search/map/map.component';
import {GMapComponent} from './search/g-map/g-map.component';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {path: 'map', component: GMapComponent},
  {path: 'parking/:id', component: ParkingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
