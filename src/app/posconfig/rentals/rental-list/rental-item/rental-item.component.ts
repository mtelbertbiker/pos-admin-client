import {Component, Input, OnInit} from '@angular/core';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';

@Component({
  selector: 'app-rental-item',
  templateUrl: './rental-item.component.html',
  styleUrls: ['./rental-item.component.css'],
})
export class RentalItemComponent implements OnInit {
  @Input() rentalItem: RentalItem;
  @Input() index: number;
  @Input() vid: number;

  ngOnInit() {
  }

}
