import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { BusHourService } from './bus-hour.service';
import { BusResponse } from './bus-response';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  busCode: string;
  dataSource: Array<BusResponse> = [];
  busStops: any = [];
  loading = false;
  displayedColumns: string[] = ['busName', 'nextHour', 'waitTime'];
  busStation: any;
  savedCodes = [];
 constructor(private service: BusHourService) {}
  @ViewChild('busStopCode', { static: true })  busStopCode: ElementRef;
  ngOnInit(): void {
    if ( localStorage.getItem('busCodes') !== null) {
      this.savedCodes = JSON.parse( localStorage.getItem('busCodes'));
    }
    const obs = fromEvent(this.busStopCode.nativeElement, 'keyup')
    .pipe (
        debounceTime(500),
        tap(() => {
          if (this.busStopCode.nativeElement.value.length < 2) {
            return;
          }
          this.loading = true;
          this.service.ObterParagens(this.busStopCode.nativeElement.value).subscribe(res => {
              this.busStops =  res;
              this.loading = false;
          });
        }),
        );

    obs.subscribe();
  }
  refresh() {
    this.codeSeleted();
  }
  codeSeleted() {
    this.loading = true;
    this.service.getNextBus(this.busCode).subscribe(res => {
       this.dataSource = res;
       this.loading = false;
       this.busStation = this.busStops.find(c => c.code === this.busCode);
       this.busStops = [];
      }
    );

  }
}
