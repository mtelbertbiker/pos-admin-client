import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Floorplan} from '../../../../shared/pos-models/floorplan.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormTypes} from '../../../../shared/data-services/constants.service';
import {VenueService} from '../../../../venues/venue.service';
import {SessionService} from '../../../../shared/data-services/session.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-floorplanlist-item-detail',
  templateUrl: './floorplanlist-item-detail.component.html',
  styleUrls: ['./floorplanlist-item-detail.component.css']
})
export class FloorplanlistItemDetailComponent implements OnInit, OnDestroy {
  floorplanListItemDetailForm: FormGroup;
  floorplan: Floorplan;
  venue: Venue;
  index: number;
  vid: number;
  subscription: Subscription;
  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private modal: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.vid = this.sessionService.getCurrentVenueIndex();
          this.venue = this.venueService.getVenue(this.vid);
          this.floorplan = this.venue.Floorplans[this.index];
          this.initForm();
          this.subscription = this.floorplanListItemDetailForm.valueChanges.subscribe(
            (value) => {
             // this.updateFeeGroup(value);
             // this.sessionService.setSaveState(FormTypes.FeeGroups, this.feeGroupDetailForm.valid, this.feeGroupDetailForm.dirty);
            }
          );
        }
      );
  }

  private initForm() {
    const Name = this.floorplan.Name;
    const Disabled = false; // !this.rentalItem.Disabled;
    this.floorplanListItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'Disabled': new FormControl(Disabled),
      }
    );
  }


  isFieldInvalid(fieldName: string) {
    return this.floorplanListItemDetailForm.controls[fieldName].invalid;
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
