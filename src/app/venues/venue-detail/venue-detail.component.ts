import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../venue.service';
import {Venue} from '../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {SessionService} from '../../shared/data-services/session.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit, OnDestroy {
  private venue: Venue;
  venueDetailForm: FormGroup;
  id: number;
  subscription: Subscription;
  posType: any;

  public posTypes = [
    { value: 0, name: 'None'},
    { value: 1, name: 'Aloha Table Service'},
    { value: 2, name: 'Aloha Quick Service'},
    { value: 3, name: 'Micros 3700'},
  ];

  constructor(private venueService: VenueService,
              private venueDataService: VenueDataService,
              private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    console.log('Venue Detail Component onInit');
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
          if (!this.venue.HasVenueDetail) {
            this.venueDataService.getVenueDetail(this.id);
            this.venue = this.venueService.getVenue(this.id);
          }
          this.sessionService.setCurrentVenueIndex(this.id);
          this.venue = this.venueService.getVenue(this.id);
          this.sessionService.setBrandId(this.venue.BId);
          this.initForm();
          this.subscription = this.venueDetailForm.valueChanges.subscribe(
            (value) => {
              this.venueService.updateVenue(this.id, value);
              this.sessionService.setSaveState(this.venueDetailForm.valid, this.venueDetailForm.dirty);
            }
          );
          /*
          this.subscription = this.venueDetailForm.valueChanges.subscribe(
            (value) => this.venueService.updateVenue(this.id, this.venueDetailForm.value)
          );
          */
        }
      );
  }

  private initForm() {
    if (this.venue.POSTypeId != null) {
      this.posType = this.posTypes[this.venue.POSTypeId];
    } else {
      this.posType = this.posTypes[0];
    }
    this.posType = this.posTypes[0];
    const venueName = this.venue.Name;
    const address1 = this.venue.Address1;
    const address2 = this.venue.Address2;
    const city = this.venue.City;
    const state = this.venue.State;
    const postalCode = this.venue.PostalCode;
    const phone1 = this.venue.Phone1;
    const phone2 = this.venue.Phone2;
    const memo = this.venue.Memo;
    const enabled = !this.venue.Disabled;
    const postypeid = this.venue.POSTypeId;
    const lightsenabled = this.venue.LightControlEnabled;
    const website = this.venue.Website;
    this.venueDetailForm = new FormGroup(
      {
        'Name': new FormControl(venueName, [Validators.required, Validators.pattern(/^[a-zA-Z0-9 '-]+$/)]),
        'Address1': new FormControl(address1, [Validators.required, Validators.pattern(/^[a-zA-Z0-9 '-]+$/)]),
        'Address2': new FormControl(address2),
        'City': new FormControl(city, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
        'State': new FormControl(state, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
        'PostalCode': new FormControl(postalCode, Validators.required),
        'Phone1': new FormControl(phone1, Validators.required),
        'Phone2': new FormControl(phone2),
        'Memo': new FormControl(memo),
        'Enabled' : new FormControl(enabled),
        'POSTypeId' : new FormControl(postypeid),
        'LightControlEnabled' : new FormControl(lightsenabled),
        'Website' : new FormControl(website),
      }
    );
  }

  onDeleteLocation(index: number) {
    if (confirm('Delete this Location? This will also delete all Rental Items and Fees associated with the location.') === true) {
      this.venue = this.venueService.getVenue(index);
      this.venueDataService.deleteVenue(this.venue.LicId, this.venue.BId, this.venue.LId)
        .subscribe(
          val => {
            this.venueService.removeVenue(index);
            alert('Location Deleted');
            this.router.navigate(['home']);
          },
          response => {
            console.log(response);
            alert('Delete Request failed: ' + response.message);
          }
        );
    };
  }

  edited() {
    return this.venueService.venuesChanged;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
