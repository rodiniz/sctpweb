import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusResponse } from './bus-response';

@Injectable({
  providedIn: 'root'
})
export class BusHourService {

  constructor(private http: HttpClient) { }

  getNextBus(station: string) {
    return this.http.get<Array<BusResponse>>(`https://bushourapi.herokuapp.com/api/getTime?BusStopCode=${station}`);
  }
}
