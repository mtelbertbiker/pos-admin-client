import { Injectable } from '@angular/core';
import {Licensee} from '../licensee.model';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';

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

  ClientId: string;

  constructor(private cookieService: CookieService) {
    this.ClientId = this.cookieService.get('FeeMachineClientId');
    if (this.ClientId.length === 0) {
      this.ClientId = UUID.UUID();
      this.cookieService.set('FeeMachineClientId', this.ClientId);
    }
  }

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
