import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../venue.service';
import {Venue} from '../../shared/pos-objects/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html'
})
export class VenueDetailComponent implements OnInit, OnDestroy {
  private venue: Venue;
  venueDetailForm: FormGroup;
  id: number;
  subscription: Subscription;

  constructor(private venueService: VenueService,
              private venueDataService: VenueDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.venue = this.venueService.getVenue(this.id);
          this.initForm();
          this.subscription = this.venueDetailForm.valueChanges.subscribe(
            (value) => this.venueService.updateVenue(this.id, this.venueDetailForm.value)
          );
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
        'Name': new FormControl(venueName, Validators.required),
        'Address1': new FormControl(address1, Validators.required),
        'Address2': new FormControl(address2),
        'City': new FormControl(city, Validators.required),
        'State': new FormControl(state, Validators.required),
        'PostalCode': new FormControl(postalCode, Validators.required),
        'Phone1': new FormControl(phone1, Validators.required),
        'Phone2': new FormControl(phone2),
      }
    );
  }
  onSubmit() {
    this.venueDataService.putVenue(this.id)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  edited() {
    return this.venueService.venuesChanged;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
