import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../venues/venue.service';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html'
})
export class RentalListComponent implements OnInit {
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

  onAddRentalItem() {
    this.venue.RentalItems.push(new RentalItem(0, 0, 'New Rental', 1, []));
    this.router.navigate([this.venue.RentalItems.length - 1], {relativeTo: this.route});
  }
}
