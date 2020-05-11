import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './search/search.module';
import { HttpClientModule } from '@angular/common/http';
import { ParkingModule } from './parking/parking.module';
import { BookingModalComponent } from './parking/booking-modal/booking-modal.component';
import { DialogService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModalComponent } from './parking/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ParkingModule,
    SearchModule,
    HttpClientModule,
    AppRoutingModule,
    DynamicDialogModule,
    FormsModule
  ],
  entryComponents: [
    BookingModalComponent,
    ConfirmationModalComponent
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
