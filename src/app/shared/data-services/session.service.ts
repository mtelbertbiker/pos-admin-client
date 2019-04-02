import { Injectable } from '@angular/core';
import {Licensee} from '../licensee.model';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';
import {FormTypes} from './constants.service';

@Injectable()
export class SessionService {
  LicenseeId = 1;
  licensee: Licensee;
  ItemIsValid = true;
  ItemIsChanged = false;
  ChangedItems: Array<string>;
  Saving = [];
  HideSaveBtn = false;
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
  setSaveState(formType: FormTypes, isValid: boolean, isChanged: boolean) {
    console.log('SetSaveState ' + formType.valueOf().toString() + ' V: ' + isValid + ' C: ' + isChanged);
    if (this.ChangedItems.indexOf(formType.valueOf().toString()) === -1) {
      this.ChangedItems.push(formType.valueOf().toString());
    }
    this.ItemIsValid = isValid;
    this.ItemIsChanged = isChanged;
  }

  resetSaveState() {
    this.ChangedItems = [];
    this.ItemIsValid = true;
    this.ItemIsChanged = false;
    this.HideSaveBtn = false;
    this.Saving = [];
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
