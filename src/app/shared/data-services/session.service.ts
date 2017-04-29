import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  LicenseeId = '1';
  BrandId = '2';
  vid: number;

  constructor() { }

  setCurrentVenueIndex(index: number) {
    this.vid = index;
  }
  getCurrentVenueIndex() {
    return this.vid;
  }
}
