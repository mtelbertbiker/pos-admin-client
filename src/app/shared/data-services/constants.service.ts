import {Injectable} from '@angular/core';

@Injectable()
export class ConstantsService {
  //  BaseUri = 'https://localhost';
  //  AdminBaseUri = this.BaseUri + ':44318/api';
  AdminBaseUri = 'https://fm-posadminprod1.azurewebsites.net/api';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  AdminResellerLicenseesUri = '/Resellers/Licensees/';
  AdminResellerLocationsUri = '/Resellers/Locations/';
  AdminLicenseesUri = '/Licensees/';
  // FeeCalcBaseUri = this.BaseUri + ':44318/FeeCalc';  // Connect to Fee Calc API via Web Admin API
   FeeCalcBaseUri = 'https://fm-posadminprod1.azurewebsites.net/FeeCalc';
  // ReportsUri = 'https://localhost:44318/api/reports';
  ReportsUri = 'https://fm-posadminprod1.azurewebsites.net/api/reports';
  ContactUsLogicAppUri = 'https://prod-28.southcentralus.logic.azure.com:443/workflows/eadeab8822764e1d99c6ca39bb78b720/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MKD1ouh-wyhfo4QRTrnXLtCVI_W02sRAuFBv4dP6Ca0';


  SupportedRentalTypes = [
    {
      Id: 1,
      Name: 'Pool'
    },
    {
      Id: 2,
      Name: 'Darts'
    },
    {
      Id: 3,
      Name: 'Shuffle Board'
    },
    {
      Id: 99,
      Name: 'Not Selected'
    }
  ];

  FeeRoundingTypes = [
    {
      Id: 0,
      Name: 'No Rounding'
    },
    {
      Id: 1,
      Name: 'Nearest .05'
    },
    {
      Id: 2,
      Name: 'Nearest .25'
    },
    {
      Id: 3,
      Name: 'Nearest 1.00'
    },
  ];

}

export enum LoginTypes {
  NotSpecified,
  Operator,
  Distributor
}

export enum FormTypes {
  Licensees = 'Licensee',
  Locations = 'Location',
  Rentals = 'Rentals',
  FeeGroups = 'Fee Groups',
  Fees = 'Fees',
  Users = 'Users',
  FloorPlans = 'Floor Plans'
}

export class RegexPatterns {
  public static readonly ONE_DANK_REGEX = /^[dank]+$/g;
  public static readonly Name = /^[a-zA-Z0-9.,\'# ]+$/g;
  public static readonly Number = /^[0-9.\- ]+$/g;
  public static readonly Money = /^[0-9.]+$/g;
}
