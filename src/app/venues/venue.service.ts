import { Injectable } from '@angular/core';
import { Venue } from '../shared/pos-models/venue.model';
import {Subject} from 'rxjs';

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

  putVenue(index: number, venue: Venue){
    this.venues[index] = venue;
  }

  getVenuesForLicensee(licId: number) {
    return this.venues.filter(v => v.LicId === licId);
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
    this.venues[index].POSTypeId = updatedVenue.POSTypeId;
    this.venues[index].Disabled = !updatedVenue.Disabled;
    this.venues[index].LightControlEnabled = updatedVenue.LightControlEnabled;
    this.venues[index].Memo = updatedVenue.Memo;
    this.venues[index].Website = updatedVenue.Website;
    this.venues[index].IsChanged = true;
    if (updatedVenue.HasVenueDetail) {
      this.venues[index].HasVenueDetail = updatedVenue.HasVenueDetail;
    }
    this.venuesChanged.next(this.venues.slice());
  }

  updateVenueDetail(index: number, updatedVenue: Venue) {
    this.venues[index].ItemImages = updatedVenue.ItemImages;
    this.venues[index].FeeGroups = updatedVenue.FeeGroups;
    this.venues[index].RentalItems = updatedVenue.RentalItems;
    this.venues[index].Floorplans = updatedVenue.Floorplans;
    this.venues[index].LocationRentalTypes = updatedVenue.LocationRentalTypes;
    this.venuesChanged.next(this.venues.slice());
  }

  addVenue(newVenue: Venue) {
    this.venues.push(newVenue);
    return this.venues.length - 1;
  }

  removeVenue(index: number) {
    this.venues.splice(index);
  }
}
