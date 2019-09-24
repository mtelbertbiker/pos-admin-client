import {Component, Input, OnInit} from '@angular/core';
import {Floorplan} from '../../../../shared/pos-models/floorplan.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';
import {FloorplanItem} from '../../../../shared/pos-models/floorplan-item.model';

@Component({
  selector: 'app-floorplan-rental-list',
  templateUrl: './floorplan-rental-list.component.html',
  styleUrls: ['./floorplan-rental-list.component.css']
})
export class FloorplanRentalListComponent implements OnInit {
  @Input() floorplan: Floorplan;
  @Input() venue: Venue;
  availableRentalItemIndexes: number[];

  constructor() { }

  ngOnInit() {
    this.availableRentalItemIndexes = [];
    for (let i = 0; i < this.venue.RentalItems.length; i++) {
      const rentalItem = this.venue.RentalItems[i];
      let found = false;
      for (let j = 0; j < this.floorplan.FloorplanItems.length; j++) {
        const floorplanitem = this.floorplan.FloorplanItems[j];
        if (floorplanitem.ItemId === rentalItem.RId) {
          found = true;
        }
      }
      if (found === false) {
        this.availableRentalItemIndexes.push(i);
      }
    }
  }


}
