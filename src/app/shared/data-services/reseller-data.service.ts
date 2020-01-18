import {Injectable} from '@angular/core';
import {ResellerService} from '../../resellers/reseller.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Licensee} from '../../shared/licensee.model';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Venue} from '../pos-models/venue.model';
import {LicenseeService} from '../licensee.service';

@Injectable()
export class ResellerDataService {

  licensees: any;
  reseller: any;

  constructor(private http: HttpClient,
              private resellerService: ResellerService,
              private licenseeService: LicenseeService,
              private consts: ConstantsService,
              private session: SessionService, private oidcSecurityService: OidcSecurityService) {
  }

  getResellerLicensees() {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminResellerLicenseesUri +
      this.session.ResellerId;
    this.http.get(apiUrl, {headers: headers})
      .subscribe(
        response => {
          this.reseller = response;
          this.resellerService.reseller = this.reseller;
          this.session.ResellerId = this.reseller.Id;
          console.log('getResellerLicensees(' + this.session.ResellerId + ')');
          this.resellerService.setLicensees(this.reseller.Licensees);
          this.licenseeService.setLicensees(this.reseller.Licensees);
        },
        error => console.log(error)
      );
    /*
    this.http.get<Licensee[]>(apiurl, {headers: headers})
      .map(
        (licensees) => {
          console.log('getResellerLicensees(' + resellerId + ')');
          console.log(licensees);
          this.resellerService.setLicensees(licensees);
          return licensees;
        }
      );
      */
  }
/*
  getResellerLicenseeLocations(licid: number) {
    this.http.get(this.consts.AdminBaseUri +
      this.consts.AdminResellerLocationsUri +
      this.session.ResellerId + '/' + licid)
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
*/
  putLicensee(index: number) {
    const licensee = this.resellerService.getLicensee(index);
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
