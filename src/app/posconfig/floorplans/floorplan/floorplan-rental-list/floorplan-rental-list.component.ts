import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Floorplan} from '../../../../shared/pos-models/floorplan.model';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {RentalItem} from '../../../../shared/pos-models/rental-item.model';
import {FloorplanItem} from '../../../../shared/pos-models/floorplan-item.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RentalItemFeeGroup} from '../../../../shared/pos-models/rental-item-fee-group.model';
import {FormTypes} from '../../../../shared/data-services/constants.service';

@Component({
  selector: 'app-floorplan-rental-list',
  templateUrl: './floorplan-rental-list.component.html',
  styleUrls: ['./floorplan-rental-list.component.css']
})
export class FloorplanRentalListComponent implements OnInit, OnChanges {
  @Input() floorplan: Floorplan;
  @Input() venue: Venue;
  availableRentalItemIndexes: number[];

  constructor() { }

  ngOnInit() {
    this.SetAvailableRentalItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.SetAvailableRentalItems();
  }

  SetAvailableRentalItems() {
    this.availableRentalItemIndexes = [];
    for (let i = 0; i < this.venue.RentalItems.length; i++) {
      const rentalItem = this.venue.RentalItems[i];
      let found = false;
      for (let j = 0; j < this.floorplan.FloorplanItems.length; j++) {
        const floorplanitem = this.floorplan.FloorplanItems[j];
        if (floorplanitem.ItemId === rentalItem.RId) {
          found = true;
        }
      }
      if (found === false) {
        this.availableRentalItemIndexes.push(i);
      }
    }
  }

  drop(event: CdkDragDrop<RentalItemFeeGroup[]>) {
    /*
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let i = 1;
      for (const rentalItemFeeGroup of this.rentalItem.RentalItemFeeGroups) {
        rentalItemFeeGroup.DisplayOrder = i;
        i++;
      }
      this.sessionService.setSaveState(FormTypes.Rentals, this.rentalItemDetailForm.valid, true);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.sessionService.setSaveState(FormTypes.Rentals, this.rentalItemDetailForm.valid, true);
    }
    */
  }


}
