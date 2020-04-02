import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../venue.service';
import {FormGroup} from '@angular/forms';
import {Venue} from '../../shared/pos-models/venue.model';

@Component({
  selector: 'app-venue-master-item',
  templateUrl: './venue-master-item.component.html',
  styleUrls: ['./venue-master-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VenueMasterItemComponent implements OnInit {
  vid: number;
  lid: number;
  venue: Venue;
  venueMasterItemForm: FormGroup;

  venueTabs = [
    {
      'Id': '0',
      'Name': 'Location Detail',
      'Url': 'detail'
    },
    {
      'Id': '1',
      'Name': 'Fee Groups',
      'Url': 'feegroups'
    },
    {
      'Id': '2',
      'Name': 'Fees',
      'Url': 'fees'
    },
    {
      'Id': '3',
      'Name': 'Fee Tester',
      'Url': 'feetester'
    },
    {
      'Id': '4',
      'Name': 'Rentals',
      'Url': 'rentals'
    },
    {
      'Id': '5',
      'Name': 'Floor Plans',
      'Url': 'floorplans'
    }
  ];

  constructor(private venueService: VenueService,
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

  onTabChangeLocationNavigate($event) {
    const tabId = $event.index;
    this.onLocationNavigate(this.venueTabs[tabId].Url);
  }

  onLocationNavigate(pageName) {
    this.router.navigate(['/licensee/' + this.lid + '/locations/' + this.vid + '/' + pageName]);
  }
}
