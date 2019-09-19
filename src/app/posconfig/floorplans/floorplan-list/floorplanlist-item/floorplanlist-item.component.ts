import {Component, Input, OnInit} from '@angular/core';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {FloorplanItem} from '../../../../shared/pos-models/floorplan-item.model';
import {FeeGroup} from '../../../../shared/pos-models/fee-group.model';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {VenueService} from '../../../../venues/venue.service';

@Component({
  selector: 'app-floorplanlist-item',
  templateUrl: './floorplanlist-item.component.html',
  styleUrls: ['./floorplanlist-item.component.css', '../floorplan-list.component.css']
})
export class FloorplanlistItemComponent implements OnInit {
  @Input() floorplanitem: FloorplanItem;
  @Input() index: number;
  @Input() vid: number;
  rentalItem: RentalItem;
  venue: Venue;

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.venue = this.venueService.getVenue(this.vid);
    const itemId = this.floorplanitem.ItemId;
    this.rentalItem = this.venue.RentalItems.find((function (ri: RentalItem) {
      return ri.RId === itemId;
    }));
    console.log('FloorplanlistItemComponent init: ' +
      this.rentalItem.Name + ' x:' +
      this.floorplanitem.Position['x'] + ' y:' +
      this.floorplanitem.Position['y']);
  }
}
