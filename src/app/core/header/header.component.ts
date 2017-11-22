import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {Subscription} from 'rxjs/Subscription';
import {Venue} from '../../shared/pos-models/venue.model';
import {Router} from '@angular/router';

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

  constructor(private venueService: VenueService, private router: Router) { }

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

  onAddLocation() {
    console.log('onAddLocation');
    const newVenue = new Venue (0, 0, 0, 'New Location', '', '', '', '', '', '', '', [], [], [], [], 0, '');
    const index = this.venueService.addVenue(newVenue);
    this.router.navigate(['location/' + index + '/1']);
  }

  onDuplicateLocation() {
    console.log('onDuplicateLocation');
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
