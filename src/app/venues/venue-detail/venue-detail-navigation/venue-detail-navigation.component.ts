import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FormGroup} from '@angular/forms';
import {VenueService} from '../../venue.service';
import {VenueDataService} from '../../../shared/data-services/venue-data.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-venue-detail-navigation',
  templateUrl: './venue-detail-navigation.component.html',
})
export class VenueDetailNavigationComponent implements OnInit {
  id: number;
  isCollapsed = false;
  subscription: Subscription;
  venueNavigationForm: FormGroup;

  constructor(private venueService: VenueService,
              private venueDataService: VenueDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.initForm();
          this.subscription = this.venueNavigationForm.valueChanges.subscribe(
            (value) => this.venueService.updateVenue(this.id, this.venueNavigationForm.value)
          );
        }
      );
  }

  private initForm() {
    this.venueNavigationForm = new FormGroup({});
  }

  onSubmit() {
    this.venueDataService.putVenue(this.id)
      .subscribe(
        (response: Response) => {
          console.log(response);
          if (response.ok) {
            const venue = response.json();
            this.venueService.updateVenue(this.id, venue);
            alert('Location Saved');
          } else {
            alert('Save Request failed: ' + response.statusText);
          }
        }
      );
  }

  toggleCollapseState() {
    this.isCollapsed = !this.isCollapsed;
  }

}
