import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../shared/data-services/session.service';
import {CdkDrag, CdkDragEnd} from '@angular/cdk/drag-drop';
import {Floorplan} from '../../../shared/pos-models/floorplan.model';

@Component({
  selector: 'app-floorplan-list',
  templateUrl: './floorplan-list.component.html',
  styleUrls: ['./floorplan-list.component.css']
})
export class FloorplanListComponent implements OnInit {
  venue: Venue;
  floorplan: Floorplan;
  id: number;

  initialPosition = { x: 100, y: 100 };
  position = { ...this.initialPosition };
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
          this.floorplan = this.venue.Floorplans[0];
          this.floorplan.FloorplanItems.forEach(function (floorplanitem) {
            if (typeof (floorplanitem.Position) === 'string') {
              floorplanitem.Position = JSON.parse(floorplanitem.Position);
            }
          });
        }
      );
  }

  dragEnd(event: CdkDragEnd) {
    //this.offset = { ...(<any>event.source._dragRef)._passiveTransform };
    this.offset = event.distance;
    const index = event.source.data;
    this.initialPosition.x = this.floorplan.FloorplanItems[index].Position['x'];
    this.initialPosition.y = this.floorplan.FloorplanItems[index].Position['y'];

    this.position.x = this.initialPosition.x + this.offset.x;
    this.position.y = this.initialPosition.y + this.offset.y;

    this.floorplan.FloorplanItems[index].Position['x'] = this.position.x;
    this.floorplan.FloorplanItems[index].Position['y'] = this.position.y;

    console.log('New Position for ', index, 'was', this.initialPosition, 'offset', this.offset, 'now', this.floorplan.FloorplanItems[index].Position)

    // console.log('New Position for ', this.position, this.initialPosition, this.offset)

    /*
    const index = event.source.data;
    this.initialPosition['x'] = this.floorplan.FloorplanItems[index].Position['x'];
    this.initialPosition['y'] = this.floorplan.FloorplanItems[index].Position['y'];
    this.floorplan.FloorplanItems[index].Position['x'] = this.floorplan.FloorplanItems[index].Position['x'] + this.offset.x;
    this.floorplan.FloorplanItems[index].Position['y'] = this.floorplan.FloorplanItems[index].Position['y'] + this.offset.y;
    console.log('New Position for ', index, 'was', this.initialPosition, 'now', this.floorplan.FloorplanItems[index].Position);
    */
  }

}
