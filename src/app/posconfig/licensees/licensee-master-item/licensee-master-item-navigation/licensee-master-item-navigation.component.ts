import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {VenueService} from '../../../../venues/venue.service';
import {LicenseeService} from '../../../../shared/licensee.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Licensee} from '../../../../shared/licensee.model';

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
}
