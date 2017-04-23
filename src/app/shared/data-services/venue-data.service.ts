import { Injectable } from '@angular/core';
import { VenueService } from '../../venues/venue.service';
import {Http, Response} from '@angular/http';
import {Venue} from '../pos-models/venue.model';
import 'rxjs/Rx';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';

@Injectable()
export class VenueDataService {

  constructor(private http: Http,
              private venueService: VenueService,
              private consts: ConstantsService,
              private session: SessionService) { }

  getVenues() {
    this.http.get(this.consts.AdminBaseUri +
      this.consts.AdminLicenseeLocationsUri +
      this.session.LicenseeId + '/' +
      this.session.BrandId )
      .map(
        (response: Response) => {
          const venues: Venue[] = response.json();
          return venues;
        }
      )
      .subscribe(
        (venues: Venue[]) => {
          this.venueService.setVenues(venues);
        }
      );
  }
  putVenue(index: number) {
    const venue =  this.venueService.getVenue(index);
    const location = {
      'LicId': venue['LicId'],
      'BId': venue['BId'],
      'LId': venue['LId'],
      'Name': venue.Name,
      'Address1': venue.Address1,
      'Address2': venue.Address2,
      'City': venue.City,
      'State': venue.State,
      'PostalCode': venue.PostalCode,
      'Phone1': venue.Phone1,
      'Phone2': venue.Phone2
    };
    // Change the '/0' to the location Id when adding new location
    return this.http.put(this.consts.AdminBaseUri + this.consts.AdminLocationsUri + '/0',
      location);
  }
  getVenueDetail(index: number) {
    let venue =  this.venueService.getVenue(index);
    this.http.get(this.consts.AdminBaseUri +
      this.consts.AdminLocationDetailUri +
      venue['LicId'] + '/' +
      venue['BId'] + '/' +
      venue['LId'])
      .map(
        (response: Response) => {
          venue = response.json();
          return venue;
        }
      )
      .subscribe(
        (thevenue: Venue) => {
          this.venueService.updateVenueDetail(index, thevenue);
        }
      );
  }

}
