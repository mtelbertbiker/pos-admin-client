import {Component, Input, OnInit} from '@angular/core';
import {TimedFeeCalcResponse} from '../../../../shared/feecalc-models/timedfeecalcresponse.model';

@Component({
  selector: 'app-feecalc-feelist',
  templateUrl: './feecalc-feelist.component.html',
})
export class FeecalcFeelistComponent implements OnInit {
  @Input() timedFeeCalcResponse: TimedFeeCalcResponse;

  constructor() { }

  ngOnInit() {
  }

}
