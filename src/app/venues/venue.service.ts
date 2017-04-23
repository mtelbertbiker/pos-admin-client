import { Injectable } from '@angular/core';
import { Venue } from '../shared/pos-models/venue.model';
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

updateVenue(index: number, newVenue: Venue) {
  this.venues[index].Name = newVenue.Name;
  this.venues[index].Address1 = newVenue.Address1;
  this.venues[index].Address2 = newVenue.Address2;
  this.venues[index].City = newVenue.City;
  this.venues[index].State = newVenue.State;
  this.venues[index].PostalCode = newVenue.PostalCode;
  this.venues[index].Phone1 = newVenue.Phone1;
  this.venues[index].Phone2 = newVenue.Phone2;
  this.venuesChanged.next(this.venues.slice());
}

  updateVenueDetail(index: number, newVenue: Venue) {
    this.venues[index].ItemImages = newVenue.ItemImages;
    this.venues[index].FeeGroups = newVenue.FeeGroups;
    this.venues[index].RentalItems = newVenue.RentalItems;
    this.venuesChanged.next(this.venues.slice());
  }

}
