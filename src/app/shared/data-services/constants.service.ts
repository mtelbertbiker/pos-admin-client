import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  BaseUri = 'http://192.168.0.22';
  AdminBaseUri = this.BaseUri + ':41000/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  FeeCalcBaseUri = this.BaseUri + ':51447/FeeCalc';

  constructor() { }

}
