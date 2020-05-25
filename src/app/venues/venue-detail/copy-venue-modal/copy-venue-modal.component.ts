import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../shared/data-services/session.service';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../venue.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {RentalItemFeeGroup} from '../../../shared/pos-models/rental-item-fee-group.model';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {FormTypes} from '../../../shared/data-services/constants.service';
import {ResellerService} from '../../../resellers/reseller.service';
import {VenueDataService} from '../../../shared/data-services/venue-data.service';
import {LicenseeService} from '../../../shared/licensee.service';

@Component({
  selector: 'app-copy-venue-modal',
  templateUrl: './copy-venue-modal.component.html',
  styleUrls: ['./copy-venue-modal.component.scss']
})
export class CopyVenueModalComponent implements OnInit {
  index: number;
  venue: Venue;
  fromVenue: Venue;
  toLicId: number;
  toLId: number;
  toVenue: Venue;
  venues: Venue[];
  resellerVenuesList;
  copyVenueForm: FormGroup;
  selectedCount = 0;
  subscription: Subscription;

  constructor(public modal: NgbActiveModal,
              private licenseeService: LicenseeService,
              private sessionService: SessionService,
              private router: Router,
              private resellerService: ResellerService,
              private venueService: VenueService,
              private venueDataService: VenueDataService) {
  }

  ngOnInit() {
    console.log('Venue Copy onInit');
    this.index = this.sessionService.getCurrentVenueIndex();
    this.venue = this.venueService.getVenue(this.index);
    this.venues = this.venueService.getVenues();
    if (this.sessionService.ResellerId > 0) {
      this.resellerVenuesList = this.resellerService.getResellerLocationNamesAndIds();
    }
    this.toVenue = null;
    this.initForm();
    this.subscription = this.copyVenueForm.valueChanges.subscribe(
      (value) => {
        this.updatedSelectedCount(value);
      }
    );
  }

