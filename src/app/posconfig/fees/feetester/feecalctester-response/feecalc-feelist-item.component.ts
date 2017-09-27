import {Component, Input, OnInit} from '@angular/core';
import {ChargedFee} from '../../../../shared/feecalc-models/chargedfee.model';

@Component({
  selector: 'app-feecalc-feelist-item',
  templateUrl: './feecalc-feelist-item.component.html',
})
export class FeecalcFeelistItemComponent implements OnInit {
  @Input() chargedFee: ChargedFee;

  constructor() { }

  ngOnInit() {
  }

}
