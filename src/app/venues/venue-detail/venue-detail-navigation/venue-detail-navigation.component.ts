import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {VenueService} from '../../venue.service';

@Component({
  selector: 'app-venue-detail-navigation',
  templateUrl: './venue-detail-navigation.component.html',
})
export class VenueDetailNavigationComponent implements OnInit {
  @Input() lid: number;
  @Input() vid: number;
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

  onLocationNavigate(pageName) {
    this.router.navigate(['/licensee/' + this.lid + '/locations/' + this.vid + '/' + pageName]);
  }
}
