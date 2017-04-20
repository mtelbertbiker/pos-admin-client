import { Injectable } from '@angular/core';
import { VenueService } from '../../venues/venue.service';
import {Http, Response} from '@angular/http';
import {Venue} from '../pos-objects/venue.model';
import 'rxjs/Rx';

@Injectable()
export class VenueDataService {

  constructor(private http: Http, private venueService: VenueService) { }

  getVenues() {
    this.http.get('http://localhost:41000/api/Locations/LicenseeLocations/1/2')
      .map(
        (response: Response) => {
          const venues: Venue[] = response.json();
          console.log('Venues follow:');
          console.log(venues);
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
    }
    return this.http.put('http://localhost:41000/api/Locations/0',
      location);
  }

}
