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
import {ResellerDataService} from '../../shared/data-services/reseller-data.service';
import {ResellerService} from '../../resellers/reseller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  venues: Venue[];
  licensee: Licensee;
  licensees: Licensee[] = [];
  venueSubscription: Subscription;
  licenseeSubscription: Subscription;
  resellerSubscription: Subscription;
  isAuthorizedSubscription: Subscription;
  // isAuthorized: boolean;
  isAuthorized = true;
  session: SessionService;

  constructor(private venueDataService: VenueDataService,
              private venueService: VenueService,
              private licenseeDataService: LicenseeDataService,
              private router: Router,
              private licenseeService: LicenseeService,
              private sessionService: SessionService,
              private resellerDataService: ResellerDataService,
              private resellerService: ResellerService,
              private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    console.log('HomeComponent onInit');
    this.session = this.sessionService;
    this.sessionService.resetSaveState();
    if ((this.session.licensee != null) && (this.session.licensee.LicId > 0)) {
      this.licenseeDataService.getLicensee(this.session.licensee.LicId);
      this.licenseeSubscription = this.licenseeService.licenseesChanged
        .subscribe(
          (licensees: Licensee[]) => {
            this.licensee = licensees[0];
            this.sessionService.setLicensee(this.licensee);
          }
        );
      this.venueDataService.getVenues(this.licensee.LicId);
      this.venueSubscription = this.venueService.venuesChanged
        .subscribe(
          (venues: Venue[]) => {
            this.venues = venues;
            this.venueService.setVenues(this.venues);
          }
        );
    }
    if (this.session.ResellerId > 0) {
      this.resellerDataService.getResellerLicensees();
      this.resellerSubscription = this.resellerService.licenseesChanged
        .subscribe(
          (licensees: Licensee[]) => {
            this.licensees = licensees;
          }
        );
    }

    /*
    console.log('Next: oidcSecurityService.getIsAuthorized() ');
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized()
      .subscribe(isAuthorized => this.isAuthorized = isAuthorized);
      */
  }
}
