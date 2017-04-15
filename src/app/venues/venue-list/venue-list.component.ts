import {Component, OnDestroy, OnInit} from '@angular/core';
import {Venue} from '../../shared/pos-objects/venue.model';
import {Subscription} from 'rxjs/Subscription';
import {VenueService} from '../venue.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html'
})
export class VenueListComponent implements OnInit, OnDestroy {
  venues: Venue[];
  subscription: Subscription;

  constructor(private venueService: VenueService) {
  }

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.venues = this.venueService.getVenues();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
