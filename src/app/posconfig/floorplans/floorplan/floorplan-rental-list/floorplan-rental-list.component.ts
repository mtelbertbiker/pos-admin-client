import {Component, Input, OnInit} from '@angular/core';
import {Floorplan} from '../../../../shared/pos-models/floorplan.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';

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
      this.availableRentalItemIndexes.push(i);
    }
  }

}
