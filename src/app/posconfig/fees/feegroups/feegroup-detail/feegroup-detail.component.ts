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
  templateUrl: './feegroup-detail.component.html'
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
            (value) => this.updateFeeGroup(this.feeGroupDetailForm.value)
          );
        }
      );
  }

  private initForm() {
    const Name = this.feeGroup.Name;
    const MinUsers = this.feeGroup.MinUsers;
    const MaxUsers = this.feeGroup.MaxUsers;
    const RequiredFee = this.feeGroup.RequiredFee;
    const RequiresUsers = this.feeGroup.RequiresUsers;
    const CondenseUserFees = this.feeGroup.CondenseUserFees;
    this.feeGroupDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'MinUsers': new FormControl(MinUsers, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'MaxUsers': new FormControl(MaxUsers, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'RequiredFee': new FormControl(RequiredFee, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'RequiresUsers': new FormControl(RequiresUsers),
        'CondenseUserFees': new FormControl(CondenseUserFees),
      }
    );
  }

  updateFeeGroup(newFeeGroup: FeeGroup) {
    this.feeGroup.Name = newFeeGroup.Name;
    this.feeGroup.MinUsers = newFeeGroup.MinUsers;
    this.feeGroup.MaxUsers = newFeeGroup.MaxUsers;
    this.feeGroup.RequiredFee = newFeeGroup.RequiredFee;
    this.feeGroup.RequiresUsers = newFeeGroup.RequiresUsers;
    this.feeGroup.CondenseUserFees = newFeeGroup.CondenseUserFees;
  }

  onDeleteFeeGroup(index: number) {
    if (confirm('Delete this Fee Group?') === true) {
      this.venue.FeeGroups.splice(index, 1);
      this.router.navigate(['..'], {relativeTo: this.route});
    };
  }
}