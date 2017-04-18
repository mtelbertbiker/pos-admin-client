import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VenueItemComponent } from './venues/venue-list/venue-item/venue-item.component';
import {VenueListComponent} from './venues/venue-list/venue-list.component';
import {VenueService} from './venues/venue.service';
import {VenueDataService} from './shared/data-services/venue-data.service';
import { HeaderComponent } from './core/header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { RentalListComponent } from './posconfig/rentals/rental-list/rental-list.component';
import { RentalItemComponent } from './posconfig/rentals/rental-list/rental-item/rental-item.component';
import { HomeComponent } from './core/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { FeegroupListComponent } from './posconfig/fees/feegroups/feegroup-list/feegroup-list.component';
import { FeeitemListComponent } from './posconfig/fees/feeitems/feeitem-list/feeitem-list.component';
import { FeeTesterComponent } from './posconfig/fees/feetester/feetester.component';
import { VenueDetailComponent } from './venues/venue-detail/venue-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    VenueListComponent,
    VenueItemComponent,
    HeaderComponent,
    DropdownDirective,
    RentalListComponent,
    RentalItemComponent,
    HomeComponent,
    FeegroupListComponent,
    FeeitemListComponent,
    FeeTesterComponent,
    VenueDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [
  ],
  providers: [VenueService, VenueDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
