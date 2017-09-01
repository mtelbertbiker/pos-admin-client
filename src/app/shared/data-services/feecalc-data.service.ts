import { Injectable } from '@angular/core';
import {ConstantsService} from './constants.service';
import {Http} from '@angular/http';
import {TimedFeeCalcWebRequest} from '../feecalc-models/timefeecalcwebrequest.model';

@Injectable()
export class FeecalcDataService {

  constructor(private http: Http,
              private consts: ConstantsService) { }

  FeeCalc(feeCalcWebRequest: TimedFeeCalcWebRequest) {
    console.log('Fee Calc POST>>');
    console.log(feeCalcWebRequest);
    return this.http.post(this.consts.FeeCalcBaseUri,
      feeCalcWebRequest);
  }

}
