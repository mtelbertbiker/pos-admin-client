import { Injectable } from '@angular/core';
import { ResellerService } from '../../resellers/reseller.service';
import {Http, Response} from '@angular/http';
import { Licensee } from '../../shared/licensee.model';
import 'rxjs/Rx';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';
import {Venue} from "../pos-models/venue.model";

@Injectable()
export class ResellerDataService {

  constructor(private http: Http,
              private resellerService: ResellerService,
              private consts: ConstantsService,
              private session: SessionService) { }

  getResellerLicensees() {
    this.http.get(this.consts.AdminBaseUri +
      this.consts.AdminResellerLicenseesUri +
      this.session.rsid)
      .map(
        (response: Response) => {
          const licensees: Licensee[] = response.json();
          console.log('getResellerLicensees(' + this.session.rsid + ')');
          console.log(licensees);
          return licensees;
        }
      )
      .subscribe(
        (theLicensees: Licensee[]) => {
          this.resellerService.setLicensees(theLicensees);
        }
      );
  }

  getResellerLicenseeLocations(licid: number) {
    this.http.get(this.consts.AdminBaseUri +
      this.consts.AdminResellerLocationsUri +
      this.session.rsid + '/' + licid)
      .map(
        (response: Response) => {
          const venues: Venue[] = response.json();
          console.log('getResellerLicenseeLocations(' + licid + ')');
          console.log(venues);
          return venues;
        }
      )
      .subscribe(
        (theVenues: Venue[]) => {
          this.resellerService.setCurrrentLocations(theVenues);
        }
      );
  }

  putLicensee(index: number) {
    const licensee =  this.resellerService.getLicensee(index);
    console.log('POS Admin PUT Licensee>>');
    console.log(licensee);
    if (licensee.LicId > 0) {
      return this.http.put(this.consts.AdminBaseUri + this.consts.AdminLicenseesUri, licensee);
    } else {
      return this.http.post(this.consts.AdminBaseUri + this.consts.AdminLicenseesUri, licensee);
    }
  }

  assignLicenseeToReseller(rsid: number, licId: number) {
    console.log('POS Admin PUT assignLicenseeToReseller(' + rsid + '/' + licId + ')');
      return this.http.put(this.consts.AdminBaseUri + this.consts.AdminResellerLicenseesUri + '/' + rsid + '/' + licId, '');
  }
}
