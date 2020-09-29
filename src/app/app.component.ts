import {Component, OnInit, OnDestroy} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {UserFlow} from './shared/data-services/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public oidcSecurityService: OidcSecurityService, private router: Router) {
  }

  ngOnInit() {

    /*
    this.router.events.subscribe(e => {
//// LET's go straight to the point....
      if (e instanceof NavigationStart) {
          // HINT: this is the best place I've found to handle callbacks and redirections back to an Angular site,
          // before even consider Auth stuff     ;)   So, in our case:
          if (window.location.href.includes('AADB2C90118')) {
            // We have to redirect the user to:
            window.location.assign(
              'https://feemachines.b2clogin.com/feemachines.onmicrosoft.com/oauth2/v2.0/authorize?'
              + 'p=' + UserFlow.ResetPsw   // Your Reset policy (user flow) Name
              + '&client_id=e0795570-377a-4064-8678-246db4734c21'  // Your client ID
              + '&nonce=defaultNonce'
              + '&redirect_uri=https://localhost:65328'   // ;)
              + '&scope=openid' //
              + '&response_type=id_token&prompt=login');
          }
      }
    });
*/

    this.oidcSecurityService
      .checkAuth()
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          if ('/autologin' !== window.location.pathname) {
            this.write('redirect', window.location.pathname);
            this.router.navigate(['/']);
          }
        }
        if (isAuthenticated) {
          this.navigateToStoredEndpoint();
        }
      });
  }

  ngOnDestroy(): void {
  }

  private navigateToStoredEndpoint() {
    const path = this.read('redirect');

    if (this.router.url === path) {
      return;
    }

    if (path.toString().includes('/unauthorized')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}


