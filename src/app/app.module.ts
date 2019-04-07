import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {VenueService} from './venues/venue.service';
import {VenueDataService} from './shared/data-services/venue-data.service';
import {HeaderComponent} from './core/header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {RentalListComponent} from './posconfig/rentals/rental-list/rental-list.component';
import {RentalItemComponent} from './posconfig/rentals/rental-list/rental-item/rental-item.component';
import {HomeComponent} from './core/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FeegroupListComponent} from './posconfig/fees/feegroups/feegroup-list/feegroup-list.component';
import {FeeListComponent} from './posconfig/fees/fees/fee-list/fee-list.component';
import {FeeTesterComponent} from './posconfig/fees/feetester/feetester.component';
import {VenueDetailComponent} from './venues/venue-detail/venue-detail.component';
import {ConstantsService} from './shared/data-services/constants.service';
import {SessionService} from './shared/data-services/session.service';
import {RentalItemDetailComponent} from './posconfig/rentals/rental-item-detail/rental-item-detail.component';
import {VenueDetailNavigationComponent} from './venues/venue-detail/venue-detail-navigation/venue-detail-navigation.component';
import {FeegroupItemComponent} from './posconfig/fees/feegroups/feegroup-list/feegroup-item/feegroup-item.component';
import {FeeGroupDetailComponent} from './posconfig/fees/feegroups/feegroup-detail/feegroup-detail.component';
import {FeeItemComponent} from './posconfig/fees/fees/fee-list/fee-item/fee-item.component';
import {FeeItemDetailComponent} from './posconfig/fees/fees/fee-item-detail/fee-item-detail.component';
import {FeecalcDataService} from './shared/data-services/feecalc-data.service';
import {FeeCalcTesterResponseComponent} from './posconfig/fees/feetester/feecalctester-response/feecalctester-response.component';
import {FeecalcLogmsgComponent} from './posconfig/fees/feetester/feecalctester-response/feecalc-logmsg.component';
import {FeecalcFeelistComponent} from './posconfig/fees/feetester/feecalctester-response/feecalc-feelist.component';
import {FeecalcFeelistItemComponent} from './posconfig/fees/feetester/feecalctester-response/feecalc-feelist-item.component';
import {FeecalcLogmsgItemComponent} from './posconfig/fees/feetester/feecalctester-response/feecalc-logmsg-item.component';
import {LicenseeListComponent} from './posconfig/licensees/licensee-list/licensee-list.component';
import {ResellerListComponent} from './resellers/reseller-list/reseller-list.component';
import {ResellerDetailComponent} from './resellers/reseller-detail/reseller-detail.component';
import {ResellerLicenseeListComponent} from './resellers/reseller-detail/reseller-licensee-list/reseller-licensee-list.component';
import {ResellerLicenseeItemListComponent} from './resellers/reseller-detail/reseller-licensee-list-item/reseller-licensee-list-item.component';
import {LicenseeListItemComponent} from './posconfig/licensees/licensee-list/licensee-item/licensee-list-item.component';
import {ResellerDataService} from './shared/data-services/reseller-data.service';
import {ResellerService} from './resellers/reseller.service';
import {LicenseeItemDetailComponent} from './posconfig/licensees/licensee-item-detail/licensee-item-detail.component';
import {ResellerVenueListComponent} from './resellers/reseller-venue-list/reseller-venue-list.component';
import {ResellerVenueItemComponent} from './resellers/reseller-venue-list/reseller-venue-list-item/reseller-venue-list-item.component';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';

