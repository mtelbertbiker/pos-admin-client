import { Injectable } from '@angular/core';
import { Venue } from '../shared/pos-objects/venue.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class VenueService {
  venuesChanged = new Subject<Venue[]>();
  private venues: Venue[] = [];

constructor() { }

getVenues() {
  return this.venues.slice();
}

getVenue(index: number) {
    return this.venues[index];
}

setVenues(venues: Venue[]) {
  this.venues = venues;
  this.venuesChanged.next(this.venues.slice());
}

}
