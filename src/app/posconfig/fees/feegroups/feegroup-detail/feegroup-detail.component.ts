import { Component, OnInit } from '@angular/core';
import {FeeGroup} from '../../../../shared/pos-models/fee-group.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../../shared/data-services/session.service';
import {VenueService} from '../../../../venues/venue.service';

@Component({
  selector: 'app-feegroup-detail',
  templateUrl: './feegroup-detail.component.html',
  styleUrls: ['./feegroup-detail.component.css']
})
export class FeeGroupDetailComponent implements OnInit {
  feeGroup: FeeGroup;
  venue: Venue;
  feeGroupDetailForm: FormGroup;
  vid: number;
  index: number;
  subscription: Subscription;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index =  +params['id'];
          this.vid = this.sessionService.getCurrentVenueIndex();
          this.venue = this.venueService.getVenue(this.vid);
          this.feeGroup = this.venue.FeeGroups[this.index];
          this.initForm();
          this.subscription = this.feeGroupDetailForm.valueChanges.subscribe(
            (value) => {
              this.updateFeeGroup(value);
              this.sessionService.setSaveState('Fee Groups', this.feeGroupDetailForm.valid, this.feeGroupDetailForm.dirty);
            }
          );
        }
      );
  }

  private initForm() {
    const Name = this.feeGroup.Name;
    const ItemId = this.feeGroup.ItemId;
    const MinUsers = this.feeGroup.MinUsers;
    const MaxUsers = this.feeGroup.MaxUsers;
    const RequiredFee = this.feeGroup.RequiredFee;
    const RequiresUsers = this.feeGroup.RequiresUsers;
    const CondenseUserFees = this.feeGroup.CondenseUserFees;
    const TransferUserEnabled = this.feeGroup.TransferUserEnabled;
    const Disabled = !this.feeGroup.Disabled;
    const TrackUserNames = this.feeGroup.UserNameTrackingEnabled;
    this.feeGroupDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'MinUsers': new FormControl(MinUsers, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'MaxUsers': new FormControl(MaxUsers, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'RequiredFee': new FormControl(RequiredFee, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'ItemId': new FormControl(ItemId, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'RequiresUsers': new FormControl(RequiresUsers),
        'TransferUserEnabled': new FormControl(TransferUserEnabled),
        'Disabled': new FormControl(Disabled),
        'UserNameTrackingEnabled': new FormControl(TrackUserNames),
        'CondenseUserFees': new FormControl(CondenseUserFees),
      }
    );
  }

  updateFeeGroup(updatedFeeGroup: FeeGroup) {
    this.feeGroup.Name = updatedFeeGroup.Name;
    this.feeGroup.ItemId = updatedFeeGroup.ItemId;
    this.feeGroup.MinUsers = updatedFeeGroup.MinUsers;
    this.feeGroup.MaxUsers = updatedFeeGroup.MaxUsers;
    this.feeGroup.RequiredFee = updatedFeeGroup.RequiredFee;
    this.feeGroup.RequiresUsers = updatedFeeGroup.RequiresUsers;
    this.feeGroup.CondenseUserFees = updatedFeeGroup.CondenseUserFees;
    this.feeGroup.UserNameTrackingEnabled = updatedFeeGroup.UserNameTrackingEnabled;
    this.feeGroup.TransferUserEnabled = updatedFeeGroup.TransferUserEnabled;
    this.feeGroup.Disabled = !updatedFeeGroup.Disabled;
    this.venueService.updateVenueDetail(this.vid, this.venue);
  }

  onDeleteFeeGroup(index: number) {
    if (confirm('Delete this Fee Group?') === true) {
      this.venue.FeeGroups.splice(index, 1);
      this.router.navigate(['..'], {relativeTo: this.route});
    };
  }
}
