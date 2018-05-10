import { Component, OnInit } from '@angular/core';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {VenueService} from '../../venues/venue.service';
import {Venue} from '../../shared/pos-models/venue.model';
import {Subscription} from 'rxjs/Subscription';
import {LicenseeDataService} from '../../shared/data-services/licensee-data.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';
import {SessionService} from '../../shared/data-services/session.service';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  venues: Venue[];
  licensee: Licensee = new Licensee(0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, false, '');
  venueSubscription: Subscription;
  licenseeSubscription: Subscription;
  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;

  constructor(private venueDataService: VenueDataService,
              private venueService: VenueService,
              private licenseeDataService: LicenseeDataService,
              private router: Router,
              private licenseeService: LicenseeService,
              private sessionService: SessionService,
              private oidcSecurityService: OidcSecurityService) {
  }



  ngOnInit() {
    console.log('HomeComponent onInit');
    this.licenseeDataService.getLicensee(0);
    this.licenseeSubscription = this.licenseeService.licenseesChanged
      .subscribe(
        (licensees: Licensee[]) => {
          this.licensee = licensees[0];
          this.sessionService.setLicensee(this.licensee);
        }
      );
    this.venueDataService.getVenues();
    this.venueSubscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized()
      .subscribe(isAuthorized => this.isAuthorized = isAuthorized);
  }

  onAddLocation() {
    console.log('onAddLocation');
    const newVenue = new Venue (this.sessionService.getLicenseeId(),
      0, 0, 'New Location',
      '', '', '', '', '', '', '',
      [], [], [], [], 0, '');
    const index = this.venueService.addVenue(newVenue);
    this.router.navigate(['location/' + index + '/1']);
  }

}
