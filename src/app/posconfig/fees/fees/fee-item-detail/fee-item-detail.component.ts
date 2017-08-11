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
    const BeginTime = {hour: new Date(this.fee.BeginTime).getUTCHours(), minute: new Date(this.fee.BeginTime).getMinutes()};
    const EndTime = {hour: new Date(this.fee.EndTime).getUTCHours(), minute: new Date(this.fee.EndTime).getMinutes()};
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
    this.feeItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'BeginTime': new FormControl(BeginTime, Validators.required),
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

  pad(n) {
    return (n < 10) ? ('0' + n) : n;
  }

  updateFee(updatedFee: Fee) {
    this.fee.Name = updatedFee.Name;
    this.fee.BeginTime = new Date('0001-01-01 ' + this.pad(updatedFee.BeginTime.hour) + ':' +
      this.pad(updatedFee.BeginTime.minute) + ':00 UTC');
    this.fee.EndTime = new Date('0001-01-01 ' + this.pad(updatedFee.EndTime.hour) + ':' +
      this.pad(updatedFee.EndTime.minute) + ':00 UTC');
    this.fee.MinDur = updatedFee.MinDur;
    this.fee.MaxDur = updatedFee.MaxDur;
    this.fee.IncDur = updatedFee.IncDur;
    this.fee.FeeAmt = updatedFee.FeeAmt;
    this.fee.PerUser = updatedFee.PerUser;
    this.fee.AlwaysInc = updatedFee.AlwaysInc;
    this.fee.MinUsers = updatedFee.MinUsers;
    this.fee.MaxUsers = updatedFee.MaxUsers;
    this.fee.Enabled = updatedFee.Enabled;
    this.fee.FlatRate = updatedFee.FlatRate;
    this.fee.Sun = updatedFee.Sun;
    this.fee.Mon = updatedFee.Mon;
    this.fee.Tue = updatedFee.Tue;
    this.fee.Wed = updatedFee.Wed;
    this.fee.Thu = updatedFee.Thu;
    this.fee.Fri = updatedFee.Fri;
    this.fee.Sat = updatedFee.Sat;
  }

  onDeleteFee(index: number) {
    if (confirm('Delete Fee ' + this.fee.Name + '?') === true) {
      this.feeGroup.Fees.splice(index, 1);
      this.router.navigate(['../..'], {relativeTo: this.route});
    };
  }

}
