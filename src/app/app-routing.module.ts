import {NgModule} from '@angular/core';
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
import {ItemUsageViewerComponent} from './reports/venuereports/itemusageviewer/itemusageviewer.component';
import {TransactiondetailviewerComponent} from './reports/venuereports/transactiondetailviewer/transactiondetailviewer.component';
import {LicenseeMasterItemComponent} from './posconfig/licensees/licensee-master-item/licensee-master-item.component';
import {VenueListItemComponent} from './venues/venue-list/venue-list-item/venue-list-item.component';
import {VenueListComponent} from './venues/venue-list/venue-list.component';
import {LicenseeUserListComponent} from './posconfig/licensees/licensee-user-list/licensee-user-list.component';
import {LicenseeBillingMasterItemComponent} from './posconfig/licensees/licensee-billing-master-item/licensee-billing-master-item.component';
import {LicenseeVenuesComponent} from './posconfig/licensees/licensee-venues/licensee-venues.component';
import {VenueMasterItemComponent} from './venues/venue-master-item/venue-master-item.component';
import {ProductsComponent} from './core/products/products.component';
import {ContactusComponent} from './core/contactus/contactus.component';
import {LandingComponent} from './core/landing/landing.component';
import {LicenseeUserDetailComponent} from './posconfig/licensees/licensee-user-detail/licensee-user-detail.component';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
    {path: '', component: LandingComponent},
    {path: 'contact', component: ContactusComponent},
    {path: 'product', component: ProductsComponent},
  ]
  },
  {path: 'home', component: HomeComponent},
  {path: 'redirect.html', component: RedirectComponent},
  /*
  {
    path: 'location/:vid/rentals', component: RentalListComponent, children: [
    {path: ':id', component: RentalItemDetailComponent}
  ]
  },
  {
    path: 'location/:vid/feegroups', component: FeegroupListComponent, children: [
    {path: ':id', component: FeeGroupDetailComponent}
  ]
  },
  {
    path: 'location/:vid/fees', component: FeeListComponent, children: [
    {path: ':id/:fid', component: FeeItemDetailComponent}
  ]
  },
  {
    path: 'location/:vid/feetester', component: FeeTesterComponent, children: [
    {path: 'response', component: FeeCalcTesterResponseComponent}
  ]
  },
  {path: 'location/:vid', component: LicenseeItemDetailComponent},
  {path: 'location/:vid/reports/RentalItemUsageReport1', component: ItemUsageViewerComponent},
  {path: 'location/:vid/reports/ItemUseDetailReport2', component: TransactiondetailviewerComponent},
  {path: 'location/:vid', component: VenueDetailComponent},
  {path: 'location/:vid/:detail', component: VenueDetailComponent},
  */
  {
    path: 'licensee/:id', component: LicenseeMasterItemComponent, children: [
    {path: 'detail', component: LicenseeItemDetailComponent},
    {
      path: 'locations/:vid', component: VenueMasterItemComponent, children: [
      {path: 'detail', component: VenueDetailComponent},
      {
        path: 'rentals', component: RentalListComponent, children: [
        {path: ':id', component: RentalItemDetailComponent}
      ]
      },
      {
        path: 'fees', component: FeeListComponent, children: [
        {path: ':id/:fid', component: FeeItemDetailComponent}
      ]
      },
      {
        path: 'feegroups', component: FeegroupListComponent, children: [
        {path: ':id', component: FeeGroupDetailComponent}
      ]
      },
      {
        path: 'feetester', component: FeeTesterComponent, children: [
        {path: 'response', component: FeeCalcTesterResponseComponent}
      ]
      },
      {path: 'reports/RentalItemUsageReport1', component: ItemUsageViewerComponent},
      {path: 'reports/ItemUseDetailReport2', component: TransactiondetailviewerComponent},
    ]
    },
    {path: 'users', component: LicenseeUserListComponent, children: [
      {path: ':uid', component: LicenseeUserDetailComponent}
    ]},
    {path: 'billing', component: LicenseeBillingMasterItemComponent},
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
