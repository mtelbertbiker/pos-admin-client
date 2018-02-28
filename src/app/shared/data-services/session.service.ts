import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  LicenseeId = '0';
  BrandId = '0';
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
  rsid = 1;

  constructor() { }

  setCurrentVenueIndex(index: number) {
    this.vid = index;
  }

  setLicenseeId(licId: any) {
    this.LicenseeId = licId;
  }

  getLicenseeId() {
    return Number(this.LicenseeId);
  }

  setBrandId(bId: any) {
    this.BrandId = bId;
  }
  getCurrentVenueIndex() {
    return this.vid;
  }
}
