import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {VenueService} from '../../venues/venue.service';
import {LicenseeDataService} from '../../shared/data-services/licensee-data.service';
import {Router} from '@angular/router';
import {LicenseeService} from '../../shared/licensee.service';
import {SessionService} from '../../shared/data-services/session.service';
import {ResellerService} from '../../resellers/reseller.service';
import {ResellerDataService} from '../../shared/data-services/reseller-data.service';
import {SessionStorageService} from 'angular-web-storage';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Venue} from '../../shared/pos-models/venue.model';
import {Licensee} from '../../shared/licensee.model';
import {Subscription} from 'rxjs';
import {LoginTypes} from '../../shared/data-services/constants.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  venues: Venue[];
  licensee: Licensee;
  licensees: Licensee[] = [];
  licenseeSubscription: Subscription;
  resellerSubscription: Subscription;
  isAuthorizedSubscription: Subscription;
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
    console.log('LandingComponent onInit');
    this.session = this.sessionService;
    this.sessionService.resetSaveState();
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized()
      .subscribe(isAuthorized => this.sessionService.isUserAuthorized = isAuthorized);
    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.sessionService.userData = userData;
      if (this.sessionService.userData.hasOwnProperty('emails')) {
        this.sessionService.Email = this.sessionService.userData['emails'][0];
      }
      if (this.sessionService.userData.hasOwnProperty('name')) {
        this.sessionService.UserName = this.sessionService.userData['name'];
      }
    });
    if (this.sessionService.isUserAuthorized) {
      this.sessionService.LoginType = this.websession.get('LoginType');
      console.log('Login Type:' + this.sessionService.LoginType);
      if (this.sessionService.LoginType === LoginTypes.Distributor) {
        console.log('HomeComponent Distributor Login');
        this.resellerDataService.getResellerLicensees();
        this.resellerSubscription = this.resellerService.licenseesChanged
          .subscribe(
            (licensees: Licensee[]) => {
              this.licensees = licensees;
            }
          );
      }
      if (this.sessionService.LoginType === LoginTypes.Operator) {
        console.log('HomeComponent Operator Login');
        this.licenseeDataService.getLicensee(this.session.LicenseeId);
        this.licenseeSubscription = this.licenseeService.licenseesChanged
          .subscribe(
            (licensees: Licensee[]) => {
              this.licensee = licensees[0];
              this.session.LicenseeId = this.licensee.LicId;
              this.sessionService.setLicensee(this.licensee);
              this.venueDataService.getVenues(this.licensee.LicId);
            }
          );
      }
    }
  }

  ngOnDestroy() {
    if (this.licenseeSubscription != null) {
      this.licenseeSubscription.unsubscribe();
    }
    if (this.resellerSubscription != null) {
      this.resellerSubscription.unsubscribe();
    }
    this.isAuthorizedSubscription.unsubscribe();
  }

}
