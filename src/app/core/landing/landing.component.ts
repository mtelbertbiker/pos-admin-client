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
import {LogService} from '../../shared/log.service';

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
              private log: LogService,
              private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.log.logTrace('LandingComponent onInit');
    this.session = this.sessionService;
    this.sessionService.resetSaveState();
    this.oidcSecurityService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.sessionService.isUserAuthorized = isAuthenticated;
    });
    this.oidcSecurityService.userData$.subscribe((userData: any) => {
      if (userData) {
        this.sessionService.userData = userData;
        if (this.sessionService.userData.hasOwnProperty('emails')) {
          this.sessionService.Email = this.sessionService.userData['emails'][0];
        }
        if (this.sessionService.userData.hasOwnProperty('name')) {
          this.sessionService.UserName = this.sessionService.userData['name'];
        }
        if (this.sessionService.isUserAuthorized) {
          console.log('Authorized User:' + this.sessionService.Email);
          this.sessionService.LoginType = this.websession.get('LoginType');
          this.log.logTrace('Login Type:' + this.sessionService.LoginType);
          if (this.sessionService.LoginType === LoginTypes.Distributor) {
            this.log.logTrace('HomeComponent Distributor Login');
            this.resellerDataService.getResellerLicensees();
            this.resellerSubscription = this.resellerService.licenseesChanged
              .subscribe(
                (licensees: Licensee[]) => {
                  this.licensees = licensees;
                }
              );
          }
          if (this.sessionService.LoginType === LoginTypes.Operator) {
            this.log.logTrace('HomeComponent Operator Login');
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
    });
  }

  ngOnDestroy() {
    if (this.licenseeSubscription) {
      this.licenseeSubscription.unsubscribe();
    }
    if (this.resellerSubscription) {
      this.resellerSubscription.unsubscribe();
    }
  }

}
