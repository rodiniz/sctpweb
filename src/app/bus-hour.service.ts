import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusResponse } from './bus-response';

@Injectable({
  providedIn: 'root'
})
export class BusHourService {

  constructor(private http: HttpClient) { }

  ObterParagens(busCode: string) {
    return this.http.get<any>(`https://sctpapi.apphb.com/api/SCTP/ObterParagens?pesq=${busCode}`);
  }
  getNextBus(station: string) {
    return this.http.get<Array<BusResponse>>(`https://sctpapi.apphb.com/api/SCTP/GetTime?station=${station}`);
  }
}
