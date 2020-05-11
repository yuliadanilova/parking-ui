import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    TableModule,
    RouterModule
  ]
})
export class SearchModule { }
