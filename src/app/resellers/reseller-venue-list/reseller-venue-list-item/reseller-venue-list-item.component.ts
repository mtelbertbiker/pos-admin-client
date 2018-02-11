import {Component, Input, OnInit} from '@angular/core';
import {Venue} from "../../../shared/pos-models/venue.model";

@Component({
  selector: 'app-reseller-venue-list-item',
  templateUrl: './reseller-venue-list-item.component.html'
})
export class ResellerVenueItemComponent implements OnInit {
  @Input() venue: Venue;
  @Input() licid: number;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
