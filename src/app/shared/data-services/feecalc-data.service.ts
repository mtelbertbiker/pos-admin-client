import { Injectable } from '@angular/core';
import {ConstantsService} from './constants.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TimedFeeCalcWebRequest} from '../feecalc-models/timedfeecalcwebrequest.model';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {SessionService} from './session.service';
import {LogService} from '../log.service';

@Injectable()
export class FeecalcDataService {

  constructor(private http: HttpClient,
              private consts: ConstantsService,
              private oidcSecurityService: OidcSecurityService,
              private sessionService: SessionService,
              private log: LogService) { }

  FeeCalc(feeCalcWebRequest: TimedFeeCalcWebRequest) {
    this.log.logTrace('FeeCalc', feeCalcWebRequest);
    const token = this.oidcSecurityService.getToken();  // This is the Web Admin API Token, not the Fee Calc API token
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.sessionService.ClientId);
    return this.http.post(this.consts.FeeCalcBaseUri,
      feeCalcWebRequest,
      { headers: headers });
  }

}
