import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../search/dto/parking';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private httpClient: HttpClient) { }

  public getParkingInfo(id: number): Observable<Parking> {
    return this.httpClient.get<Parking>('http://localhost:8080/v1/parking/' + id);
  }

  public bookParkingPlace(id: number, carNumber: string): Observable<any> {
    let httpParams = new HttpParams().set('carNumber', carNumber);
    return this.httpClient.put<any>('http://localhost:8080/v1/parking/' + id + '/car', {}, {params: httpParams});
  }

  public payParkingPlace(): Observable<any> {
    return null;
  }

  public leaveParkingPlace(id: number, carNumber: string): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/v1/parking/' + id + '/car' + '?carNumber=' + carNumber);
  }

  public test(): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/v1/parking/test', {});
  }
}
