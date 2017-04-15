import {Component, Input, OnInit} from '@angular/core';
import {VenueService} from '../venue.service';
import {Venue} from '../../shared/pos-objects/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html'
})
export class VenueDetailComponent implements OnInit {
  private venue: Venue;
  id: number;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );
  }

}
