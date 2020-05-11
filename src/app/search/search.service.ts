import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parking } from './dto/parking';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) {}

  public getParkings(): Observable<Parking[]> {
    return this.httpClient.get<Parking[]>('http://localhost:8080/v1/parking');
  }

}
