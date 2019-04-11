import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FormGroup} from '@angular/forms';
import {VenueService} from '../../venue.service';
import {VenueDataService} from '../../../shared/data-services/venue-data.service';

@Component({
  selector: 'app-venue-detail-navigation',
  templateUrl: './venue-detail-navigation.component.html',
})
export class VenueDetailNavigationComponent implements OnInit {
  @Input() lid: number;
  @Input() vid: number;
  isCollapsed = false;
  subscription: Subscription;
  venueNavigationForm: FormGroup;

  constructor(private venueService: VenueService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.vid = +params['vid'];
          this.initForm();
          this.subscription = this.venueNavigationForm.valueChanges.subscribe(
            (value) => this.venueService.updateVenue(this.vid, this.venueNavigationForm.value)
          );
        }
      );
  }

  private initForm() {
    this.venueNavigationForm = new FormGroup({});
  }

  toggleCollapseState() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSelectLocation() {
    if (confirm('Are you sure?  Any changes not saved will be lost.')) {
      this.router.navigate(['home']);
    }
  }

}
