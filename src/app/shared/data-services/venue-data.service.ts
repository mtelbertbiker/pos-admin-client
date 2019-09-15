import {Injectable} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Venue} from '../pos-models/venue.model';

@Injectable()
export class VenueDataService {

  venues: any;
  venue: any;

  constructor(private http: HttpClient,
              private venueService: VenueService,
              private consts: ConstantsService,
              private session: SessionService,
              private oidcSecurityService: OidcSecurityService) {
  }

  getVenues(licId: number) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminLicenseeLocationsUri +
      licId + '/' +
      this.session.getBrandId();
    console.log('getVenues:' + apiUrl);
    this.http.get(apiUrl, {headers: headers})
      .subscribe(
        response => {
          this.venues = response;
          this.venueService.setVenues(this.venues);
          return this.venues;
        },
        error => {
          console.log(error);
          return [];
        }
      );
  }

  putVenue(venue: Venue) {
    const location = {
      'LicId': this.session.licensee.LicId,
      'BId': this.session.licensee.Brands[0].BId,
      'LId': venue['LId'],
      'Name': venue.Name,
      'Address1': venue.Address1,
      'Address2': venue.Address2,
      'City': venue.City,
      'State': venue.State,
      'PostalCode': venue.PostalCode,
      'Phone1': venue.Phone1,
      'Phone2': venue.Phone2,
      'FeeGroups': venue.FeeGroups,
      'Floorplans': venue.Floorplans,
      'RentalItems': venue.RentalItems,
      'WebSite': venue.Website,
      'Memo': venue.Memo,
      'POSTypeId': venue.POSTypeId,
      'LightControlEnabled': venue.LightControlEnabled,
      'Disabled': !venue.Disabled
    };
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    // Change the '/0' to the location Id when adding new location
    const apiUrl = this.consts.AdminBaseUri + this.consts.AdminLocationsUri;
    console.log('putVenue>>' + location.LId);
    return this.http.put(apiUrl, location, {headers: headers});
  }

  getVenueDetail(index: number) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    this.venue = this.venueService.getVenue(index);
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminLocationDetailUri +
      this.venue['LicId'] + '/' +
      this.venue['BId'] + '/' +
      this.venue['LId'];
    this.http.get(apiUrl, {headers: headers})
      .subscribe(
        response => {
          this.venue = response;
          console.log('getVenueDetail - ' + apiUrl);
          console.log(this.venue);
          this.venue.HasVenueDetail = true;
          this.venueService.updateVenue(index, this.venue);
          this.venueService.updateVenueDetail(index, this.venue);
          return this.venue;
        },
        error => console.log(error)
      );
  }

  deleteVenue(licId: number, bId: number, lId: number) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminLocationsUri + 'Remove/' +
      licId + '/' +
      bId + '/' +
      lId;

    return this.http.get(apiUrl, {headers: headers});
  }

}
