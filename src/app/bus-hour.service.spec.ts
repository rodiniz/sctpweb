import { TestBed } from '@angular/core/testing';

import { BusHourService } from './bus-hour.service';

describe('BusHourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusHourService = TestBed.get(BusHourService);
    expect(service).toBeTruthy();
  });
});
