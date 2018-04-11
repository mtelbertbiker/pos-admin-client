import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  BaseUri = 'https://localhost';
  // AdminBaseUri = this.BaseUri + ':44318/api';
  AdminBaseUri = 'https://fm-posadminprod1.azurewebsites.net/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  AdminResellerLicenseesUri = '/Resellers/Licensees/';
  AdminResellerLocationsUri = '/Resellers/Locations/';
  AdminLicenseesUri = '/Licensees/';
  // FeeCalcBaseUri = this.BaseUri + ':44318/FeeCalc';  // Connect to Fee Calc API via Web Admin API
  FeeCalcBaseUri = 'https://fm-posadminprod1.azurewebsites.net/FeeCalc';

  SupportedRentalTypes = [
    { Id: 1,
    Name: 'Pool'},
    { Id: 2,
    Name: 'Darts'},
    { Id: 3,
    Name: 'Shuffle Board'},
    {Id: 99,
    Name: 'N/A'}
  ];

  constructor() { }

}