import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import {environment} from './../environments/environment';
import {RedirectComponent} from './redirect/redirect/redirect.component';
import {VenueListComponent} from './venues/venue-list/venue-list.component';
import {VenueListItemComponent} from './venues/venue-list/venue-list-item/venue-list-item.component';
import {LicenseeDataService} from './shared/data-services/licensee-data.service';
import {LicenseeService} from './shared/licensee.service';
import {CookieService} from 'ngx-cookie-service';
import {TelerikReportingModule} from '@progress/telerik-angular-report-viewer';
import {ItemUsageViewerComponent} from './reports/venuereports/itemusageviewer/itemusageviewer.component';
import {TransactiondetailviewerComponent} from './reports/venuereports/transactiondetailviewer/transactiondetailviewer.component';
import { LicenseeMasterItemComponent } from './posconfig/licensees/licensee-master-item/licensee-master-item.component';
import { LicenseeMasterItemNavigationComponent } from './posconfig/licensees/licensee-master-item/licensee-master-item-navigation/licensee-master-item-navigation.component';
import { LicenseeUserListComponent } from './posconfig/licensees/licensee-user-list/licensee-user-list.component';
import { LicenseeBillingMasterItemComponent } from './posconfig/licensees/licensee-billing-master-item/licensee-billing-master-item.component';
import { LicenseeVenuesComponent } from './posconfig/licensees/licensee-venues/licensee-venues.component';
import { VenueMasterItemComponent } from './venues/venue-master-item/venue-master-item.component';
import { ContactusComponent } from './core/contactus/contactus.component';
import { ProductsComponent } from './core/products/products.component';
import { LandingComponent } from './core/landing/landing.component';
import { LicenseeSaveCancelModalComponent } from './posconfig/licensees/licensee-master-item/licensee-master-item-navigation/licensee-save-cancel-modal/licensee-save-cancel-modal.component';
import { LicenseeUserItemComponent } from './posconfig/licensees/licensee-user-list/licensee-user-item/licensee-user-item.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');
//  return () => oidcConfigService.load(`${window.location.origin}/api/ClientAppSettings`);
}

