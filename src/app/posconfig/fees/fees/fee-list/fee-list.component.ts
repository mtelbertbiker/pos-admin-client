import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../../venues/venue.service';
import {Fee} from '../../../../shared/pos-models/fee.model';

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

  onAddFee(index: number) {
    const newFee: Fee = new Fee(0,
      0,
      0,
      'New Fee',
      new Date(1, 0, 1, 0, 0, 0),
      new Date(1, 0, 1, 0, 0, 0),
      new Date('0001-01-01 00:00:00 UTC'),
      new Date('0001-01-01 00:00:00 UTC'),
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      0,
      0,
      0,
      0,
      false,
      0,
      0,
      false,
      false,
      false);
    this.venue.FeeGroups[index].Fees.push(newFee);
    this.router.navigate([index, this.venue.FeeGroups[index].Fees.length - 1], {relativeTo: this.route});
  }

}
