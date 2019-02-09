import {RentalItemFeeGroup} from './rental-item-fee-group.model';
export class RentalItem {
  constructor(public LId: number,
    public RId: number,
    public Name: string,
    public RentalTypeId: number,
    public DisplayOrder: number,
    public RentalItemFeeGroups: RentalItemFeeGroup[]) {}
}
