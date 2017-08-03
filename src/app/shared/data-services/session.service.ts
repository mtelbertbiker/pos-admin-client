import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  LicenseeId = '10000';
  BrandId = '20000';
  vid: number;

  constructor() { }

  setCurrentVenueIndex(index: number) {
    this.vid = index;
  }
  getCurrentVenueIndex() {
    return this.vid;
  }
}