  initForm() {
    const select = true;
    this.copyVenueForm = new FormGroup(
      {
        'SelectAll': new FormControl(select, Validators.required),
        'TargetVenue': new FormControl('', Validators.required),
      }
    );
    let i = 0;
    this.venue.FeeGroups.forEach((feegroup) => {
      this.copyVenueForm.addControl('1_FeeGroup-' + i, new FormControl(select, Validators.required));
      let j = 0;
      feegroup.Fees.forEach(() => {
        this.copyVenueForm.addControl('2_Fee-' + i + '-' + j, new FormControl(select, Validators.required));
        j++;
      });
      i++;
    });
    i = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      this.copyVenueForm.addControl('3_Rental-' + i, new FormControl(select, Validators.required));
      let j = 0;
      rentalItem.RentalItemFeeGroups.forEach(() => {
        this.copyVenueForm.addControl('4_RentalFeeGroup-' + i + '-' + j, new FormControl(select, Validators.required));
        j++;
      });
      i++;
    });
  }

  targetLicenseeVenueIndexList() {
    const indexes = [];
    for (let i = 0; i < this.venues.length; i++) {
      if (i !== this.index) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  feeGroupName(rifg) {
    const fg = this.venue.FeeGroups.find(x => x.FGId === rifg.FGId);
    if (fg !== undefined) {
      return fg.Name;
    }
    return 'N/A';
  }

  onFeeGroupSelect(checked, i) {
    const feegroup = this.venue.FeeGroups[i];
    let j = 0;
    feegroup.Fees.forEach(() => {
      if (!checked) {
        this.copyVenueForm.controls['2_Fee-' + i + '-' + j].setValue(false);
        this.copyVenueForm.controls['2_Fee-' + i + '-' + j].disable();
      } else {
        this.copyVenueForm.controls['2_Fee-' + i + '-' + j].enable();
      }
      j++;
    });

    let ii = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      j = 0;
      rentalItem.RentalItemFeeGroups.forEach((rentalFeeGroup) => {
        if (rentalFeeGroup.FGId === feegroup.FGId) {
          if (!checked) {
            this.copyVenueForm.controls['4_RentalFeeGroup-' + ii + '-' + j].setValue(false);
            this.copyVenueForm.controls['4_RentalFeeGroup-' + ii + '-' + j].disable();
          } else {
            this.copyVenueForm.controls['4_RentalFeeGroup-' + ii + '-' + j].enable();
          }
        }
        j++;
      });
      ii++;
    });
  }

  feeGroupIndexForRentalItemFeeGroup(rifg: RentalItemFeeGroup) {
    for (let i = 0; i < this.venue.FeeGroups.length; i++) {
      if (this.venue.FeeGroups[i].FGId === rifg.FGId) {
        return i;
      }
    }
    return -1;
  }

  onRentalSelect(checked, i) {
    const rentalItem = this.venue.RentalItems[i];
    let j = 0;
    rentalItem.RentalItemFeeGroups.forEach((rentalFeeGroup) => {
      if (!checked) {
        this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].setValue(checked);
        this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].disable();
      } else {
        const fgi = this.feeGroupIndexForRentalItemFeeGroup(rentalFeeGroup);
        if (fgi >= 0) {
          if (this.copyVenueForm.controls['1_FeeGroup-' + fgi].value) {
            this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].enable();
          } else {
            this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].disable();
          }
        }
      }
      j++;
    });
  }

  onSelectAll(checked) {
    let i = 0;
    this.venue.FeeGroups.forEach((feegroup) => {
      this.copyVenueForm.controls['1_FeeGroup-' + i].setValue(checked);
      let j = 0;
      feegroup.Fees.forEach(() => {
        this.copyVenueForm.controls['2_Fee-' + i + '-' + j].setValue(checked);
        j++;
      });
      i++;
    });
    i = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      this.copyVenueForm.controls['3_Rental-' + i].setValue(checked);
      let j = 0;
      rentalItem.RentalItemFeeGroups.forEach(() => {
        this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].setValue(checked);
        if (!checked) {
          this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].disable();
        } else {
          this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].enable();
        }
        j++;
      });
      i++;
    });
  }

  updatedSelectedCount(selections) {
    this.selectedCount = 0;
    for (const i in selections) {
      const selected = selections[i];
      if (selected) {
        this.selectedCount++;
      }
    }
    const targetVenue = this.copyVenueForm.controls['TargetVenue'].value;
    if (targetVenue !== '0') {
      if (targetVenue.indexOf('/') >= 0) {
        const target = targetVenue.split('/');
        this.toLId = +target[1];
        this.toLicId = +target[0];
      } else {
        this.toVenue = this.venues.find(x => x.LId === +targetVenue);
        this.toLId = this.toVenue.LId;
        this.toLicId = this.toVenue.LicId;
      }
    } else {
      this.toVenue = null;
      this.toLId = 0;
      this.toLicId = 0;
    }
  }

  gatherFromVenueSelections() {
    this.fromVenue = new Venue();
    let count = 0;
    Object.keys(this.copyVenueForm.controls).forEach(key => {
      if (this.copyVenueForm.get(key).value === true) {
        if (key.indexOf('1_FeeGroup-') !== -1) {
          const indexes = key.split('-');
          const i = +indexes[1];
          const newFeeGroup: any = Object.assign({}, this.venue.FeeGroups[i]);
          newFeeGroup.Fees = [];
          this.fromVenue.FeeGroups.push(newFeeGroup);
          count++;
        }
        if (key.indexOf('2_Fee-') !== -1) {
          const indexes = key.split('-');
          const i = +indexes[1];
          const j = +indexes[2];
          const newFee: any = Object.assign({}, this.venue.FeeGroups[i].Fees[j]);
          const fg = this.fromVenue.FeeGroups.find(x => x.FGId === newFee.FGId);
          if (fg !== undefined) {
            fg.Fees.push(newFee);
          }
          count++;
        }
        if (key.indexOf('3_Rental-') !== -1) {
          const indexes = key.split('-');
          const i = +indexes[1];
          const newRental: any = Object.assign({}, this.venue.RentalItems[i]);
          newRental.RentalItemFeeGroups = [];
          this.fromVenue.RentalItems.push(newRental);
          count++;
        }
        if (key.indexOf('4_RentalFeeGroup-') !== -1) {
          const indexes = key.split('-');
          const i = +indexes[1];
          const j = +indexes[2];
          const newRIFG: any = Object.assign({}, this.venue.RentalItems[i].RentalItemFeeGroups[j]);
          const ri = this.fromVenue.RentalItems.find(x => x.RId === newRIFG.RId);
          if (ri !== undefined) {
            ri.RentalItemFeeGroups.push(newRIFG);
          }
          count++;
        }
      }
    });
    console.log('gatherFromVenueSelections Total Selected: ' + count);
    return count;
  }

  copyFromTo() {
    const LId = this.toVenue.LId;
    //
    // Need to set a Temp Fee Group Id for each Fee Group and Rental Item Fee Group
    //
    this.fromVenue.FeeGroups.forEach(feeGroup => {
      feeGroup.TempFGId = UUID.UUID();
    });
    this.fromVenue.RentalItems.forEach(rentalItem => {
      rentalItem.RentalItemFeeGroups.forEach(rifg => {
        const fg = this.fromVenue.FeeGroups.find(x => x.FGId === rifg.FGId);
        if (fg !== undefined) {
          rifg.TempFGId = fg.TempFGId;
        }
      });
    });
    this.fromVenue.FeeGroups.forEach(feeGroup => {
      feeGroup.LId = LId;
      feeGroup.FGID = 0;
      feeGroup.Fees.forEach(fee => {
        fee.LId = LId;
        fee.FGID = 0;
        this.sessionService.setSaveState(FormTypes.Fees, true, true);
      });
      this.toVenue.FeeGroups.push(feeGroup);
      this.sessionService.setSaveState(FormTypes.FeeGroups, true, true);
    });
    this.fromVenue.RentalItems.forEach(rentalItem => {
      rentalItem.LId = LId;
      rentalItem.RId = 0;
      rentalItem.RentalItemFeeGroups.forEach(rifg => {
        rifg.RId = 0;
      });
      this.toVenue.RentalItems.push(rentalItem);
      this.sessionService.setSaveState(FormTypes.Rentals, true, true);
    });
  }

  onCopyCmd() {
    const totalSelected = this.gatherFromVenueSelections();
    let licIndex = 0;
    if (totalSelected > 0) {
      if (this.toLicId !== this.venue.LicId) {
        this.venueDataService.getVenuesPromise(this.toLicId).then(() => {
            this.venues = this.venueService.getVenues();
            this.toVenue = this.venues.find(x => x.LId === this.toLId);
          licIndex = this.resellerService.getIndexForLicensee(this.toLicId);
          this.sessionService.licensee = this.licenseeService.getLicensee(licIndex);
          this.sessionService.LicenseeId = this.sessionService.licensee.LicId;
            this.completeCopy(licIndex);
          }
        );
      } else {
        this.toVenue = this.venues.find(x => x.LId === this.toLId);
        this.completeCopy(licIndex);
      }
    } else {
      this.modal.close('Failed');
    }
  }

  completeCopy(licIndex) {
    this.copyFromTo();
    this.modal.close('Ok');
    for (let i = 0; i < this.venues.length; i++) {
      if (this.venues[i].LId === this.toVenue.LId) {
        this.toVenue.HasVenueDetail = true;
        this.router.navigate(['licensee/' + licIndex + /locations/ + i + '/detail']);
      }
    }
  }

}
