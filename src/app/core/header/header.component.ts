import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {Subscription} from 'rxjs/Subscription';
import {Venue} from '../../shared/pos-models/venue.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isVenueDroppedDown = false;
  isOtherDroppedDown = false;
  venues: Venue[];
  subscription: Subscription;

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.venues = this.venueService.getVenues();
  }

  onGetLocations() {
    console.log('onGetLocations');
    this.venueService.getVenues();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleCollapseState() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleVenueDropDownState() {
    this.isVenueDroppedDown = !this.isVenueDroppedDown;
  }
  toggleOtherDropDownState() {
    this.isOtherDroppedDown = !this.isOtherDroppedDown;
  }
}
