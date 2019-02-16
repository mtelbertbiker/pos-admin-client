import {RentalItemFeeGroup} from './rental-item-fee-group.model';
export class RentalItem {
  constructor(public LId = 0,
    public RId = 0,
    public Name = 'New Rental Item',
    public RentalTypeId = 0,
    public DisplayOrder = 0,
    public Disabled = false,
    public RentalItemFeeGroups = []
  ) {}
}
