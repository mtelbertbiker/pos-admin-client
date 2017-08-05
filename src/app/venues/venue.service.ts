import { Injectable } from '@angular/core';
import { Venue } from '../shared/pos-models/venue.model';
import {Subject} from 'rxjs/Subject';
import {Fee} from '../shared/pos-models/fee.model';
import {forEach} from '@angular/router/src/utils/collection';

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

  getVenueFees(index: number) {
    const fees: Fee[] = [];
    this.venues[index].FeeGroups.forEach(function(feeGroup) {
      feeGroup.Fees.forEach(function(fee) {
        fee.FGId = feeGroup.FGId;
        fees.push(fee);
      });
    });
    return fees;
  }

  setVenues(venues: Venue[]) {
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  updateVenue(index: number, updatedVenue: Venue) {
    this.venues[index].Name = updatedVenue.Name;
    this.venues[index].Address1 = updatedVenue.Address1;
    this.venues[index].Address2 = updatedVenue.Address2;
    this.venues[index].City = updatedVenue.City;
    this.venues[index].State = updatedVenue.State;
    this.venues[index].PostalCode = updatedVenue.PostalCode;
    this.venues[index].Phone1 = updatedVenue.Phone1;
    this.venues[index].Phone2 = updatedVenue.Phone2;
    this.updateVenueDetail(index, updatedVenue);
    this.venuesChanged.next(this.venues.slice());
  }

  updateVenueDetail(index: number, updatedVenue: Venue) {
    this.venues[index].ItemImages = updatedVenue.ItemImages;
    this.venues[index].FeeGroups = updatedVenue.FeeGroups;
    this.venues[index].RentalItems = updatedVenue.RentalItems;
    this.venues[index].LocationRentalTypes = updatedVenue.LocationRentalTypes;
    this.venuesChanged.next(this.venues.slice());
  }
}
