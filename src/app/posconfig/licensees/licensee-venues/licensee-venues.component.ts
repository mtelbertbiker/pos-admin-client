import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Venue} from '../../../shared/pos-models/venue.model';
import {Licensee} from '../../../shared/licensee.model';
import {ActivatedRoute, Params} from '@angular/router';
import {VenueService} from '../../../venues/venue.service';
import {LicenseeService} from '../../../shared/licensee.service';

@Component({
  selector: 'app-licensee-venues',
  templateUrl: './licensee-venues.component.html',
  styleUrls: ['./licensee-venues.component.css']
})
export class LicenseeVenuesComponent implements OnInit {
  licensee: Licensee;
  venues: Venue[];
  id: number;
  licenseeVenuesForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private licenseeService: LicenseeService,
              private venueService: VenueService
  ) { }

  ngOnInit() {
    console.log('Licensee Venues Component onInit');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
          this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
          this.initForm();
        }
      );
  }

  initForm() {
    this.licenseeVenuesForm = new FormGroup(
      {}
    );
  }

}
