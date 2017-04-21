import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  AdminBaseUri = 'http://localhost:41000/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';

  constructor() { }

}
