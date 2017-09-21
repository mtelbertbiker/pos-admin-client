import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  exports: [
  ],
  providers: [VenueService, VenueDataService, ConstantsService, SessionService, FeecalcDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
