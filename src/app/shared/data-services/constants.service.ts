import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  AdminBaseUri = 'http://192.168.234.136:41000/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  FeeCalcBaseUri = 'http://192.168.234.136:51447/FeeCalc';

  constructor() { }

}
