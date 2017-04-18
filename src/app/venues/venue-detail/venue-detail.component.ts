import {Component, Input, OnInit} from '@angular/core';
import {VenueService} from '../venue.service';
import {Venue} from '../../shared/pos-objects/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html'
})
export class VenueDetailComponent implements OnInit {
  private venue: Venue;
  venueDetailForm: FormGroup;
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

  private initForm() {
    let venueName = this.venue.Name;
    let address1 = this.venue.Address1;
    let address2 = this.venue.Address2;
    let city = this.venue.City;
    let state = this.venue.State;
    let postalCode = this.venue.PostalCode;
    let phone1 = this.venue.Phone1;
    let phone2 = this.venue.Phone2;
    this.venueDetailForm = new FormGroup(
      {
        'venueName': new FormControl(venueName, Validators.required),
        'address1': new FormControl(address1, Validators.required),
        'address2': new FormControl(address2),
        'city': new FormControl(city, Validators.required),
        'state': new FormControl(state, Validators.required),
        'postalCode': new FormControl(postalCode, Validators.required),
        'phone1': new FormControl(phone1, Validators.required),
        'phone2': new FormControl(phone2),
      }
    );
  }

}
