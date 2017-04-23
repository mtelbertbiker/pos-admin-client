import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params} from '@angular/router';
import {VenueService} from '../../../venues/venue.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
})
export class RentalListComponent implements OnInit {
  venue: Venue;
  id: number;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.venue = this.venueService.getVenue(this.id);
          this.initForm();
        }
      );
  }

  private initForm() {}

}
