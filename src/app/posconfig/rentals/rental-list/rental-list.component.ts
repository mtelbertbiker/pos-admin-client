import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VenueService} from '../../../venues/venue.service';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SessionService} from '../../../shared/data-services/session.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css'],
})
export class RentalListComponent implements OnInit {
  venue: Venue;
  id: number;

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );
  }

  onAddRentalItem() {
    this.venue.RentalItems.push(new RentalItem());
    this.sessionService.setSaveState('Rentals', true, true);
    this.router.navigate([this.venue.RentalItems.length - 1], {relativeTo: this.route});
  }
  drop(event: CdkDragDrop<RentalItem[]>) {
    moveItemInArray(this.venue.RentalItems, event.previousIndex, event.currentIndex);
    let i = 1;
    for (const currRentalItem of this.venue.RentalItems) {
      currRentalItem.DisplayOrder = i;
      i++;
    }
  }
}
