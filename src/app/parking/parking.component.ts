import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ParkingService } from './parking.service';
import { Parking } from '../search/dto/parking';
import { DialogService } from 'primeng/api';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'parking',
  templateUrl: './parking.component.html'
})
export class ParkingComponent implements OnInit {
  public id: number;
  public parking: Parking;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService,
              private parkingService: ParkingService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.get('id'))
    ).subscribe((data) => { this.id = +data; });

    this.parkingService.getParkingInfo(this.id).subscribe((info) => {
      this.parking = info;
    });
  }

  public onBookingClick(): void {
    this.dialogService.open(BookingModalComponent, {data: {title: 'Бронь парковочного места'}})
      .onClose.subscribe((res) => {
      if (res) {
        this.parkingService.bookParkingPlace(this.id, res)
          .subscribe(() => {
            this.dialogService.open(ConfirmationModalComponent, {
              data: {message: 'Вы забронировали место для автомобиля с номером: ' + res}
            }).onClose.subscribe(() => this.router.navigate(['/search']));
          }, error => {
            console.log(error);
          });
      }});
  }

  public onLeaveClick(): void {
    this.dialogService.open(BookingModalComponent, {data : {title: 'Покинуть парковку'}})
      .onClose.subscribe((res) => {
        if (res) {
          this.parkingService.leaveParkingPlace(this.id, res)
            .subscribe(() => {
              this.dialogService.open(ConfirmationModalComponent, {
                data: {message: 'Автомобиль с номером: ' + res + 'покинул данную парковку'}
              }).onClose.subscribe(() => this.router.navigate(['/search']));
            }, error => {
            console.log(error);
          });
        }});
  }

  public onPayClick(): void {
    this.dialogService.open(BookingModalComponent, {})
      .onClose.subscribe((res) => {
        if (res) {
          this.parkingService.payParkingPlace()
            .subscribe(() => {
              this.dialogService.open(ConfirmationModalComponent, {
                data: {message: 'Вы оплатили место для автомобиля с номером: ' + res}
              }).onClose.subscribe(() => this.router.navigate(['/search']));
            }, error => {
              console.log(error);
            });
        }
    });
  }
}
