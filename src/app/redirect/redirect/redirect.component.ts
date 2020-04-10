import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-redirect',
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    // this.oidcSecurityService.authorizedCallback();
    if (window.location.hash) {
      window.location.hash = decodeURIComponent(window.location.hash);
      // authorizedCallback returns wrong result when hash is URI encoded
      this.oidcSecurityService.authorizedCallback();
    } else {
      this.oidcSecurityService.authorize();
    }
  }

}
