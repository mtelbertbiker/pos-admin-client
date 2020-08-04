import {Injectable} from '@angular/core';

@Injectable()
export class ConstantsService {
  // *******************************
  // Local Testing
  // *******************************
  BaseUri = 'https://localhost';
  AdminBaseUri = this.BaseUri + ':44318/api';
  FeeCalcBaseUri = this.BaseUri + ':44318/FeeCalc';  // Connect to Fee Calc API via Web Admin API
  ReportsUri = this.AdminBaseUri + '/reports';
  BillingUri = this.AdminBaseUri + '/billing';
  // ReportsUri = 'https://localhost:44318/api/reports';
  // *******************************
  // Cloud
  // *******************************
  // AdminBaseUri = 'https://fm-posadminprod1.azurewebsites.net/api';
  // FeeCalcBaseUri = 'https://fm-posadminprod1.azurewebsites.net/FeeCalc';
  // ReportsUri = 'https://fm-posadminprod1.azurewebsites.net/api/reports';
  // ******************************
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  AdminResellerLicenseesUri = '/Resellers/Licensees/';
  AdminResellerLocationsUri = '/Resellers/Locations/';
  AdminLicenseesUri = '/Licensees/';
  ContactUsLogicAppUri = 'https://prod-28.southcentralus.logic.azure.com:443/workflows/eadeab8822764e1d99c6ca39bb78b720/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MKD1ouh-wyhfo4QRTrnXLtCVI_W02sRAuFBv4dP6Ca0';

  MaxUsers = 199;

  AvailableProducts = [
    {
      StripeProductId: 'prod_HbSwHgJz6T7SCm',
      Name: 'Basic Edition',
      Desc: 'Core Features needed for small/standalone rental operations - no internet / wireless needed',
      StripePriceId: 'price_1H2cIdGOAuP3gw61nhlxqDyf',
      Price: '50.00',
      DisplayOrder: 1
    },
    {
      StripeProductId: 'prod_HbpykW4dp7OUOd',
      Name: 'Brewery Edition',
      Desc: 'Adds features and support needed for larger operators',
      StripePriceId: 'price_1H2cIdGOAuP3gw61nhlxqDyf',
      Price: '75.00',
      DisplayOrder: 2
    },
    {
      StripeProductId: 'prod_HbSy08aOoPphIM',
      Name: 'Billiard Edition',
      Desc: 'Full Featured solution designed for Billiard Hall Operators',
      StripePriceId: 'price_1H2G29GOAuP3gw61OuvlE1RU',
      Price: '100.00',
      DisplayOrder: 3
    },
  ];

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
      Id: 4,
      Name: 'Axe Throw'
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
