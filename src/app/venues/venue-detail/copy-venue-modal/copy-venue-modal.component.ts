import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../shared/data-services/session.service';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../venue.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-copy-venue-modal',
  templateUrl: './copy-venue-modal.component.html',
  styleUrls: ['./copy-venue-modal.component.scss']
})
export class CopyVenueModalComponent implements OnInit {
  index: number;
  venue: Venue;
  fromVenue: Venue;
  venues: Venue[];
  copyVenueForm: FormGroup;
  selectedCount = 0;
  subscription: Subscription;

  constructor(public modal: NgbActiveModal,
              private sessionService: SessionService,
              private venueService: VenueService) {
  }

  ngOnInit() {
    console.log('Venue Copy onInit');
    this.index = this.sessionService.getCurrentVenueIndex();
    this.venue = this.venueService.getVenue(this.index);
    this.venues = this.venueService.getVenues();
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
        'TargetVenue': new FormControl(''),
      }
    );
    let i = 0;
    this.venue.FeeGroups.forEach((feegroup) => {
      this.copyVenueForm.addControl('1_FeeGroup-' + i, new FormControl(select, Validators.required));
      let j = 0;
      feegroup.Fees.forEach((fee) => {
        this.copyVenueForm.addControl('2_Fee-' + i + '-' + j, new FormControl(select, Validators.required));
        j++;
      });
      i++;
    });
    i = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      this.copyVenueForm.addControl('3_Rental-' + i, new FormControl(select, Validators.required));
      let j = 0;
      rentalItem.RentalItemFeeGroups.forEach((fee) => {
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
    return fg.Name;
  }

  onFeeGroupSelect(checked, i) {
    const feegroup = this.venue.FeeGroups[i];
    let j = 0;
    feegroup.Fees.forEach((fee) => {
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

  feeGroupIndex(rifg) {
    for (let i = 0; i < this.venue.FeeGroups.length; i++) {
      if (this.venue.FeeGroups[i].FGId === rifg.FGId) {
        return i;
      }
    }
  }

  onRentalSelect(checked, i) {
    const rentalItem = this.venue.RentalItems[i];
    let j = 0;
    rentalItem.RentalItemFeeGroups.forEach((rentalFeeGroup) => {
      if (!checked) {
        this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].disable();
      } else {
        const fgi = this.feeGroupIndex(rentalFeeGroup);
        if (this.copyVenueForm.controls['1_FeeGroup-' + fgi].value) {
          this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].enable();
        } else {
          this.copyVenueForm.controls['4_RentalFeeGroup-' + i + '-' + j].disable();
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
      feegroup.Fees.forEach((fee) => {
        this.copyVenueForm.controls['2_Fee-' + i + '-' + j].setValue(checked);
        j++;
      });
      i++;
    });
    i = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      this.copyVenueForm.controls['3_Rental-' + i].setValue(checked);
      let j = 0;
      rentalItem.RentalItemFeeGroups.forEach((fee) => {
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
  }

  gatherFromVenueSelections() {
    this.fromVenue = new Venue();
    Object.keys(this.copyVenueForm.controls).forEach(key => {
      if (this.copyVenueForm.get(key).value === true) {
        if (key.indexOf('1_FeeGroup-') !== -1) {
          const indexes = key.split('-');
          const i = +indexes[1];
          const newFeeGroup: any = Object.assign({}, this.venue.FeeGroups[i]);
          newFeeGroup.Fees = [];
          this.fromVenue.FeeGroups.push(newFeeGroup);
        }
        if (key.indexOf('3_Rental-') !== -1) {
          const indexes = key.split('-');
          const i = +indexes[1];
          const newRental: any = Object.assign({}, this.venue.RentalItems[i]);
          newRental.RentalItemFeeGroups = [];
          this.fromVenue.RentalItems.push(newRental);
        }
      }
    });
  }

  onCopyCmd() {
    this.gatherFromVenueSelections();
    this.modal.close('Ok');
  }

}
