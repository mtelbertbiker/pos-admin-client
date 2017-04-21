import {Fee} from './fee.model';
export class FeeGroup {
  constructor(public LId: number,
              public Bid: number,
              public FGId: number,
              public Name: string,
              public RequiresUsers: boolean,
              public MinUsers: number,
              public MaxUsers: number,
              public RequiredFee: number,
              public CondenseUserFees: boolean,
              public Fees: Fee[]
              ) {}
}
