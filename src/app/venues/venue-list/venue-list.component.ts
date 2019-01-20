import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../shared/pos-models/venue.model';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html'
})
export class VenueListComponent implements OnInit {
  @Input() venues: Venue[];

  constructor() {
    console.log('Starting VenueListComponent');
  }

  ngOnInit() {
  }

}
