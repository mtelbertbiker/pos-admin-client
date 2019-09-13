import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../shared/data-services/session.service';
import {CdkDrag, CdkDragEnd} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-floorplan-list',
  templateUrl: './floorplan-list.component.html',
  styleUrls: ['./floorplan-list.component.css']
})
export class FloorplanListComponent implements OnInit {
  venue: Venue;
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
        }
      );
  }

  dragEnd(event: CdkDragEnd) {
    this.offset = { ...(<any>event.source._dragRef)._passiveTransform };

    this.position.x = this.initialPosition.x + this.offset.x;
    this.position.y = this.initialPosition.y + this.offset.y;

    console.log('New Position', this.position, this.initialPosition, this.offset);


    // console.log(event);
  }

}
