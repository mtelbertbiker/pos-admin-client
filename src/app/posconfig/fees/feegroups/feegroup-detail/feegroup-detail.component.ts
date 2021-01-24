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
import {FeeGroupWifiLightState} from '../../../../shared/pos-models/fee-group-wifi-lite-state';

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
  rentalStateAvailableIndex: number;
  rentalStateBusyIndex: number;
  rentalStateEndingIndex: number;
  rentalStateEndedIndex: number;

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
    const Prepaid = this.feeGroup.Prepaid;
    const FirstRentalEndWarning = this.feeGroup.FirstRentalEndWarning;
    const RentalEndWarningInterval = this.feeGroup.RentalEndWarningInterval;
    const RenterPhoneTrackingEnabled = this.feeGroup.RenterPhoneTrackingEnabled;
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
        'FeeRounding': new FormControl(FeeRounding),
        'RequiredFee': new FormControl(RequiredFee, [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)]),
        'Disabled': new FormControl(Disabled),
        'Prepaid': new FormControl(Prepaid),
        'FirstRentalEndWarning': new FormControl(FirstRentalEndWarning, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'RentalEndWarningInterval': new FormControl(RentalEndWarningInterval, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'RenterPhoneTrackingEnabled': new FormControl(RenterPhoneTrackingEnabled)
      });
    this.constantsService.SupportedRentalStates.forEach((rentalState) => {
      this.feeGroupDetailForm.addControl(rentalState.FormName, new FormControl());
    });
  }

  isMinUserFieldInvalid() {
    if (this.feeGroup.RequiresUsers) {
      if (this.feeGroup.MinUsers < 1 || this.feeGroup.MinUsers > this.constantsService.MaxUsers) {
        return true;
      }
    } else {
      return false;
    }
  }

  isMaxUserFieldInvalid() {
    if (this.feeGroup.RequiresUsers) {
      if (this.feeGroup.MaxUsers < this.feeGroup.MinUsers || this.feeGroup.MaxUsers > this.constantsService.MaxUsers) {
        return true;
      }
    } else {
      return false;
    }
  }

  isFirstRentalEndWarningInvalid() {
    if (this.feeGroup.Prepaid) {
      if (this.feeGroup.FirstRentalEndWarning > 1440 || this.feeGroup.FirstRentalEndWarning < 0) {
        return true;
      }
    }
    return false;
  }

  isRentalWarningIntervalInvalid() {
    if (this.feeGroup.Prepaid) {
      if (this.feeGroup.FirstRentalEndWarning > 0) {
        if ((this.feeGroup.RentalEndWarningInterval < 0) || (this.feeGroup.RentalEndWarningInterval > 60)) {
          return true;
        }
      }
    }
    return false;
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
    if (updatedFeeGroup.TempFGId) {
      this.feeGroup.TempFGId = updatedFeeGroup.TempFGId;
    }
    this.feeGroup.ItemId = updatedFeeGroup.ItemId;
    this.feeGroup.MinUsers = updatedFeeGroup.MinUsers;
    this.feeGroup.MaxUsers = updatedFeeGroup.MaxUsers;
    this.feeGroup.RequiredFee = parseFloat(String(updatedFeeGroup.RequiredFee));
    this.feeGroup.RequiresUsers = updatedFeeGroup.RequiresUsers;
    this.feeGroup.CondenseUserFees = updatedFeeGroup.CondenseUserFees;
    this.feeGroup.UserNameTrackingEnabled = updatedFeeGroup.UserNameTrackingEnabled;
    this.feeGroup.TransferUserEnabled = updatedFeeGroup.TransferUserEnabled;
    this.feeGroup.Disabled = !updatedFeeGroup.Disabled;
    this.feeGroup.FeeRounding = updatedFeeGroup.FeeRounding;
    this.usersDisabled = !updatedFeeGroup.RequiresUsers;
    this.feeGroup.Prepaid = updatedFeeGroup.Prepaid;
    this.feeGroup.FirstRentalEndWarning = updatedFeeGroup.FirstRentalEndWarning;
    this.feeGroup.RentalEndWarningInterval = updatedFeeGroup.RentalEndWarningInterval;
    this.feeGroup.RenterPhoneTrackingEnabled = updatedFeeGroup.RenterPhoneTrackingEnabled;
    if (this.constantsService.SupportedRentalStates[this.constantsService.SupportedRentalStateIndexAvailable].FormName in updatedFeeGroup) {
      const wifiLiteStateIndex = this.feeGroup.WifiLiteStates.findIndex((x => x.RentalStateId === this.constantsService.SupportedRentalStates[this.constantsService.SupportedRentalStateIndexAvailable].RentalStateId));
      if (wifiLiteStateIndex === -1) {
        this.feeGroup.WifiLiteStates.push(new FeeGroupWifiLightState(this.feeGroup.FGId,
          this.constantsService.SupportedRentalStates[this.constantsService.SupportedRentalStateIndexAvailable].RentalStateId,
          +updatedFeeGroup[this.constantsService.SupportedRentalStates[this.constantsService.SupportedRentalStateIndexAvailable].FormName]
        ))
      } else {
        this.feeGroup.WifiLiteStates[wifiLiteStateIndex].WifiBulbStateId = this.constantsService.SupportedRentalStates[this.constantsService.SupportedRentalStateIndexAvailable].RentalStateId;
      }
    }
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
