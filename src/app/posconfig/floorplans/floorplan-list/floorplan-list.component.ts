import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../shared/data-services/session.service';
import {CdkDrag, CdkDragEnd} from '@angular/cdk/drag-drop';
import {Floorplan} from '../../../shared/pos-models/floorplan.model';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';

@Component({
  selector: 'app-floorplan-list',
  templateUrl: './floorplan-list.component.html',
  styleUrls: ['./floorplan-list.component.css']
})
export class FloorplanListComponent implements OnInit {
  venue: Venue;
  floorplan: Floorplan;
  id: number;
  offset = { x: 0, y: 0 };

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
          /*
          this.floorplan = this.venue.Floorplans[0];
          this.floorplan.FloorplanItems.forEach(function (floorplanitem) {
            if (typeof (floorplanitem.Position) === 'string') {
              floorplanitem.Position = JSON.parse(floorplanitem.Position);
            }
          });
           */
        }
      );
  }

  onAddFloorPlan() {
  }
  /*
  dragEnd(event: CdkDragEnd) {
    this.offset = { ...(<any>event.source._dragRef)._passiveTransform };
    const index = event.source.data;
    this.floorplan.FloorplanItems[index].Position['x'] = this.offset.x;
    this.floorplan.FloorplanItems[index].Position['y'] = this.offset.y;
    console.log('FloorplanList: New Position for ', index , this.offset);
  }
*/

}
