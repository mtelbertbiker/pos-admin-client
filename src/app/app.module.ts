import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {VenueService} from './venues/venue.service';
import {VenueDataService} from './shared/data-services/venue-data.service';
import { HeaderComponent } from './core/header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { RentalListComponent } from './posconfig/rentals/rental-list/rental-list.component';
import { RentalItemComponent } from './posconfig/rentals/rental-list/rental-item/rental-item.component';
import { HomeComponent } from './core/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { FeegroupListComponent } from './posconfig/fees/feegroups/feegroup-list/feegroup-list.component';
import { FeeListComponent } from './posconfig/fees/fees/fee-list/fee-list.component';
import { FeeTesterComponent } from './posconfig/fees/feetester/feetester.component';
import { VenueDetailComponent } from './venues/venue-detail/venue-detail.component';
import {ConstantsService} from './shared/data-services/constants.service';
import {SessionService} from './shared/data-services/session.service';
import { RentalItemDetailComponent } from './posconfig/rentals/rental-item-detail/rental-item-detail.component';
import { VenueDetailNavigationComponent } from './venues/venue-detail/venue-detail-navigation/venue-detail-navigation.component';
import { FeegroupItemComponent } from './posconfig/fees/feegroups/feegroup-list/feegroup-item/feegroup-item.component';
import { FeeGroupDetailComponent } from './posconfig/fees/feegroups/feegroup-detail/feegroup-detail.component';
import { FeeItemComponent } from './posconfig/fees/fees/fee-list/fee-item/fee-item.component';
import { FeeItemDetailComponent } from './posconfig/fees/fees/fee-item-detail/fee-item-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FeecalcDataService} from './shared/data-services/feecalc-data.service';
import { FeeCalcTesterResponseComponent } from './posconfig/fees/feetester/feecalctester-response/feecalctester-response.component';
import { FeecalcLogmsgComponent } from './posconfig/fees/feetester/feecalctester-response/feecalc-logmsg.component';
import { FeecalcFeelistComponent } from './posconfig/fees/feetester/feecalctester-response/feecalc-feelist.component';
import { FeecalcFeelistItemComponent } from './posconfig/fees/feetester/feecalctester-response/feecalc-feelist-item.component';
import { FeecalcLogmsgItemComponent } from './posconfig/fees/feetester/feecalctester-response/feecalc-logmsg-item.component';
import { LicenseeListComponent } from './posconfig/licensees/licensee-list/licensee-list.component';
import { ResellerListComponent } from './resellers/reseller-list/reseller-list.component';
import { ResellerDetailComponent } from './resellers/reseller-detail/reseller-detail.component';
import { ResellerLicenseeListComponent } from './resellers/reseller-detail/reseller-licensee-list/reseller-licensee-list.component';
import { ResellerLicenseeItemComponent } from './resellers/reseller-detail/reseller-licensee-item/reseller-licensee-item.component';
import { LicenseeListItemComponent } from './posconfig/licensees/licensee-list/licensee-item/licensee-list-item.component';
import {ResellerDataService} from './shared/data-services/reseller-data.service';
import {ResellerService} from './resellers/reseller.service';
import { LicenseeItemDetailComponent } from './posconfig/licensees/licensee-item-detail/licensee-item-detail.component';
import { ResellerVenueListComponent } from './resellers/reseller-venue-list/reseller-venue-list.component';
import { ResellerVenueItemComponent } from './resellers/reseller-venue-list/reseller-venue-list-item/reseller-venue-list-item.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { environment } from './../environments/environment';
import { RedirectComponent } from './redirect/redirect/redirect.component';
import { VenueListComponent } from './venues/venue-list/venue-list.component';
import { VenueListItemComponent } from './venues/venue-list/venue-list-item/venue-list-item.component';
import {LicenseeDataService} from './shared/data-services/licensee-data.service';
import {LicenseeService} from './shared/licensee.service';

@NgModule({
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
    ResellerLicenseeItemComponent,
    LicenseeListItemComponent,
    LicenseeItemDetailComponent,
    ResellerVenueListComponent,
    ResellerVenueItemComponent,
    RedirectComponent,
    VenueListComponent,
    VenueListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AuthModule.forRoot(),
  ],
  exports: [
  ],
  providers: [VenueService,
    VenueDataService,
    ConstantsService,
    SessionService,
    FeecalcDataService,
    ResellerService,
    ResellerDataService,
    LicenseeDataService,
    LicenseeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(oidcSecurityService: OidcSecurityService) {
    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.stsServer = 'https://login.microsoftonline.com/tfp/feemachines.onmicrosoft.com/b2c_1_susin/oauth2/v2.0/';
    openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:65328/redirect.html';
    openIDImplicitFlowConfiguration.client_id = 'eb3fb956-a476-4329-99ca-0666bec47d65';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    // openIDImplicitFlowConfiguration.scope = 'openid https://feemachine.onmicrosoft.com/api/demo.read';
    openIDImplicitFlowConfiguration.scope = 'openid https://feemachines.com/posadmin/readPosAdmin https://feemachines.com/posadmin/writePosAdmin';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:65328';
    openIDImplicitFlowConfiguration.post_login_route = '/home';
    openIDImplicitFlowConfiguration.forbidden_route = '/home';
    openIDImplicitFlowConfiguration.unauthorized_route = '/home';
    openIDImplicitFlowConfiguration.auto_userinfo = false;
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = !environment.production;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
    openIDImplicitFlowConfiguration.override_well_known_configuration = true;
    openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'https://login.microsoftonline.com/feemachines.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=b2c_1_susin';

    oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
}
