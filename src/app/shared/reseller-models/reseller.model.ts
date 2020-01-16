import {ResellerUser} from './reseller-user.model';
import {Licensee} from '../licensee.model';
export class Reseller {
  constructor(public Id: number,
              public Company: string,
              public ParentCompany: string,
              public Address1: string,
              public Address2: string,
              public City: string,
              public State: string,
              public PostalCode: string,
              public Country: string,
              public MainContactFirst: string,
              public MainContactLast: string,
              public MainContactPhone: string,
              public MainContactEmail: string,
              public OtherContactFirst: string,
              public OtherContactLast: string,
              public OtherContactPhone: string,
              public OtherContactEmail: string,
              public ResellerUsers: ResellerUser[],
              public Licensees: Licensee[],
              public Disabled: boolean,
              public UpdatedUtc: string) {}
}
