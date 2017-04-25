import {Component, Input, OnInit} from '@angular/core';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Venue} from '../../../shared/pos-models/venue.model';

@Component({
  selector: 'app-rental-item-detail',
  templateUrl: './rental-item-detail.component.html',
})
export class RentalItemDetailComponent implements OnInit {
  rentalItem: RentalItem;
  venue: Venue;
  rentalItemDetailForm: FormGroup;
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
          this.venue = this.venueService.getVenue(this.vid);
          this.rentalItem = this.venue.RentalItems[this.index];
        }
      );
    this.initForm();
  }
  private initForm() {
    const Name = this.rentalItem.Name;
    this.rentalItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
      }
    );
  }

  getRentalTypeDesc(typeId: number) {
    for (let locationRentalType of this.venue['LocationRentalTypes']) {
      if (locationRentalType['RentalTypeId'] === typeId) {
        return locationRentalType['Desc'];
      }

    }
  }

  onSubmit() {
  }
}
