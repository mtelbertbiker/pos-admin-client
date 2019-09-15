import {Component, Input, OnInit} from '@angular/core';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {FloorplanItem} from '../../../../shared/pos-models/floorplan-item.model';
import {FeeGroup} from '../../../../shared/pos-models/fee-group.model';

@Component({
  selector: 'app-floorplanlist-item',
  templateUrl: './floorplanlist-item.component.html',
  styleUrls: ['./floorplanlist-item.component.css', '../floorplan-list.component.css']
})
export class FloorplanlistItemComponent implements OnInit {
  @Input() floorplanitem: FloorplanItem;
  @Input() index: number;
  @Input() vid: number;

  constructor() { }

  ngOnInit() {
    console.log('FloorplanlistItemComponent init: ' +
      this.floorplanitem.ItemId + ' x:' +
      this.floorplanitem.Position['x'] + ' y:' +
      this.floorplanitem.Position['y']);
  }
}
