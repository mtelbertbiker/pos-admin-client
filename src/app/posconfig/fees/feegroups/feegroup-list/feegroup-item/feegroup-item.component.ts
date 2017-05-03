import {Component, Input, OnInit} from '@angular/core';
import {FeeGroup} from '../../../../../shared/pos-models/fee-group.model';

@Component({
  selector: 'app-feegroup-item',
  templateUrl: './feegroup-item.component.html'
})
export class FeegroupItemComponent implements OnInit {
  @Input() feeGroup: FeeGroup;
  @Input() index: number;
  @Input() vid: number;

  constructor() { }

  ngOnInit() {
  }

}
