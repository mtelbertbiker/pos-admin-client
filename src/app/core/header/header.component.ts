import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {interval, Subscription} from 'rxjs';
import {Venue} from '../../shared/pos-models/venue.model';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {SessionService} from '../../shared/data-services/session.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';
import { FormTypes, LoginTypes} from '../../shared/data-services/constants.service';
import {SessionStorageService} from 'angular-web-storage';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {LogService} from '../../shared/log.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  licensees: Licensee[];
  venues: Venue[];
  venueSubscription: Subscription;
  licenseeSubscription: Subscription;
  isErrorSubscription: Subscription;
  session: SessionService;
  error: string;
  errorUrl: string;
  errorCode: string;

  constructor(private venueService: VenueService,
              private venueDataService: VenueDataService,
              private router: Router,
              public sessionService: SessionService,
              private licenseeService: LicenseeService,
              public  websession: SessionStorageService,
              private log: LogService,
              private oidcSecurityService: OidcSecurityService) {
    this.session = sessionService;
  }

  ngOnInit() {
    this.log.logTrace('HeaderComponent OnInit');
    this.isErrorSubscription = interval(1000).subscribe(count => {
      // console.log('Error check:' + count);
      if (this.sessionService.Error != null) {
        this.errorUrl = '';
        this.errorCode = '';
        if ('status' in this.sessionService.Error) {
          this.errorCode = this.sessionService.Error.status.toString();
        }
        if (this.errorCode === '401') { // Unauthorized
          this.error = 'Please Sign In';
          this.sessionService.isUserAuthorized = false;
        } else {
          if ('message' in this.sessionService.Error) {
            this.error = this.sessionService.Error.message;
          }
          if ('error' in this.sessionService.Error) {
            if ('ExceptionMessage' in this.sessionService.Error['error']) {
              this.error = this.sessionService.Error['error']['ExceptionMessage'];
              if ('url' in this.sessionService.Error) {
                this.errorUrl = this.sessionService.Error.url;
              }
            }
            if ('Message' in this.sessionService.Error['error']) {
              this.error = this.sessionService.Error['error']['Message'];
            }
          }
        }
      }
    });
    this.venues = this.venueService.getVenues();
    this.venueSubscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.licensees = this.licenseeService.getLicensees();
    this.licenseeSubscription = this.licenseeService.licenseesChanged
      .subscribe(
        (licensees: Licensee[]) => {
          this.licensees = licensees;
        }
      );
  }

  onAddLicensee() {
    const newLicensee = new Licensee(0, 'New Licensee', '', '', '', '', '', '', '', '', '', '', '', '', [], [], [], 0, false, '');
    newLicensee.Email = this.sessionService.Email;
    newLicensee.ResellerId = this.sessionService.ResellerId;
    const index = this.licenseeService.addLicensee(newLicensee);
    this.sessionService.setLicensee(newLicensee);
    this.sessionService.setSaveState(FormTypes.Licensees, false, true);
    this.router.navigate(['licensee/' + index + '/detail/']);
  }

  onSelectLicensee(index: number) {
    this.sessionService.resetSaveState();
    this.sessionService.licensee = this.licensees[index];
    this.venueDataService.getVenues(this.sessionService.licensee.LicId);
    this.router.navigate(['licensee/' + index + '/detail']);
  }

  onContactUs() {
    this.router.navigate(['contact']);
  }

  onProductHome() {
    this.router.navigate(['product']);
  }

  showLicenseeLocations() {
    this.sessionService.resetSaveState();
    this.sessionService.licensee = this.licensees[0];
    this.router.navigate(['licensee/' + 0 + '/detail']);
  }

  operatorSignIn() {
    this.sessionService.LoginType = LoginTypes.Operator;
    this.websession.set('LoginType', LoginTypes.Operator);
    this.oidcSecurityService.authorize();
  }

  signOut() {
    this.sessionService.LoginType = LoginTypes.NotSpecified;
    this.websession.set('LoginType', LoginTypes.NotSpecified);
    this.oidcSecurityService.logoff();
  }

  onHandleError() {
    this.error = null;
    this.sessionService.Error = null;
  }

  ngOnDestroy() {
    this.venueSubscription.unsubscribe();
    this.licenseeSubscription.unsubscribe();
    this.isErrorSubscription.unsubscribe();
  }
}
