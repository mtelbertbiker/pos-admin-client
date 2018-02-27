import { Component, OnInit } from '@angular/core';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {VenueService} from '../../venues/venue.service';
import {Venue} from '../../shared/pos-models/venue.model';
import {Subscription} from 'rxjs/Subscription';
import {LicenseeDataService} from '../../shared/data-services/licensee-data.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  venues: Venue[];
  licensee: Licensee = new Licensee(0,'','','','','','','','','','','','','',null, false,'');
  venueSubscription: Subscription;
  licenseeSubscription: Subscription;

  constructor(private venueDataService: VenueDataService,
              private venueService: VenueService,
              private licenseeDataService: LicenseeDataService,
              private licenseeService: LicenseeService) { }

  ngOnInit() {
    console.log('HomeComponent onInit');
    this.venueDataService.getVenues();
    this.licenseeDataService.getLicensee(0);
    this.venueSubscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.licenseeSubscription = this.licenseeService.licenseesChanged
      .subscribe(
        (licensees: Licensee[]) => {
          this.licensee = licensees[0];
        }
      );
  }

}
