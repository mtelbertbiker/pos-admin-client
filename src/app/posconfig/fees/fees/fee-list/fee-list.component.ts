import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../../venues/venue.service';
import {Fee} from '../../../../shared/pos-models/fee.model';
import {SessionService} from '../../../../shared/data-services/session.service';
import {FormTypes} from '../../../../shared/data-services/constants.service';

@Component({
  selector: 'app-feeitem-list',
  templateUrl: './fee-list.component.html'
})
export class FeeListComponent implements OnInit {
  venue: Venue;
  id: number;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.params
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
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      0,
      0,
      0,
      0,
      true,
      0,
      0,
      false,
      false,
      false,
      0);
    if (this.venue.FeeGroups[index].Prepaid) {
      newFee.FlatRate = true;
    }
    this.venue.FeeGroups[index].Fees.push(newFee);
    this.sessionService.setSaveState(FormTypes.Fees, true, true);
    this.router.navigate([index, this.venue.FeeGroups[index].Fees.length - 1], {relativeTo: this.route});
  }

}
