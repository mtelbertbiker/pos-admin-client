import {Brand} from './brand.model';
import {Venue} from './pos-models/venue.model';
import {LicenseeUser} from './licensee-user.model';
import {StripeProduct} from './pos-models/stripe-product.model';
import {StripeBilling} from './pos-models/stripe-billing.model';

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
              public Venues: Venue[],
              public LicenseeUsers: LicenseeUser[],
              public ResellerId: number,
              public Disabled: boolean,
              public StripeBilling: StripeBilling,
              public StripeProducts: StripeProduct[],
              public UpdatedUtc: string) {}

}
