import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {RentalListComponent} from './posconfig/rentals/rental-list/rental-list.component';
import {FeegroupListComponent} from './posconfig/fees/feegroups/feegroup-list/feegroup-list.component';
import {FeeListComponent} from './posconfig/fees/fees/fee-list/fee-list.component';
import {FeeTesterComponent} from './posconfig/fees/feetester/feetester.component';
import {VenueDetailComponent} from './venues/venue-detail/venue-detail.component';
import {RentalItemDetailComponent} from './posconfig/rentals/rental-item-detail/rental-item-detail.component';
import {RentalItemComponent} from './posconfig/rentals/rental-list/rental-item/rental-item.component';
import {FeeGroupDetailComponent} from './posconfig/fees/feegroups/feegroup-detail/feegroup-detail.component';
import {FeeItemDetailComponent} from './posconfig/fees/fees/fee-item-detail/fee-item-detail.component';
import {FeeCalcTesterResponseComponent} from './posconfig/fees/feetester/feecalctester-response/feecalctester-response.component';
import {LicenseeListComponent} from './posconfig/licensees/licensee-list/licensee-list.component';
import {ResellerDetailComponent} from './resellers/reseller-detail/reseller-detail.component';
import {LicenseeItemDetailComponent} from './posconfig/licensees/licensee-item-detail/licensee-item-detail.component';
import {RedirectComponent} from './redirect/redirect/redirect.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'licensee/:id', component: LicenseeItemDetailComponent},
  { path: 'home/licensee/:id', component: LicenseeItemDetailComponent},
  { path: 'redirect.html', component: RedirectComponent },
  { path: 'location/:vid/rentals', component: RentalListComponent, children: [
    { path: ':id', component: RentalItemDetailComponent }
    ]
  },
  { path: 'location/:vid/feegroups', component: FeegroupListComponent, children: [
    { path: ':id', component: FeeGroupDetailComponent }
  ]},
  { path: 'location/:vid/fees', component: FeeListComponent, children: [
    { path: ':id/:fid', component: FeeItemDetailComponent }
  ]},
  { path: 'location/:vid/feetester', component: FeeTesterComponent, children: [
    { path: 'response', component: FeeCalcTesterResponseComponent }
  ]},

  { path: 'location/:vid', component: VenueDetailComponent},
  { path: 'location/:vid/:detail', component: VenueDetailComponent},
  { path: 'reseller/licensees', component: LicenseeListComponent , children: [
      { path: ':id', component: LicenseeItemDetailComponent }
    ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
