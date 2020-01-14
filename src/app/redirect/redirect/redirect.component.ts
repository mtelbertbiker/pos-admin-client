import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Observable, Subscription} from 'rxjs';
import {map, switchMapTo, take} from 'rxjs/operators';

@Component({
  selector: 'app-redirect',
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit {

  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;

  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService.authorizedCallback();
  }
  /*
  ngOnInit() {
    console.log('RedirectComponent OnInit');
    // this.oidcSecurityService.getIsAuthorized();
    this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthorized = auth;
      console.log('Auth:' + this.isAuthorized);
    });
  }
*/
}
