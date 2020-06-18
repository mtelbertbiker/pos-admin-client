import {Component, OnInit} from '@angular/core';
import {LicenseeService} from '../../../shared/licensee.service';
import {Subscription} from 'rxjs';
import {Licensee} from '../../../shared/licensee.model';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {LogService} from '../../../shared/log.service';

@Component({
  selector: 'app-licensee-master-item',
  templateUrl: './licensee-master-item.component.html',
})
export class LicenseeMasterItemComponent implements OnInit {
  licensee: Licensee;
  venues: Venue[];
  id: number;
  licenseeMasterItemForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private licenseeService: LicenseeService,
              private log: LogService,
              private venueService: VenueService) {
  }

  ngOnInit() {
    this.log.logTrace('LicenseeMasterItemComponent onInit');
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
    this.licenseeMasterItemForm = new FormGroup(
      {}
    );
  }


}
