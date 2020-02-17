import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VenueService} from '../../../venues/venue.service';
import {Venue} from '../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ConstantsService} from '../../../shared/data-services/constants.service';

@Component({
  selector: 'app-transactiondetailviewer',
  templateUrl: './transactiondetailviewer.component.html',
})
export class TransactiondetailviewerComponent implements OnInit {
  venue: Venue;
  id: number;
  ready = 'ready';
  viewerContainerStyle = {
    position: 'relative',
    width: '1000px',
    height: '800px',
    ['font-family']: 'ms sans serif',
    encapsulation: ViewEncapsulation.None
  };


  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              public constantsService: ConstantsService) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );

  }

}
