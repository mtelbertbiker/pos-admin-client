import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER, ErrorHandler} from '@angular/core';
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
import {LicenseeMasterItemComponent} from './posconfig/licensees/licensee-master-item/licensee-master-item.component';
import {LicenseeMasterItemNavigationComponent} from './posconfig/licensees/licensee-master-item/licensee-master-item-navigation/licensee-master-item-navigation.component';
import {LicenseeUserListComponent} from './posconfig/licensees/licensee-user-list/licensee-user-list.component';
import {LicenseeBillingMasterItemComponent} from './posconfig/licensees/billing/licensee-billing-master-item/licensee-billing-master-item.component';
import {LicenseeVenuesComponent} from './posconfig/licensees/licensee-venues/licensee-venues.component';
import {VenueMasterItemComponent} from './venues/venue-master-item/venue-master-item.component';
import {ContactusComponent} from './core/contactus/contactus.component';
import {ProductsComponent} from './core/products/products.component';
import {LandingComponent} from './core/landing/landing.component';
import {LicenseeSaveCancelModalComponent} from './posconfig/licensees/licensee-master-item/licensee-master-item-navigation/licensee-save-cancel-modal/licensee-save-cancel-modal.component';
import {LicenseeUserItemComponent} from './posconfig/licensees/licensee-user-list/licensee-user-item/licensee-user-item.component';
import {LicenseeUserDetailComponent} from './posconfig/licensees/licensee-user-detail/licensee-user-detail.component';
import {ConfirmDeletionModalComponent} from './shared/confirm-deletion-modal/confirm-deletion-modal.component';
import {FloorplanListComponent} from './posconfig/floorplans/floorplan-list/floorplan-list.component';
import {FloorplanlistItemComponent} from './posconfig/floorplans/floorplan-list/floorplanlist-item/floorplanlist-item.component';
import {FloorplanComponent} from './posconfig/floorplans/floorplan/floorplan.component';
import {FloorplanItemComponent} from './posconfig/floorplans/floorplan/floorplan-item/floorplan-item.component';
import {FloorplanlistItemDetailComponent} from './posconfig/floorplans/floorplan-list/floorplanlist-item-detail/floorplanlist-item-detail.component';
import {FloorplanRentalListComponent} from './posconfig/floorplans/floorplan/floorplan-rental-list/floorplan-rental-list.component';
import {AngularWebStorageModule} from 'angular-web-storage';
import { ContactusRequestSentComponent } from './core/contactus/contactus-request-sent/contactus-request-sent.component';
import { CopyVenueModalComponent } from './venues/venue-detail/copy-venue-modal/copy-venue-modal.component';
import { VenueReportsComponent } from './reports/venuereports/venuereports.component';
import {ErrorHandlerService} from './shared/errorhandler.service';
import {LogService} from './shared/log.service';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './core/forbidden/forbidden.component';
import {loadStripe} from '@stripe/stripe-js/pure';
import { LicenseePricingComponent } from './posconfig/licensees/billing/licensee-pricing/licensee-pricing.component';
import { LicenseePaymentComponent } from './posconfig/licensees/billing/licensee-payment/licensee-payment.component';
import {CancelSubscriptionModalComponent} from './posconfig/licensees/billing/cancel-subscription-modal/cancel-subscription-modal.component';
import { SubscriptionCreatedModalComponent } from './posconfig/licensees/billing/subscription-created-modal/subscription-created-modal.component';
import { SubscriptionCancelledModalComponent } from './posconfig/licensees/billing/subscription-cancelled-modal/subscription-cancelled-modal.component';
import { UpdateSubscriptionModalComponent } from './posconfig/licensees/billing/update-subscription-modal/update-subscription-modal.component';
import { SubscriptionUpdatedModalComponent } from './posconfig/licensees/billing/subscription-updated-modal/subscription-updated-modal.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load_using_custom_stsServer(
    'https://login.microsoftonline.com/feemachines.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=b2c_1_susin');
}

@NgModule({
  entryComponents: [
    ConfirmDeletionModalComponent,
    ContactusRequestSentComponent,
    LicenseeSaveCancelModalComponent,
    CopyVenueModalComponent,
    CancelSubscriptionModalComponent,
    SubscriptionCreatedModalComponent,
    SubscriptionCancelledModalComponent,
    UpdateSubscriptionModalComponent,
    SubscriptionUpdatedModalComponent
  ],
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
    LicenseeUserDetailComponent,
    ConfirmDeletionModalComponent,
    FloorplanListComponent,
    FloorplanlistItemComponent,
    FloorplanComponent,
    FloorplanItemComponent,
    FloorplanlistItemDetailComponent,
    FloorplanRentalListComponent,
    ContactusRequestSentComponent,
    CopyVenueModalComponent,
    VenueReportsComponent,
    VenueReportsComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    LicenseePricingComponent,
    LicenseePaymentComponent,
    CancelSubscriptionModalComponent,
    SubscriptionCreatedModalComponent,
    SubscriptionCancelledModalComponent,
    UpdateSubscriptionModalComponent,
    SubscriptionUpdatedModalComponent,
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
    AngularWebStorageModule,
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
    OidcConfigService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService,
              private log: LogService,
              private oidcConfigService: OidcConfigService) {
    this.log.logTrace('Fee Machine Starting...');

    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIDImplicitFlowConfiguration.stsServer
        = 'https://login.microsoftonline.com/tfp/feemachines.onmicrosoft.com/b2c_1_susin/oauth2/v2.0/';
      // openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:65328/redirect.html';   // Use for local debugging
       openIDImplicitFlowConfiguration.redirect_url = 'https://www.feemachine.com/redirect.html'; // Use for Production
      openIDImplicitFlowConfiguration.client_id = 'e0795570-377a-4064-8678-246db4734c21';
      //      openIDImplicitFlowConfiguration.client_id = 'eb3fb956-a476-4329-99ca-0666bec47d65';
      openIDImplicitFlowConfiguration.response_type = 'id_token token';
      openIDImplicitFlowConfiguration.scope =
        'openid https://feemachines.com/posadmin/readPosAdmin https://feemachines.com/posadmin/writePosAdmin';
      // openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:65328';
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://feemachine.com';
      openIDImplicitFlowConfiguration.post_login_route = '';
      openIDImplicitFlowConfiguration.forbidden_route = 'forbidden';
      openIDImplicitFlowConfiguration.unauthorized_route = 'unauthorized';
      openIDImplicitFlowConfiguration.auto_userinfo = false;
      openIDImplicitFlowConfiguration.log_console_warning_active = true;
      openIDImplicitFlowConfiguration.log_console_debug_active = !environment.production;
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 30;

      const authWellKnownEndpoints = new AuthWellKnownEndpoints();

      authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);
      this.log.logTrace('Exiting AppModule constructor');

    });
  }
}



// platformBrowserDynamic().bootstrapModule(AppModule);  - Uncommenting this causes duplicate startup calls
