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

}
