import {Component, Input, OnInit} from '@angular/core';
import {TimedFeeCalcResponse} from '../../../../shared/feecalc-models/timedfeecalcresponse.model';

@Component({
  selector: 'app-feecalc-logmsg',
  templateUrl: './feecalc-logmsg.component.html',
})
export class FeecalcLogmsgComponent implements OnInit {
  @Input() timedFeeCalcResponse: TimedFeeCalcResponse;

  constructor() { }

  ngOnInit() {
  }

}
