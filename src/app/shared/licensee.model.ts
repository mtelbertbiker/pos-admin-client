import {Brand} from './brand.model';
export class Licensee {
  constructor(public LicId: number,
              public Name: string,
              public ContactFirstName: string,
              public ContactLastName: string,
              public Address1: string,
              public Address2: string,
              public City: string,
              public State: string,
              public PostalCode: string,
              public Country: string,
              public Phone1: string,
              public Phone2: string,
              public Email: string,
              public Website: string,
              public Brands: Brand[],
              public Disabled: boolean,
              public UpdatedUtc: string) {}
}
