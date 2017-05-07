import { Component, OnInit } from '@angular/core';
import {Fee} from '../../../../shared/pos-models/fee.model';
import {FeeGroup} from '../../../../shared/pos-models/fee-group.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../../shared/data-services/session.service';
import {VenueService} from '../../../../venues/venue.service';

@Component({
  selector: 'app-fee-item-detail',
  templateUrl: './fee-item-detail.component.html',
})
export class FeeItemDetailComponent implements OnInit {
  fee: Fee;
  feeGroup: FeeGroup;
  venue: Venue;
  feeItemDetailForm: FormGroup;
  vid: number;
  fid: number;
  index: number;
  subscription: Subscription;
  BeginTimeObject = {};

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index =  +params['id'];
          this.fid = +params['fid'];
          this.vid = this.sessionService.getCurrentVenueIndex();
          this.venue = this.venueService.getVenue(this.vid);
          this.feeGroup = this.venue.FeeGroups[this.index];
          this.fee = this.feeGroup.Fees[this.fid];
          this.initForm();
          this.subscription = this.feeItemDetailForm.valueChanges.subscribe(
            (value) => this.updateFee(this.feeItemDetailForm.value)
          );
        }
      );
  }

  private initForm() {
    const Name = this.fee.Name;
    const BeginTime = new Date(this.fee.BeginTime);
    const EndTime = this.fee.EndTime;
    const MinDur = this.fee.MinDur;
    const MaxDur = this.fee.MaxDur;
    const IncDur = this.fee.IncDur;
    const FeeAmt = this.fee.FeeAmt;
    const PerUser = this.fee.PerUser;
    const AlwaysInc = this.fee.AlwaysInc;
    const MinUsers = this.fee.MinUsers;
    const MaxUsers = this.fee.MaxUsers;
    const Enabled = this.fee.Enabled;
    const FlatRate = this.fee.FlatRate;
    const Sun = this.fee.Sun;
    const Mon = this.fee.Mon;
    const Tue = this.fee.Tue;
    const Wed = this.fee.Wed;
    const Thu = this.fee.Thu;
    const Fri = this.fee.Fri;
    const Sat = this.fee.Sat;
    this.BeginTimeObject = {hour: BeginTime.getHours(), minute: BeginTime.getMinutes()};
    this.feeItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'EndTime': new FormControl(EndTime, Validators.required),
        'MinDur': new FormControl(MinDur, Validators.required),
        'MaxDur': new FormControl(MaxDur, Validators.required),
        'IncDur': new FormControl(IncDur, Validators.required),
        'FeeAmt': new FormControl(FeeAmt, Validators.required),
        'PerUser': new FormControl(PerUser, Validators.required),
        'AlwaysInc': new FormControl(AlwaysInc, Validators.required),
        'MinUsers': new FormControl(MinUsers, Validators.required),
        'MaxUsers': new FormControl(MaxUsers, Validators.required),
        'Enabled': new FormControl(Enabled, Validators.required),
        'FlatRate': new FormControl(FlatRate, Validators.required),
        'Sun': new FormControl(Sun, Validators.required),
        'Mon': new FormControl(Mon, Validators.required),
        'Tue': new FormControl(Tue, Validators.required),
        'Wed': new FormControl(Wed, Validators.required),
        'Thu': new FormControl(Thu, Validators.required),
        'Fri': new FormControl(Fri, Validators.required),
        'Sat': new FormControl(Sat, Validators.required),
      }
    );
  }

  updateFee(newFee: Fee) {
    this.fee.Name = newFee.Name;
    this.fee.BeginTime = newFee.BeginTime;
    this.fee.EndTime = newFee.EndTime;
    this.fee.MinDur = newFee.MinDur;
    this.fee.MaxDur = newFee.MaxDur;
    this.fee.IncDur = newFee.IncDur;
    this.fee.FeeAmt = newFee.FeeAmt;
    this.fee.PerUser = newFee.PerUser;
    this.fee.AlwaysInc = newFee.AlwaysInc;
    this.fee.MinUsers = newFee.MinUsers;
    this.fee.MaxUsers = newFee.MaxUsers;
    this.fee.Enabled = newFee.Enabled;
    this.fee.FlatRate = newFee.FlatRate;
    this.fee.Sun = newFee.Sun;
    this.fee.Mon = newFee.Mon;
    this.fee.Tue = newFee.Tue;
    this.fee.Wed = newFee.Wed;
    this.fee.Thu = newFee.Thu;
    this.fee.Fri = newFee.Fri;
    this.fee.Sat = newFee.Sat;
  }

  onDeleteFee(index: number) {
    if (confirm('Delete this Fee?') === true) {
      this.feeGroup.Fees.splice(index, 1);
      this.router.navigate(['..'], {relativeTo: this.route});
    };
  }

}
