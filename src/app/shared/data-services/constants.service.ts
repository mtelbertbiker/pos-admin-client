import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  AdminBaseUri = 'http://192.168.234.133:41000/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  FeeCalcBaseUri = 'http://192.168.234.133:51447/FeeCalc';

  constructor() { }

}
