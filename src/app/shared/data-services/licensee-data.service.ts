import { Injectable } from '@angular/core';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';
import {LicenseeService} from '../licensee.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Licensee} from '../licensee.model';


@Injectable()
export class LicenseeDataService {

  licensee: any;

  constructor(private http: HttpClient,
              private licenseeService: LicenseeService,
              private consts: ConstantsService,
              private session: SessionService,
              private oidcSecurityService: OidcSecurityService) {}

  getLicensee(licId: number) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminLicenseesUri +
      licId;

    this.http.get(apiUrl, {headers: headers})
      .subscribe(
        response => {
          this.licensee = response;
          this.licenseeService.setLicensee(this.licensee);
        },
        error => console.log(error)
      );
  }

  putLicensee(licensee: Licensee) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri + this.consts.AdminLicenseesUri + '/0';
    console.log('putLicensee>>');
    return this.http.put(apiUrl, licensee, { headers: headers });
  }
}