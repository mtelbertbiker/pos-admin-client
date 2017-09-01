import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  LicenseeId = '10000';
  BrandId = '20000';
  vid: number;
  FeeCalcTest = {
    fgid : 0,
    dayOfWeek : 2,
    users : 2,
    beginHour : 14,
    beginMinute : 0,
    endHour : 15,
    endMinute : 30
  };

  constructor() { }

  setCurrentVenueIndex(index: number) {
    this.vid = index;
  }
  getCurrentVenueIndex() {
    return this.vid;
  }
}
