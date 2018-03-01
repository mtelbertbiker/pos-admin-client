import { Injectable } from '@angular/core';
import {Licensee} from '../licensee.model';

@Injectable()
export class SessionService {
  LicenseeId = '0';
  licensee: Licensee;
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


  setLicensee(lic: Licensee) {
    this.licensee = lic;
  }

  getLicensee() {
    return this.licensee;
  }

  getLicenseeId() {
    return Number(this.licensee.LicId);
  }

  setBrandId(bId: any) {
    this.BrandId = bId;
  }
  getCurrentVenueIndex() {
    return this.vid;
  }
}
