import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../shared/pos-models/venue.model';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/data-services/session.service';
import {VenueService} from '../venue.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css'],
})
export class VenueListComponent implements OnInit {
  @Input() venues: Venue[];

  constructor(private router: Router,
              private sessionService: SessionService,
              private venueService: VenueService) {
    console.log('Starting VenueListComponent');
  }

  ngOnInit() {
  }

  onAddLocation() {
    console.log('onAddLocation');
    const newVenue = new Venue(this.sessionService.getLicenseeId());
    const index = this.venueService.addVenue(newVenue);
    this.router.navigate(['location/' + index + '/1']);
  }

}
