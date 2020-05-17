import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../shared/data-services/session.service';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../venue.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-copy-venue-modal',
  templateUrl: './copy-venue-modal.component.html',
  styleUrls: ['./copy-venue-modal.component.scss']
})
export class CopyVenueModalComponent implements OnInit {
  index: number;
  venue: Venue;
  venues: Venue[];
  copyVenueForm: FormGroup;

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
  }

  initForm() {
    const select = true;
    this.copyVenueForm = new FormGroup(
      {
        'SelectAll': new FormControl(select, Validators.required),
      }
    );
    let i = 0;
    this.venue.FeeGroups.forEach((feegroup) => {
      this.copyVenueForm.addControl('FeeGroup' + i, new FormControl(select, Validators.required));
      let j = 0;
      feegroup.Fees.forEach((fee) => {
        this.copyVenueForm.addControl('Fee' + i + '-' + j, new FormControl(select, Validators.required));
        j++;
      });
      i++;
    });
    i = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      this.copyVenueForm.addControl('Rental' + i, new FormControl(select, Validators.required));
      let j = 0;
      rentalItem.RentalItemFeeGroups.forEach((fee) => {
        this.copyVenueForm.addControl('RentalFeeGroup' + i + '-' + j, new FormControl(select, Validators.required));
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
        this.copyVenueForm.controls['Fee' + i + '-' + j].setValue(false);
        this.copyVenueForm.controls['Fee' + i + '-' + j].disable();
      } else {
        this.copyVenueForm.controls['Fee' + i + '-' + j].enable();
      }
      j++;
    });

    let ii = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      j = 0;
      rentalItem.RentalItemFeeGroups.forEach((rentalFeeGroup) => {
        if (rentalFeeGroup.FGId === feegroup.FGId) {
          if (!checked) {
            this.copyVenueForm.controls['RentalFeeGroup' + ii + '-' + j].setValue(false);
            this.copyVenueForm.controls['RentalFeeGroup' + ii + '-' + j].disable();
          } else {
            this.copyVenueForm.controls['RentalFeeGroup' + ii + '-' + j].enable();
          }
        }
        j++;
      });
      ii++;
    });
  }

  onRentalSelect(checked, i) {
    const rentalItem = this.venue.RentalItems[i];
    let j = 0;
    rentalItem.RentalItemFeeGroups.forEach((feegroup) => {
      this.copyVenueForm.controls['RentalFeeGroup' + i + '-' + j].setValue(checked);
      j++;
    });
  }

  onSelectAll(checked) {
    let i = 0;
    this.venue.FeeGroups.forEach((feegroup) => {
      this.copyVenueForm.controls['FeeGroup' + i].setValue(checked);
      let j = 0;
      feegroup.Fees.forEach((fee) => {
        this.copyVenueForm.controls['Fee' + i + '-' + j].setValue(checked);
        j++;
      });
      i++;
    });
    i = 0;
    this.venue.RentalItems.forEach((rentalItem) => {
      this.copyVenueForm.controls['Rental' + i].setValue(checked);
      let j = 0;
      rentalItem.RentalItemFeeGroups.forEach((fee) => {
        this.copyVenueForm.controls['RentalFeeGroup' + i + '-' + j].setValue(checked);
        j++;
      });
      i++;
    });
  }

}
