import {Component, Input, OnInit} from '@angular/core';
import {Fee} from '../../../../../shared/pos-models/fee.model';
import {FeeGroup} from '../../../../../shared/pos-models/fee-group.model';

@Component({
  selector: 'app-fee-item',
  templateUrl: './fee-item.component.html'
})
export class FeeItemComponent implements OnInit {
  @Input() fee: Fee;
  @Input() index: number;
  @Input() feeIndex: number;
  @Input() vid: number;
  @Input() feeGroup: FeeGroup;

  constructor() { }

  ngOnInit() {
  }

}
