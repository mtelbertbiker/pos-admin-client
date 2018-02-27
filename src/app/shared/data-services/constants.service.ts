import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  BaseUri = 'https://192.168.0.22';
  AdminBaseUri = this.BaseUri + ':44318/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  AdminResellerLicenseesUri = '/Resellers/Licensees/';
  AdminResellerLocationsUri = '/Resellers/Locations/';
  AdminLicenseesUri = '/Licensees/';
  FeeCalcBaseUri = this.BaseUri + ':51447/FeeCalc';

  constructor() { }

}
