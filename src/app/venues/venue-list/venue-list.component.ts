import {Component, Input, OnInit} from '@angular/core';
import {Venue} from '../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../shared/data-services/session.service';
import {VenueService} from '../venue.service';
import {Licensee} from '../../shared/licensee.model';
import {LicenseeService} from '../../shared/licensee.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css'],
})
export class VenueListComponent implements OnInit {
  @Input() venues: Venue[];
  id: number;
  licensee: Licensee;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private licenseeService: LicenseeService,
              private venueService: VenueService) {
    console.log('Starting VenueListComponent');
  }

  ngOnInit() {
    console.log('app-venue-list init');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
          this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
        }
      );
  }

  onAddLocation() {
    console.log('onAddLocation');
    const newVenue = new Venue();
    newVenue.LicId = this.sessionService.getLicenseeId();
    const index = this.venueService.addVenue(newVenue);
    this.router.navigate(['location/' + index + '/1']);
  }

}
