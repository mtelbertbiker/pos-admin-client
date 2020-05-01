import {Component, OnDestroy, OnInit} from '@angular/core';
import {Fee} from '../../../../shared/pos-models/fee.model';
import {FeeGroup} from '../../../../shared/pos-models/fee-group.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../../shared/data-services/session.service';
import {VenueService} from '../../../../venues/venue.service';
import {ConstantsService, FormTypes} from '../../../../shared/data-services/constants.service';
import {ConfirmDeletionModalComponent} from '../../../../shared/confirm-deletion-modal/confirm-deletion-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fee-item-detail',
  templateUrl: './fee-item-detail.component.html',
  styleUrls: ['./fee-item-detail.component.css']
})
export class FeeItemDetailComponent implements OnInit, OnDestroy {
  fee: Fee;
  feeGroup: FeeGroup;
  venue: Venue;
  feeItemDetailForm: FormGroup;
  vid: number;
  fid: number;
  index: number;
  subscription: Subscription;
  myModals = {
    deleteConfirm: ConfirmDeletionModalComponent
  };

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              public constantsService: ConstantsService,
              private modal: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.fid = +params['fid'];
          this.vid = this.sessionService.getCurrentVenueIndex();
          this.venue = this.venueService.getVenue(this.vid);
          this.feeGroup = this.venue.FeeGroups[this.index];
          this.fee = this.feeGroup.Fees[this.fid];
          this.initForm();
          this.subscription = this.feeItemDetailForm.valueChanges.subscribe(
            (value) => {
              this.updateFee(value);
              this.sessionService.setSaveState(FormTypes.Fees, this.feeItemDetailForm.valid, this.feeItemDetailForm.dirty);
            }
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
    const FeeAmt = this.fee.FeeAmt.toFixed(2);
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
    const ItemId = this.fee.ItemId;
    this.feeItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'BeginTime': new FormControl(BeginTime, Validators.required),
        'EndTime': new FormControl(EndTime, Validators.required),
        'MinDur': new FormControl(MinDur, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'MaxDur': new FormControl(MaxDur, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'IncDur': new FormControl(IncDur, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'FeeAmt': new FormControl(FeeAmt, [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)]),
        'PerUser': new FormControl(PerUser, Validators.required),
        'AlwaysInc': new FormControl(AlwaysInc, Validators.required),
        'MinUsers': new FormControl(MinUsers, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'MaxUsers': new FormControl(MaxUsers, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'Enabled': new FormControl(Enabled, Validators.required),
        'FlatRate': new FormControl(FlatRate, Validators.required),
        'Sun': new FormControl(Sun, Validators.required),
        'Mon': new FormControl(Mon, Validators.required),
        'Tue': new FormControl(Tue, Validators.required),
        'Wed': new FormControl(Wed, Validators.required),
        'Thu': new FormControl(Thu, Validators.required),
        'Fri': new FormControl(Fri, Validators.required),
        'Sat': new FormControl(Sat, Validators.required),
        'ItemId': new FormControl(ItemId, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
      }
    );
  }

  isMinUserFieldInvalid() {
    if (this.feeGroup.RequiresUsers) {
      if (this.fee.MinUsers < 1 || this.fee.MinUsers > this.constantsService.MaxUsers) {
        return true;
      }
    } else {
      return false;
    }
  }

  isMaxUserFieldInvalid() {
    if (this.feeGroup.RequiresUsers) {
      if (this.fee.MaxUsers < this.fee.MinUsers || this.fee.MaxUsers > this.constantsService.MaxUsers) {
        return true;
      }
    } else {
      return false;
    }
  }

  isMaxDurFieldInvalid() {
    if (this.fee.MaxDur > 0 && this.fee.MaxDur < this.fee.MinDur) {
      return true;
    }
    return false;
  }

  isFieldInvalid(fieldName: string) {
    return this.feeItemDetailForm.controls[fieldName].invalid;
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
    this.fee.ItemId = updatedFee.ItemId;
  }

  onDeleteFee(index: number) {
    this.sessionService.DeletedItemName = 'Fee ' + this.fee.Name;
    this.modal.open(this.myModals.deleteConfirm).result.then((result) => {
      if (result === 'Ok') {
        this.feeGroup.Fees.splice(index, 1);
        this.router.navigate(['../..'], {relativeTo: this.route});
        this.sessionService.setSaveState(FormTypes.Fees, true, true);
      }
    }, (reason) => {
    });
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
