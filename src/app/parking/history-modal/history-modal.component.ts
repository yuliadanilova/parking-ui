import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css']
})
export class HistoryModalComponent implements OnInit {

  public history: any[] = [];

  constructor(private dialogRef: DynamicDialogRef,
              private dialogConfig: DynamicDialogConfig) { }

  ngOnInit() {
    this.history = this.dialogConfig.data.history;
  }

  public onDialogClose(): void {
    this.dialogRef.close();
  }

}
