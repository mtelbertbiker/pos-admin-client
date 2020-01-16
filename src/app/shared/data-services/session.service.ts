import { Injectable } from '@angular/core';
import {Licensee} from '../licensee.model';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';
import {FormTypes, LoginTypes} from './constants.service';

@Injectable()
export class SessionService {
  userData: any;
  licensee: Licensee;
  ItemIsValid = true;
  ItemIsChanged = false;
  ChangedItems: Array<string>;
  Saving = [];
  HideSaveBtn = false;
  private DefaultBrandId = 1;
  DeletedItemName = '';
  vid: number;
  ResellerId = 0;
  Licenseeid = 0;
  FeeCalcTest = {
    fgid : 0,
    dayOfWeek : 2,
    users : 2,
    beginHour : 14,
    beginMinute : 0,
    endHour : 15,
    endMinute : 30
  };
  Email = ''; // 'mtelbertbiker@gmail.com';
  UserName = '';
  LoginType: LoginTypes;

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

  getBrandId(): number {
    if ((this.licensee.Brands != null) && (this.licensee.Brands.length > 0)) {
      return this.licensee.Brands[0].BId;
    }
    return this.DefaultBrandId;  // Default Brand value
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

  getCurrentVenueIndex() {
    return this.vid;
  }
}
