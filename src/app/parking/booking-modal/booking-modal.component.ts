import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {

  public number: string;
  public title: string;

  constructor(private dialogRef: DynamicDialogRef,
              private  dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.title = this.dialogConfig.data.title;
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  public onAcceptClick(): void {
    this.dialogRef.close(this.number);
  }

}
