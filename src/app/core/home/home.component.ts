import {Component, OnInit} from '@angular/core';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {VenueService} from '../../venues/venue.service';
import {Venue} from '../../shared/pos-models/venue.model';
import {Subscription} from 'rxjs';
import {LicenseeDataService} from '../../shared/data-services/licensee-data.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';
import {SessionService} from '../../shared/data-services/session.service';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {ResellerDataService} from '../../shared/data-services/reseller-data.service';
import {ResellerService} from '../../resellers/reseller.service';
import {LoginTypes} from '../../shared/data-services/constants.service';
import {SessionStorageService} from 'angular-web-storage';

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
  isAuthorized: boolean;
  session: SessionService;

  constructor(private venueDataService: VenueDataService,
              private venueService: VenueService,
              private licenseeDataService: LicenseeDataService,
              private router: Router,
              private licenseeService: LicenseeService,
              private sessionService: SessionService,
              private resellerService: ResellerService,
              private resellerDataService: ResellerDataService,
              public  websession: SessionStorageService,
              private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    console.log('HomeComponent onInit');
    this.session = this.sessionService;
    this.sessionService.resetSaveState();

    this.sessionService.LoginType  = this.websession.get('LoginType');
    console.log('Login Type:' + this.sessionService.LoginType);
    if (this.sessionService.LoginType === LoginTypes.Distributor) {
        this.resellerDataService.getResellerLicensees();
        this.resellerSubscription = this.resellerService.licenseesChanged
          .subscribe(
            (licensees: Licensee[]) => {
              this.licensees = licensees;
            }
          );

    }
    if (this.sessionService.LoginType === LoginTypes.Operator) {
      this.licenseeDataService.getLicensee(this.session.Licenseeid);
      this.licenseeSubscription = this.licenseeService.licenseesChanged
        .subscribe(
          (licensees: Licensee[]) => {
            this.licensee = licensees[0];
            this.session.Licenseeid = this.licensee.LicId;
            this.sessionService.setLicensee(this.licensee);
            this.venueDataService.getVenues(this.licensee.LicId);
          }
        );
    }
    this.venueSubscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
          this.venueService.setVenues(this.venues);
        }
      );
    console.log('Calling: oidcSecurityService.getIsAuthorized() ');
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized()
      .subscribe(isAuthorized => {
        this.isAuthorized = isAuthorized;
        console.log('Is Authorized:' + isAuthorized);
        if (this.isAuthorized) {
          this.oidcSecurityService.getUserData().subscribe(userData => {
            this.sessionService.userData = userData;
            this.sessionService.Email = this.sessionService.userData['emails'][0];
            this.sessionService.UserName = this.sessionService.userData['name'];
          });
        }
      });

  }
}
