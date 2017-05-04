import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../../venues/venue.service';

@Component({
  selector: 'app-feeitem-list',
  templateUrl: './fee-list.component.html'
})
export class FeeListComponent implements OnInit {
  venue: Venue;
  id: number;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );
  }


}
