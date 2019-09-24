import {Component, Input, OnInit} from '@angular/core';
import {FloorplanItem} from '../../../../shared/pos-models/floorplan-item.model';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {VenueService} from '../../../../venues/venue.service';

@Component({
  selector: 'app-floorplan-item',
  templateUrl: './floorplan-item.component.html',
  styleUrls: ['./floorplan-item.component.css', '../floorplan.component.css']
})
export class FloorplanItemComponent implements OnInit {
  @Input() floorplanitem: FloorplanItem;
  @Input() venue: Venue;
  rentalItem: RentalItem;


  constructor(private venueService: VenueService) { }

  ngOnInit() {
    const itemId = this.floorplanitem.ItemId;
    this.rentalItem = this.venue.RentalItems.find((function (ri: RentalItem) {
      return ri.RId === itemId;
    }));
    console.log('FloorplanItemComponent init: ' +
      this.rentalItem.Name + ' x:' +
      this.floorplanitem.Position['x'] + ' y:' +
      this.floorplanitem.Position['y']);
  }

}
