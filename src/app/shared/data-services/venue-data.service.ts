import {Injectable} from '@angular/core';
import {VenueService} from '../../venues/venue.service';
import {ConstantsService} from './constants.service';
import {SessionService} from './session.service';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Venue} from '../pos-models/venue.model';
import {LogService} from '../log.service';

@Injectable()
export class VenueDataService {

  venues: any;
  venue: any;

  constructor(private http: HttpClient,
              private venueService: VenueService,
              private consts: ConstantsService,
              private session: SessionService,
              private log: LogService,
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
    this.log.logTrace('getVenues:' + apiUrl);
    this.http.get(apiUrl, {headers: headers})
      .subscribe(
        response => {
          this.venues = response;
          this.venueService.setVenues(this.venues);
          const venlist = this.venueService.getVenuesForLicensee(licId);
          this.log.logTrace('getVenues found: ' + venlist.length);
          return this.venues;
        },
        error => {
          this.log.logTrace('getVenues:' + error);
          this.session.Error = error;
          return [];
        }
      );
  }

  getVenuesPromise(licId: number, brandId = 0) {
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    let targetBrandId = brandId;
    if (brandId === 0) {
      targetBrandId = this.session.getBrandId();
    }
    const apiUrl = this.consts.AdminBaseUri +
      this.consts.AdminLicenseeLocationsUri +
      licId + '/' +
      targetBrandId;
    this.log.logTrace('getVenuesPromise:' + apiUrl);
    return this.http.get(apiUrl, {headers: headers})
      .toPromise().then(response => {
          this.venues = response;
          this.venueService.setVenues(this.venues);
          const venlist = this.venueService.getVenuesForLicensee(licId);
          this.log.logTrace('getVenuesPromise found: ' + venlist.length);
        },
        error => {
          this.log.logError('getVenuesPromise', error);
          this.session.Error = error;
        }
      );
  }

  putVenue(venue: Venue) {
    let bId = this.consts.DefaultBrand;
    if (this.session.licensee?.Brands.length > 0) {
      bId = this.session.licensee.Brands[0].BId;
    }
    const location = {
      'LicId': this.session.licensee.LicId,
      'BId': bId,
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
      'EODTime': venue.EODTime,
      'LightControlEnabled': venue.LightControlEnabled,
      'Disabled': venue.Disabled
    };
    const token = this.oidcSecurityService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('ClientId', this.session.ClientId);
    const apiUrl = this.consts.AdminBaseUri + this.consts.AdminLocationsUri;
    this.log.logTrace('putVenue:' + location.LId, location);
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
          this.log.logTrace('getVenueDetail - ' + apiUrl, response);
          this.venue.HasVenueDetail = true;
          this.venueService.updateVenue(index, this.venue);
          this.venueService.updateVenueDetail(index, this.venue);
          return this.venue;
        },
        error => this.log.logError('getVenueDetail', error)
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
