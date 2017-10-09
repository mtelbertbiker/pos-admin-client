import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  AdminBaseUri = 'http://192.168.0.21:41000/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  FeeCalcBaseUri = 'http://192.168.0.21:51447/FeeCalc';

  constructor() { }

}
