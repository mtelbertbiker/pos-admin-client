import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {RentalListComponent} from './posconfig/rentals/rental-list/rental-list.component';
import {FeegroupListComponent} from './posconfig/fees/feegroups/feegroup-list/feegroup-list.component';
import {FeeitemListComponent} from './posconfig/fees/feeitems/feeitem-list/feeitem-list.component';
import {FeeTesterComponent} from './posconfig/fees/feetester/feetester.component';
import {VenueDetailComponent} from './venues/venue-detail/venue-detail.component';
import {RentalItemDetailComponent} from './posconfig/rentals/rental-item-detail/rental-item-detail.component';
import {RentalItemComponent} from './posconfig/rentals/rental-list/rental-item/rental-item.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rentals/:id', component: RentalListComponent, children: [
    { path: ':id', component: RentalItemDetailComponent }
    ]
  },
  { path: 'feegroups', component: FeegroupListComponent},
  { path: 'feeitems', component: FeeitemListComponent},
  { path: 'feetester', component: FeeTesterComponent},
  { path: 'venuedetail/:id', component: VenueDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
