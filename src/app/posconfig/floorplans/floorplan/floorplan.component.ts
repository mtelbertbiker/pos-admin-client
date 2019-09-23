import {Component, Input, OnInit} from '@angular/core';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {Venue} from '../../../shared/pos-models/venue.model';
import {Floorplan} from '../../../shared/pos-models/floorplan.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../venues/venue.service';
import {FloorplanItem} from '../../../shared/pos-models/floorplan-item.model';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.css']
})
export class FloorplanComponent implements OnInit {
  @Input() floorplan: Floorplan;
  @Input() venue: Venue;
  offset = { x: 0, y: 0 };

  constructor() {}

  ngOnInit() {
    this.floorplan.FloorplanItems.forEach(function (floorplanitem) {
      if (typeof (floorplanitem.Position) === 'string') {
        floorplanitem.Position = JSON.parse(floorplanitem.Position);
      }
    });
  }

  dragEnd(event: CdkDragEnd) {
    this.offset = { ...(<any>event.source._dragRef)._passiveTransform };
    const index = event.source.data;
    this.floorplan.FloorplanItems[index].Position['x'] = this.offset.x;
    this.floorplan.FloorplanItems[index].Position['y'] = this.offset.y;
    console.log('FloorplanList: New Position for ', index , this.offset);
  }

}
