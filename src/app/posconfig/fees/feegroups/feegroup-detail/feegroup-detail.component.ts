import {Component, OnDestroy, OnInit} from '@angular/core';
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
  selector: 'app-feegroup-detail',
  templateUrl: './feegroup-detail.component.html',
  styleUrls: ['./feegroup-detail.component.css']
})
export class FeeGroupDetailComponent implements OnInit, OnDestroy {
  feeGroup: FeeGroup;
  venue: Venue;
  feeGroupDetailForm: FormGroup;
  vid: number;
  index: number;
  subscription: Subscription;
  usersDisabled = false;
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
          this.vid = this.sessionService.getCurrentVenueIndex();
          this.venue = this.venueService.getVenue(this.vid);
          this.feeGroup = this.venue.FeeGroups[this.index];
          this.initForm();
          this.subscription = this.feeGroupDetailForm.valueChanges.subscribe(
            (value) => {
              this.updateFeeGroup(value);
              this.sessionService.setSaveState(FormTypes.FeeGroups, this.feeGroupDetailForm.valid, this.feeGroupDetailForm.dirty);
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
    const RequiredFee = this.feeGroup.RequiredFee.toFixed(2);
    const RequiresUsers = this.feeGroup.RequiresUsers;
    const CondenseUserFees = this.feeGroup.CondenseUserFees;
    const TransferUserEnabled = this.feeGroup.TransferUserEnabled;
    const Disabled = !this.feeGroup.Disabled;
    const TrackUserNames = this.feeGroup.UserNameTrackingEnabled;
    const FeeRounding = this.feeGroup.FeeRounding;
    this.usersDisabled = !this.feeGroup.RequiresUsers;
    this.feeGroupDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'RequiresUsers': new FormControl(RequiresUsers),
        'MinUsers': new FormControl(MinUsers, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'MaxUsers': new FormControl(MaxUsers, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'UserNameTrackingEnabled': new FormControl(TrackUserNames),
        'CondenseUserFees': new FormControl(CondenseUserFees),
        'TransferUserEnabled': new FormControl(TransferUserEnabled),
        'ItemId': new FormControl(ItemId, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'FeeRounding' :  new FormControl(FeeRounding),
        'RequiredFee': new FormControl(RequiredFee, [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)]),
        'Disabled': new FormControl(Disabled),
      });
  }

  isMinUserFieldInvalid() {
    if (this.feeGroup.RequiresUsers) {
      if (this.feeGroup.MinUsers < 1 || this.feeGroup.MinUsers > 999) {
        return true;
      }
    } else {
      return false;
    }
  }

  isMaxUserFieldInvalid() {
    if (this.feeGroup.RequiresUsers) {
      if (this.feeGroup.MaxUsers < this.feeGroup.MinUsers || this.feeGroup.MaxUsers > 999) {
        return true;
      }
    } else {
      return false;
    }
  }

  isFieldInvalid(fieldName: string) {
    return this.feeGroupDetailForm.controls[fieldName].invalid;
  }

  onSelectChange(feeRoundingTypeId: any) {
    this.feeGroup.FeeRounding = feeRoundingTypeId;
    this.sessionService.setSaveState(FormTypes.Rentals, this.feeGroupDetailForm.valid, true);
  }

  updateFeeGroup(updatedFeeGroup: FeeGroup) {
    this.feeGroup.Name = updatedFeeGroup.Name;
    this.feeGroup.TempFGId = updatedFeeGroup.TempFGId;
    this.feeGroup.ItemId = updatedFeeGroup.ItemId;
    this.feeGroup.MinUsers = updatedFeeGroup.MinUsers;
    this.feeGroup.MaxUsers = updatedFeeGroup.MaxUsers;
    this.feeGroup.RequiredFee = updatedFeeGroup.RequiredFee;
    this.feeGroup.RequiresUsers = updatedFeeGroup.RequiresUsers;
    this.feeGroup.CondenseUserFees = updatedFeeGroup.CondenseUserFees;
    this.feeGroup.UserNameTrackingEnabled = updatedFeeGroup.UserNameTrackingEnabled;
    this.feeGroup.TransferUserEnabled = updatedFeeGroup.TransferUserEnabled;
    this.feeGroup.Disabled = !updatedFeeGroup.Disabled;
    this.feeGroup.FeeRounding = updatedFeeGroup.FeeRounding;
    this.usersDisabled = !this.feeGroup.RequiresUsers;
    this.venueService.updateVenueDetail(this.vid, this.venue);
  }

  onDeleteFeeGroup(index: number) {
    this.sessionService.DeletedItemName = 'Fee Group ' + this.feeGroup.Name;
    this.modal.open(this.myModals.deleteConfirm).result.then((result) => {
      if (result === 'Ok') {
        this.venue.FeeGroups.splice(index, 1);
        this.sessionService.setSaveState(FormTypes.FeeGroups, true, true);
        this.router.navigate(['..'], {relativeTo: this.route});
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
