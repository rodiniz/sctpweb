import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { BusHourService } from './bus-hour.service';
import { BusResponse } from './bus-response';
import { MatTabGroup } from '@angular/material/tabs';
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
  @ViewChild('tabGroup', {static: true})
  tabGroup: MatTabGroup;
 constructor(private service: BusHourService) {}
  ngOnInit(): void {
    if ( localStorage.getItem('busCodes') !== null) {
      this.savedCodes = JSON.parse( localStorage.getItem('busCodes'));
    }
  }
  refresh() {
    this.codeSeleted();
  }
  refreshFromList(code: string) {

    this.busCode = code;
    this.refresh();
    this.tabGroup.selectedIndex = 0;
  }
  addtoFavorites() {
     if (this.savedCodes.indexOf(this.busCode) === -1) {
        this.savedCodes.push(this.busCode);
        localStorage.setItem('busCodes', JSON.stringify(this.savedCodes));
        alert('Favorite added successfully');
     }
  }
  getClassName(element: any) {
    const busCode = element.busName.split('-')[0];
    return 'linha_' + busCode;
  }
  codeSeleted() {
    this.loading = true;
    this.service.getNextBus(this.busCode).subscribe(res => {
       this.dataSource = res;
       this.loading = false;
       if (this.busStops.length === 0 ) {
        this.busStation = this.busCode;
       } else {
        this.busStation = this.busStops.find(c => c.code === this.busCode);
        this.busStops = [];
       }
      }
    );

  }
}
