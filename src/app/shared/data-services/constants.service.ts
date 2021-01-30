import {Injectable} from '@angular/core';

@Injectable()
export class ConstantsService {
  AdminBaseUri = '';
  FeeCalcBaseUri = '';
  ReportsUri = '';
  BillingUri = '';
  AdminLicenseeLocationsUri = '/Locations/LicenseeLocations/';
  AdminLocationsUri = '/Locations/';
  AdminLocationDetailUri = '/Locations/LocationDetail/';
  AdminResellerLicenseesUri = '/Resellers/Licensees/';
  AdminResellerLocationsUri = '/Resellers/Locations/';
  AdminLicenseesUri = '/Licensees/';
  ContactUsLogicAppUri = 'https://prod-28.southcentralus.logic.azure.com:443/workflows/eadeab8822764e1d99c6ca39bb78b720/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MKD1ouh-wyhfo4QRTrnXLtCVI_W02sRAuFBv4dP6Ca0';

  MaxUsers = 199;

  DefaultBrand = 1;

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
    }
  ];

  SupportedRentalStates = [
    {
      RentalStateId: 3,
      Name: 'Available / Not In Use',
      FormName: 'Available',
      PrepaidOnly: false,
    },
    {
      RentalStateId: 4,
      Name: 'Busy / Rented',
      FormName: 'Busy',
      PrepaidOnly: false,
    },
    {
      RentalStateId: 5,
      Name: 'Rental Ending',
      FormName: 'Ending',
      PrepaidOnly: true,
    },
    {
      RentalStateId: 6,
      Name: 'Rental Ended',
      FormName: 'Ended',
      PrepaidOnly: true,
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

  constructor() {
    // if (false) {
    if (window.location.origin.includes('localhost')) {
      const BaseUri = 'https://localhost';
      this.AdminBaseUri = BaseUri + ':44318/api';
      this.FeeCalcBaseUri = BaseUri + ':44318/FeeCalc';  // Connect to Fee Calc API via Web Admin API
      this.ReportsUri = this.AdminBaseUri + '/reports';
      this.BillingUri = this.AdminBaseUri + '/billing';
    } else {
      this.AdminBaseUri = 'https://fm-posadminprod1.azurewebsites.net/api';
      this.FeeCalcBaseUri = 'https://fm-posadminprod1.azurewebsites.net/FeeCalc';
      this.ReportsUri = 'https://fm-posadminprod1.azurewebsites.net/api/reports';
      this.BillingUri = this.AdminBaseUri + '/billing';
    }
  }

}

export enum LoginTypes {
  NotSpecified,
  Operator,
  Distributor
}

export enum UserFlow {
  Susi = 'b2c_1_susin',
  SignUp = 'B2C_1_signup_fm1',
  ResetPsw = 'B2C_1_reset_fm1',
  EditProfile = 'B2C_1_edit_profile_fm1'
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
