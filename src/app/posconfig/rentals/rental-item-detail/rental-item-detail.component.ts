import {Component, Input, OnInit} from '@angular/core';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-rental-item-detail',
  templateUrl: './rental-item-detail.component.html',
})
export class RentalItemDetailComponent implements OnInit {
  rentalItem: RentalItem;
  vid: number;
  index: number;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params);
          const valpair = params['id'].split('-');
          this.vid = +valpair[0];
          this.index =  +valpair[1];
          const venue = this.venueService.getVenue(this.vid);
          this.rentalItem = venue.RentalItems[this.index];
        }
      );
  }

}