@NgModule({
  entryComponents: [LicenseeSaveCancelModalComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    RentalListComponent,
    RentalItemComponent,
    HomeComponent,
    FeegroupListComponent,
    FeeListComponent,
    FeeTesterComponent,
    VenueDetailComponent,
    RentalItemDetailComponent,
    VenueDetailNavigationComponent,
    FeegroupItemComponent,
    FeeGroupDetailComponent,
    FeeItemComponent,
    FeeItemDetailComponent,
    FeeCalcTesterResponseComponent,
    FeecalcLogmsgComponent,
    FeecalcFeelistComponent,
    FeecalcFeelistItemComponent,
    FeecalcLogmsgItemComponent,
    LicenseeListComponent,
    ResellerListComponent,
    ResellerDetailComponent,
    ResellerLicenseeListComponent,
    ResellerLicenseeItemListComponent,
    LicenseeListItemComponent,
    LicenseeItemDetailComponent,
    ResellerVenueListComponent,
    ResellerVenueItemComponent,
    RedirectComponent,
    VenueListComponent,
    VenueListItemComponent,
    ItemUsageViewerComponent,
    TransactiondetailviewerComponent,
    LicenseeMasterItemComponent,
    LicenseeMasterItemNavigationComponent,
    LicenseeUserListComponent,
    LicenseeBillingMasterItemComponent,
    LicenseeVenuesComponent,
    VenueMasterItemComponent,
    ContactusComponent,
    ProductsComponent,
    LandingComponent,
    LicenseeSaveCancelModalComponent,
    LicenseeUserItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TelerikReportingModule,
    NgbModule.forRoot(),
    AuthModule.forRoot(),
  ],
  exports: [],
  providers: [
    VenueService,
    VenueDataService,
    ConstantsService,
    SessionService,
    FeecalcDataService,
    ResellerService,
    ResellerDataService,
    LicenseeDataService,
    LicenseeService,
    CookieService,
    /*
     OidcConfigService,
     {
     provide: APP_INITIALIZER,
     useFactory: loadConfig,
     deps: [OidcConfigService],
     multi: true,
     },
     */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService,
              private oidcConfigService: OidcConfigService) {
    /*
     this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
     const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
     openIDImplicitFlowConfiguration.stsServer = this.oidcConfigService.clientConfiguration.stsServer;
     openIDImplicitFlowConfiguration.redirect_url = this.oidcConfigService.clientConfiguration.redirect_url;
     // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer
     // identified by the iss (issuer) Claim as an audience.
     // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience,
     // or if it contains additional audiences not trusted by the Client.
     openIDImplicitFlowConfiguration.client_id = this.oidcConfigService.clientConfiguration.client_id;
     openIDImplicitFlowConfiguration.response_type = this.oidcConfigService.clientConfiguration.response_type;
     openIDImplicitFlowConfiguration.scope = this.oidcConfigService.clientConfiguration.scope;
     openIDImplicitFlowConfiguration.post_logout_redirect_uri = this.oidcConfigService.clientConfiguration.post_logout_redirect_uri;
     openIDImplicitFlowConfiguration.start_checksession = this.oidcConfigService.clientConfiguration.start_checksession;
     openIDImplicitFlowConfiguration.silent_renew = this.oidcConfigService.clientConfiguration.silent_renew;
     openIDImplicitFlowConfiguration.silent_renew_url = this.oidcConfigService.clientConfiguration.silent_renew_url;
     openIDImplicitFlowConfiguration.post_login_route = this.oidcConfigService.clientConfiguration.startup_route;
     // HTTP 403
     openIDImplicitFlowConfiguration.forbidden_route = this.oidcConfigService.clientConfiguration.forbidden_route;
     // HTTP 401
     openIDImplicitFlowConfiguration.unauthorized_route = this.oidcConfigService.clientConfiguration.unauthorized_route;
     openIDImplicitFlowConfiguration.log_console_warning_active = this.oidcConfigService.clientConfiguration.log_console_warning_active;
     openIDImplicitFlowConfiguration.log_console_debug_active = this.oidcConfigService.clientConfiguration.log_console_debug_active;
     // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
     // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
     openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds =
     this.oidcConfigService.clientConfiguration.max_id_token_iat_offset_allowed_in_seconds;

     const authWellKnownEndpoints = new AuthWellKnownEndpoints();
     authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

     this.oidcSecurityService.setupModule(
     openIDImplicitFlowConfiguration,
     authWellKnownEndpoints
     );
     });
     */

    console.log('Fee Machine Starting...');
    /*
     const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
     openIDImplicitFlowConfiguration.stsServer =
     'https://login.microsoftonline.com/tfp/feemachines.onmicrosoft.com/b2c_1_susin/oauth2/v2.0/';
     openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:65328/redirect.html';
     // openIDImplicitFlowConfiguration.redirect_url = 'https://www.feemachine.com/redirect.html';
     // openIDImplicitFlowConfiguration.redirect_url = 'https://fm-posadminclientprod1.azurewebsites.net/redirect.html';
     openIDImplicitFlowConfiguration.client_id = 'eb3fb956-a476-4329-99ca-0666bec47d65';
     openIDImplicitFlowConfiguration.response_type = 'id_token token';
     // openIDImplicitFlowConfiguration.scope = 'openid https://feemachine.onmicrosoft.com/api/demo.read';
     openIDImplicitFlowConfiguration.scope =
     'openid https://feemachines.com/posadmin/readPosAdmin https://feemachines.com/posadmin/writePosAdmin';
     // openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'https://www.feemachine.com';
     openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:65328';
     // openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'https://fm-posadminclientprod1.azurewebsites.net';
     openIDImplicitFlowConfiguration.start_checksession = false;
     openIDImplicitFlowConfiguration.silent_renew = false;
     openIDImplicitFlowConfiguration.post_login_route = '/home';
     openIDImplicitFlowConfiguration.forbidden_route = '/home';
     openIDImplicitFlowConfiguration.unauthorized_route = '/home';
     openIDImplicitFlowConfiguration.auto_userinfo = false;
     openIDImplicitFlowConfiguration.log_console_warning_active = true;
     openIDImplicitFlowConfiguration.log_console_debug_active = !environment.production;
     openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
     // openIDImplicitFlowConfiguration.override_well_known_configuration = true;
     // openIDImplicitFlowConfiguration.override_well_known_configuration_url =
     //  'https://login.microsoftonline.com/feemachines.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=b2c_1_susin';

     const authWellKnownEndpoints = new AuthWellKnownEndpoints();
     authWellKnownEndpoints.issuer = 'https://localhost:65328';

     authWellKnownEndpoints.jwks_uri =
     'https://localhost:65328/.well-known/openid-configuration/jwks';
     authWellKnownEndpoints.authorization_endpoint = 'https://localhost:65328/connect/authorize';
     authWellKnownEndpoints.token_endpoint = 'https://localhost:65328/connect/token';
     authWellKnownEndpoints.userinfo_endpoint = 'https://localhost:65328/connect/userinfo';
     authWellKnownEndpoints.end_session_endpoint = 'https://localhost:65328/connect/endsession';
     authWellKnownEndpoints.check_session_iframe =
     'https://localhost:65328/connect/checksession';
     authWellKnownEndpoints.revocation_endpoint = 'https://localhost:65328/connect/revocation';
     authWellKnownEndpoints.introspection_endpoint =
     'https://localhost:65328/connect/introspect';

     oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);
     */
  }
}

// platformBrowserDynamic().bootstrapModule(AppModule);
