import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent implements OnInit {

  public message: string;

  constructor(private dialogRef: DynamicDialogRef,
              private dialogConfig: DynamicDialogConfig) { }

  ngOnInit() {
    this.message = this.dialogConfig.data.message;
  }

  public onDialogClose(): void {
    this.dialogRef.close();
  }
}
