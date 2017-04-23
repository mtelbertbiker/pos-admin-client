import {Component, Input, OnInit} from '@angular/core';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';

@Component({
  selector: 'app-rental-item',
  templateUrl: './rental-item.component.html',
})
export class RentalItemComponent implements OnInit {
  @Input() rentalItem: RentalItem;
  @Input() index: number;
  @Input() vid: number;
  combo: string;

  ngOnInit() {
    this.combo = this.vid + '-' + this.index;
  }

}
