import { Injectable } from '@angular/core';
import { Licensee } from '../shared/licensee.model';
import {Subject} from 'rxjs';
import {Venue} from '../shared/pos-models/venue.model';
import {Reseller} from '../shared/reseller-models/reseller.model';

@Injectable()
export class ResellerService {
  licenseesChanged = new Subject<Licensee[]>();
  venuesChanged = new Subject<Venue[]>();
  private licensees: Licensee[] = [];
  private venues: Venue[] = [];
  reseller: Reseller;

  constructor() { }

  getLicensees() {
    return this.licensees.slice();
  }

  getLicensee(index: number) {
    return this.licensees[index];
  }

  setLicensees(licensees: Licensee[]) {
    this.licensees = licensees;
    this.setLocations();
    this.licenseesChanged.next(this.licensees.slice());
  }

  setLocations() {
    this.licensees.forEach((currLicensee) => {
      currLicensee.Brands.forEach((currBrand) => {
        if (currBrand.Locations != null) {
          currBrand.Locations.forEach((currVenue) => {
            this.venues.push(currVenue);
          });
        }
      });
    });
    this.venuesChanged.next(this.venues.slice());
  }

  getLocations() {
    return this.venues;
  }

  getResellerLocationNamesAndIds() {
    const allResellerVenuesList = [];
    this.licensees.forEach((currLicensee) => {
      currLicensee.Brands.forEach((currBrand) => {
        if (currBrand.Locations != null) {
          currBrand.Locations.forEach((currVenue) => {
            const licId = currLicensee.LicId;
            const licName = currLicensee.Name;
            const name = currVenue.Name;
            const lId = currVenue.LId;
            const venueData = {
              LicId: licId,
              LicName: licName,
              Name: name,
              LId: lId
            };
            allResellerVenuesList.push((venueData));
          });
        }
      });
    });
    return allResellerVenuesList;
  }

  getIndexForLicensee(licId) {
    let i = 0;
    let found = false;
    this.licensees.forEach(() => {
      if (this.licensees[i].LicId === licId) {
        found = true;
        return i;
      }
      i++;
    });
    if (found) {
      return i;
    } else {
      return -1;
    }
  }

  updateLicensee(index: number, updatedLicensee: Licensee) {
    this.licensees[index].Name = updatedLicensee.Name;
    this.licensees[index].Address1 = updatedLicensee.Address1;
    this.licensees[index].Address2 = updatedLicensee.Address2;
    this.licensees[index].City = updatedLicensee.City;
    this.licensees[index].State = updatedLicensee.State;
    this.licensees[index].PostalCode = updatedLicensee.PostalCode;
    this.licensees[index].Phone1 = updatedLicensee.Phone1;
    this.licensees[index].Phone2 = updatedLicensee.Phone2;
    this.licenseesChanged.next(this.licensees.slice());
  }

  /*
  updateVenueDetail(index: number, updatedVenue: Venue) {
    this.venues[index].ItemImages = updatedVenue.ItemImages;
    this.venues[index].FeeGroups = updatedVenue.FeeGroups;
    this.venues[index].RentalItems = updatedVenue.RentalItems;
    this.venues[index].LocationRentalTypes = updatedVenue.LocationRentalTypes;
    this.venuesChanged.next(this.venues.slice());
  }
  */

  addLicensee(newLicensee: Licensee) {
    this.licensees.push(newLicensee);
    return this.licensees.length - 1;
  }
}

