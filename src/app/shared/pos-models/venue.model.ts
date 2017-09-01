import {ItemImage} from './item-image.model';
import {FeeGroup} from './fee-group.model';
import {RentalItem} from './rental-item.model';
import {LocationRentalType} from './location-rental-type.model';
export class Venue {
  constructor(public LicId: number,
              public BId: number,
              public LId: number,
              public Name: string,
              public Address1: string,
              public Address2: string,
              public City: string,
              public State: string,
              public PostalCode: string,
              public Phone1: string,
              public Phone2: string,
              public ItemImages: ItemImage[],
              public FeeGroups: FeeGroup[],
              public RentalItems: RentalItem[],
              public LocationRentalTypes: LocationRentalType[],
              public UpdateCount: number,
              public LastUpdated: string) {}
}
