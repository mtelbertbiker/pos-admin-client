import { Injectable } from '@angular/core';
import {Licensee} from '../licensee.model';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';

@Injectable()
export class SessionService {
  LicenseeId = 1;
  licensee: Licensee;
  ItemIsValid = true;
  ItemIsChanged = false;
  ChangedItems: Array<string>;
  BrandId = 0;
  vid: number;
  ResellerId = 1;
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
  setSaveState(itemName: string, isValid: boolean, isChanged: boolean) {
    if (this.ChangedItems.indexOf(itemName) === -1) {
      this.ChangedItems.push(itemName);
    }
    if (this.ItemIsValid) {
      this.ItemIsValid = isValid;
    }
    if (!this.ItemIsChanged) {
      this.ItemIsChanged = isChanged;
    }
  }

  resetSaveState() {
    this.ChangedItems = [];
    this.ItemIsValid = true;
    this.ItemIsChanged = false;
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
