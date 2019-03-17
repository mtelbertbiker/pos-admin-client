import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {VenueService} from '../venue.service';
import {FormGroup} from '@angular/forms';
import {Venue} from '../../shared/pos-models/venue.model';

@Component({
  selector: 'app-venue-master-item',
  templateUrl: './venue-master-item.component.html',
  styleUrls: ['./venue-master-item.component.css']
})
export class VenueMasterItemComponent implements OnInit {
  vid: number;
  lid: number;
  venue: Venue;
  venueMasterItemForm: FormGroup;
  constructor(private venueService: VenueService,
              private venueDataService: VenueDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Venue Master Item Component onInit');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.vid = +params['vid'];
          this.lid = +this.route.parent.snapshot.params['id'];
          this.venue = this.venueService.getVenue(this.vid);
          this.initForm();
        }
      );
  }

  initForm() {
    this.venueMasterItemForm = new FormGroup(
      {}
    );
  }

}
