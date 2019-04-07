import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {Subscription} from 'rxjs/Subscription';
import {Venue} from '../../shared/pos-models/venue.model';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import {filter, take} from 'rxjs/operators';
import {SessionService} from '../../shared/data-services/session.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';
import {ResellerService} from '../../resellers/reseller.service';
import {FormTypes} from '../../shared/data-services/constants.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  licensees: Licensee[];
  isCollapsed = false;
  isVenueDroppedDown = false;
  isOtherDroppedDown = false;
  isResellerDroppedDown = false;
  venues: Venue[];
  subscription: Subscription;
  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;
  session: SessionService;

  constructor(private venueService: VenueService,
              private router: Router,
              private sessionService: SessionService,
              private licenseeService: LicenseeService,
              private oidcSecurityService: OidcSecurityService) {
    this.isAuthorized = true;
    this.session = sessionService;
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

  onGetLocations() {
    console.log('onGetLocations');
    this.venues = this.venueService.getVenues();
  }

  showResellerLicensees() {
    console.log('showResellerLicensees');
    this.router.navigate(['reseller/licensees']);
  }

  showLicenseeLocations() {
    console.log('showLicenseeLocations');
    this.router.navigate(['licensee' + '' + '']);
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
