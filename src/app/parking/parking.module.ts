import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingComponent } from './parking.component';
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';




@NgModule({
  declarations: [ ParkingComponent, ConfirmationModalComponent ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ParkingModule { }
