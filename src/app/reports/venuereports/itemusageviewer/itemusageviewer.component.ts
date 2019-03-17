import {Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-itemusageviewer',
  templateUrl: './itemusageviewer.component.html'
})
export class ItemUsageViewerComponent implements OnInit {
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
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );

  }

}
