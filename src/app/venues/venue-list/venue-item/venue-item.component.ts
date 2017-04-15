import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../../shared/pos-objects/venue.model';

@Component({
  selector: 'app-venue-item',
  templateUrl: './venue-item.component.html'
})
export class VenueItemComponent implements OnInit {
  @Input() venue: Venue;

  constructor() { }

  ngOnInit() {
  }

}
