import {Injectable} from '@angular/core';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';
import {LicenseeService} from '../licensee.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Licensee} from '../licensee.model';
import { map } from 'rxjs/operators';
import {LogService} from '../log.service';

@Injectable()
export class LicenseeDataService {

  licensee: any;

  constructor(private http: HttpClient,
              private licenseeService: LicenseeService,
              private consts: ConstantsService,
              private session: SessionService,
              private oidcSecurityService: OidcSecurityService,
              private log: LogService) {
  }

  getLicensee(licId: number) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminLicenseesUri +
      licId;
    this.log.logTrace('getLicensee:' + apiUrl);
    this.http.get(apiUrl, {headers: headers})
      .subscribe(
        response => {
          this.licensee = response;
          this.licenseeService.setLicensee(this.licensee);
         this.log.logTrace('getLicensee' , this.licensee);
        },
        error => {
          this.log.logError('getLicensee', error);
          this.session.Error = error;
        }
      );
  }

  putLicensee(licensee: Licensee) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri + this.consts.AdminLicenseesUri;
    if (licensee.LicId > 0) {
      this.log.logTrace('putLicensee');
      return this.http.put(apiUrl, licensee, {headers: headers});
    } else {
      this.log.logTrace('postLicensee');
      return this.http.post(apiUrl, licensee, {headers: headers});
    }
  }
}
