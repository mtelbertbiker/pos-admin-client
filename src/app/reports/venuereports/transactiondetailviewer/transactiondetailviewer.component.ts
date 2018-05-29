import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VenueService} from '../../../venues/venue.service';
import {Venue} from '../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-transactiondetailviewer',
  templateUrl: './transactiondetailviewer.component.html',
})
export class TransactiondetailviewerComponent implements OnInit {
  venue: Venue;
  id: number;
  viewerContainerStyle = {
    position: 'relative',
    width: '1000px',
    height: '800px',
    ['font-family']: 'ms sans serif',
    encapsulation: ViewEncapsulation.None
  };


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