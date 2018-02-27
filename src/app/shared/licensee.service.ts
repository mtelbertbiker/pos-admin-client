import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Licensee} from './licensee.model';


@Injectable()
export class LicenseeService {
  licenseesChanged = new Subject<Licensee[]>();
  private licensees: Licensee[] = [];

  constructor() { }

  getLicensees() {
    return this.licensees.slice();
  }
  setLicensee(newLicensee: Licensee) {
    if (this.licensees.length > 0) {
      this.licensees.pop();
    }
    this.licensees.push(newLicensee);
    this.licenseesChanged.next(this.licensees.slice());
    return this.licensees.length - 1;
  }

  getLicensee(index: number) {
    return this.licensees[index];
  }
}
