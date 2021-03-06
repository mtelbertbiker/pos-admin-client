import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../../venues/venue.service';
import {FeeGroup} from '../../../../shared/pos-models/fee-group.model';
import {SessionService} from '../../../../shared/data-services/session.service';
import {FormTypes} from '../../../../shared/data-services/constants.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-feegroup-list',
  templateUrl: './feegroup-list.component.html'
})
export class FeegroupListComponent implements OnInit {
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

  onAddFeeGroup() {
    const newFeeGroup = new FeeGroup();
    newFeeGroup.TempFGId = UUID.UUID();
    this.venue.FeeGroups.push(newFeeGroup);
    this.sessionService.setSaveState(FormTypes.FeeGroups, true, true);
    this.router.navigate([this.venue.FeeGroups.length - 1], {relativeTo: this.route});
  }
}
