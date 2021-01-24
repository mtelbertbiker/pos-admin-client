import {Injectable} from '@angular/core';
import {Venue} from '../shared/pos-models/venue.model';
import {Subject} from 'rxjs';

@Injectable()
export class VenueService {
  venuesChanged = new Subject<Venue[]>();
  private venues: Venue[] = [];

  constructor() {
  }

  getVenues() {
    return this.venues.slice();
  }

  getVenue(index: number) {
    return this.venues[index];
  }

  getVenueForLicLid(licId: number, lId: number) {
    const i = this.venues.findIndex(x => x.LicId === licId && x.LId === lId);
    return this.venues[i];
  }

  putVenue(index: number, venue: Venue) {
    this.venues[index] = venue;
  }

  getVenuesForLicensee(licId: number) {
    return this.venues.filter(v => v.LicId === licId);
  }

  setVenues(venues: Venue[]) {
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  getVenueCountForLicensee(licId: number) {
    const venues = this.venues.filter(v => v.LicId === licId);
    if (venues) {
      return venues.length;
    } else {
      return 0;
    }
  }

  getDisabledVenueCountForLicensee(licId: number) {
    const venues = this.venues.filter(v => v.LicId === licId && v.Disabled === true);
    if (venues) {
      return venues.length;
    } else {
      return 0;
    }
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
    this.venues[index].EODTime = updatedVenue.EODTime;
    if (updatedVenue['Enabled'] !== undefined) {
      if (updatedVenue['Enabled'] === true) {
        this.venues[index].Disabled = false;
      } else {
        this.venues[index].Disabled = true;
      }
    }
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
    this.venues[index].WifiLightBulbStates = updatedVenue.WifiLightBulbStates;
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
