import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';

@Component({
  selector: 'app-venue-list-item',
  templateUrl: './venue-list-item.component.html'
})
export class VenueListItemComponent implements OnInit {
  @Input() venue: Venue;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
