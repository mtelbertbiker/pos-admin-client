import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {VenueService} from '../../../../venues/venue.service';
import {LicenseeService} from '../../../../shared/licensee.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Licensee} from '../../../../shared/licensee.model';
import {SessionService} from '../../../../shared/data-services/session.service';
import {LicenseeDataService} from '../../../../shared/data-services/licensee-data.service';

@Component({
  selector: 'app-licensee-master-item-navigation',
  templateUrl: './licensee-master-item-navigation.component.html',
  styleUrls: ['./licensee-master-item-navigation.component.css']
})
export class LicenseeMasterItemNavigationComponent implements OnInit {
  id: number;
  venues: Venue[];
  licensee: Licensee;

  constructor(private route: ActivatedRoute,
              private licenseeService: LicenseeService,
              private licenseeDataService: LicenseeDataService,
              public sessionService: SessionService,
              private venueService: VenueService,
              private router: Router) { }

  ngOnInit() {
    console.log('Licensee Master Item Navigation Component onInit');
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
          this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
        }
      );
  }

  onSelectVenue(index: number) {
    this.router.navigate(['licensee/' + index + '/locations/' + index + '/detail/' + index]);
  }

  onSave() {
    this.licenseeDataService.putLicensee(this.licensee)
      .subscribe(
        (response: Response) => {
          console.log(response);
          let licensee: any;
          licensee = response;
          this.sessionService.setLicensee(licensee);
          alert('Licensee Saved');
          this.router.navigate(['home']);
        },
        response => {
          console.log(response);
          alert('Save Request failed: ' + response.message);
        }
      );
  }

  /*
  onSubmit() {
    this.venueDataService.putVenue(this.id)
      .subscribe(
        val => {
          let venue: any;
          venue = val;
          this.venueService.updateVenue(this.id, venue);
          alert('Location Saved');
        },
        response => {
          console.log(response);
          alert('Save Request failed: ' + response.message);
        }
      );
  }
  */

  onCancel() {
    this.router.navigate(['home']);
  }

}
