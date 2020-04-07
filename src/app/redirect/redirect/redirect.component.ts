import {Component, OnDestroy, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-redirect',
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit, OnDestroy {

  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;

  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    console.log('RedirectComponent OnInit');
    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthorized = auth;
      console.log('RedirectComponent: Auth:' + this.isAuthorized);
    });
    this.oidcSecurityService.authorizedCallback();
  }

  ngOnDestroy() {
    this.isAuthorizedSubscription.unsubscribe();
  }
}
