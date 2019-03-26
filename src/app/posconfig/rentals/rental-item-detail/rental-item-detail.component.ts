import {Component, Input, OnInit} from '@angular/core';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Venue} from '../../../shared/pos-models/venue.model';
import {RentalItemFeeGroup} from '../../../shared/pos-models/rental-item-fee-group.model';
import {Subscription} from 'rxjs/Subscription';
import {SessionService} from '../../../shared/data-services/session.service';
import {ConstantsService, FormTypes} from '../../../shared/data-services/constants.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-rental-item-detail',
  templateUrl: './rental-item-detail.component.html',
  styleUrls: ['./rental-item-detail.component.css']
})
export class RentalItemDetailComponent implements OnInit {
  rentalItem: RentalItem;
  venue: Venue;
  rentalItemDetailForm: FormGroup;
  vid: number;
  index: number;
  subscription: Subscription;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              public constantsService: ConstantsService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index =  +params['id'];
          this.vid = this.sessionService.getCurrentVenueIndex();
          this.venue = this.venueService.getVenue(this.vid);
          this.rentalItem = this.venue.RentalItems[this.index];
          this.initForm();
          this.subscription = this.rentalItemDetailForm.valueChanges.subscribe(
            (value) => {
              this.updateRentalItem(value);
              this.sessionService.setSaveState(FormTypes.Rentals, this.rentalItemDetailForm.valid, this.rentalItemDetailForm.dirty);
            }
          );
        }
      );
  }
  private initForm() {
    const Name = this.rentalItem.Name;
    const RentalTypeId = this.rentalItem.RentalTypeId;
    const Disabled = !this.rentalItem.Disabled;
    this.rentalItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(Name, Validators.required),
        'RentalTypeId': new FormControl(RentalTypeId, Validators.required),
        'Disabled': new FormControl(Disabled),
      }
    );
  }


  isFieldInvalid(fieldName: string) {
    return this.rentalItemDetailForm.controls[fieldName].invalid;
  }

  onAddFeeGroup(fgId: number) {
    this.venue.FeeGroups.forEach((feeGroup) => {
      if (feeGroup.FGId === fgId) {
        const rentalFeeGroup = new RentalItemFeeGroup(this.rentalItem.RId, fgId, this.venue.LId);
        this.rentalItem.RentalItemFeeGroups.push(rentalFeeGroup);
      }
    });
  }

  onDeleteFeeGroup(fgId: number) {
    let i = 0;
    for (i = 0; i < this.rentalItem.RentalItemFeeGroups.length; i++) {
      if (this.rentalItem.RentalItemFeeGroups[i].FGId === fgId) {
        this.rentalItem.RentalItemFeeGroups.splice(i, 1);
        return;
      }
    }
  }

  onSubmit() {}

  getFeeGroupDesc(groupId: number) {
    for (const feeGroup of this.venue['FeeGroups']) {
      if (feeGroup['FGId'] === groupId) {
        return feeGroup.Name;
      }
    }
  }

  getAvailableFeeGroups() {
    const availableFeeGroups = [];
    this.venue.FeeGroups.forEach((feeGroup) => {
      let found = false;
      this.rentalItem.RentalItemFeeGroups.forEach((rentalFeeGroup) => {
        if (feeGroup.FGId === rentalFeeGroup.FGId) {
          found = true;
        }
      });
      if (!found) {
        availableFeeGroups.push(feeGroup);
      }
    });
    return availableFeeGroups;
  }
  updateRentalItem(newRentalItem: RentalItem) {
    this.rentalItem.Name = newRentalItem.Name;
    this.rentalItem.RentalTypeId = newRentalItem.RentalTypeId;
    this.rentalItem.Disabled = !newRentalItem.Disabled;
  }
  onSelectChange(rentalTypeId: number) {
    this.rentalItem.RentalTypeId = rentalTypeId;
  }
  onDeleteRentalItem(index: number) {
    if (confirm('Delete this Rental Item?') === true) {
      this.venue.RentalItems.splice(index, 1);
      this.router.navigate(['..'], {relativeTo: this.route});
    };
  }

  drop(event: CdkDragDrop<RentalItemFeeGroup[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let i = 1;
      for (const rentalItemFeeGroup of this.rentalItem.RentalItemFeeGroups) {
        rentalItemFeeGroup.DisplayOrder = i;
        i++;
      }
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
