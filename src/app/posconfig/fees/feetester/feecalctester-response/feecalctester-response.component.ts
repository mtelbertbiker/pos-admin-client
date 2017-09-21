import { Component, OnInit, Input } from '@angular/core';
import {TimedFeeCalcResponse} from '../../../../shared/feecalc-models/timedfeecalcresponse.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-feecalctester-response',
  templateUrl: './feecalctester-response.component.html',
})
export class FeeCalcTesterResponseComponent implements OnInit {
  @Input() timedFeeCalcResponse: TimedFeeCalcResponse;

  ngOnInit() {
  }

}
