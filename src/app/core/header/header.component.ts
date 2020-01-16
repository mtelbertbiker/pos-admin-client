import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {Subscription} from 'rxjs';
import {Venue} from '../../shared/pos-models/venue.model';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {SessionService} from '../../shared/data-services/session.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';
import {FormTypes, LoginTypes} from '../../shared/data-services/constants.service';
import {SessionStorageService} from 'angular-web-storage';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  licensees: Licensee[];
  venues: Venue[];
  subscription: Subscription;
  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;
  session: SessionService;

  constructor(private venueService: VenueService,
              private router: Router,
              private sessionService: SessionService,
              private licenseeService: LicenseeService,
              public  websession: SessionStorageService,
              private oidcSecurityService: OidcSecurityService) {
    this.isAuthorized = false;
    this.session = sessionService;
  }

  ngOnInit() {
    console.log('HeaderComponent onInit');
     this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized()
      .subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.sessionService.userData = userData;
      this.sessionService.Email = this.sessionService.userData['emails'][0];
      this.sessionService.UserName = this.sessionService.userData['name'];
    });
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.subscription = this.licenseeService.licenseesChanged
      .subscribe(
        (licensees: Licensee[]) => {
          this.licensees = licensees;
        }
      );
  }

  onAddLicensee() {
    const newLicensee = new Licensee(0, 'New Licensee', '', '', '', '', '', '', '', '', '', '', '', '', [], [], [], 0, false, '' );
    newLicensee.Email = this.sessionService.Email;
    newLicensee.ResellerId = this.sessionService.ResellerId;
    const index = this.licenseeService.addLicensee(newLicensee);
    this.sessionService.setLicensee(newLicensee);
    this.sessionService.setSaveState(FormTypes.Licensees, false, true);
    this.router.navigate(['licensee/' + index + '/detail/' ]);
  }

  onSelectLicensee(index: number) {
    this.sessionService.resetSaveState();
    this.sessionService.licensee = this.licensees[index];
    this.router.navigate(['licensee/' + index + '/detail' ]);
  }

  onContactUs() {
    this.router.navigate(['contact']);
  }

  onProductHome() {
    this.router.navigate(['product']);
  }

  showLicenseeLocations() {
    console.log('showLicenseeLocations');
    this.router.navigate(['licensee' + '' + '']);
  }

  signUp(loginType: LoginTypes) {
    this.sessionService.LoginType = loginType;
    this.websession.set('LoginType', loginType);
    this.oidcSecurityService.authorize();
  }

  signOut() {
    this.sessionService.LoginType = LoginTypes.NotSpecified;
    this.websession.set('LoginType', LoginTypes.NotSpecified);
    this.oidcSecurityService.logoff();
  }

  onDuplicateLocation() {
    console.log('onDuplicateLocation');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.isAuthorizedSubscription.unsubscribe();
  }
}
