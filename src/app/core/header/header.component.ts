import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {Subscription} from 'rxjs/Subscription';
import {Venue} from '../../shared/pos-models/venue.model';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {filter, take} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isVenueDroppedDown = false;
  isOtherDroppedDown = false;
  isResellerDroppedDown = false;
  venues: Venue[];
  subscription: Subscription;
  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;

  constructor(private venueService: VenueService,
              private router: Router,
              private oidcSecurityService: OidcSecurityService) {
    this.isAuthorized = true;
  }

  ngOnInit() {
    console.log('HeaderComponent onInit');
    // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized()
    //  .subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
  }

  onGetLocations() {
    console.log('onGetLocations');
    this.venues = this.venueService.getVenues();
  }

  onAddLocation() {
    console.log('onAddLocation');
    const newVenue = new Venue (0, 0, 0, 'New Location', '', '', '', '', '', '', '', [], [], [], [], 0, '');
    const index = this.venueService.addVenue(newVenue);
    this.router.navigate(['location/' + index + '/1']);
  }

  onShowLicensees() {
    console.log('onShowLicensees');
    this.router.navigate(['reseller/licensees']);
  }

  signUp() {
    this.oidcSecurityService.authorize();
  }

  signOut() {
    this.oidcSecurityService.logoff();
  }

  onDuplicateLocation() {
    console.log('onDuplicateLocation');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.isAuthorizedSubscription.unsubscribe();
  }

  toggleCollapseState() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleVenueDropDownState() {
    this.isVenueDroppedDown = !this.isVenueDroppedDown;
  }

  toggleResellerDropDownState() {
    this.isResellerDroppedDown = !this.isResellerDroppedDown;
  }
  toggleOtherDropDownState() {
    this.isOtherDroppedDown = !this.isOtherDroppedDown;
  }
}
