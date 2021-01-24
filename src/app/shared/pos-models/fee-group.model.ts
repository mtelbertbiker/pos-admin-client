import {Fee} from './fee.model';
export class FeeGroup {
  constructor(public LId = 0,
              public Bid = 0,
              public FGId = 0,
              public TempFGId = '',
              public Name = 'New Fee Group',
              public RequiresUsers = false,
              public MinUsers = 0,
              public MaxUsers = 0,
              public RequiredFee = 0,
              public CondenseUserFees = false,
              public ItemId = 0,
              public Disabled = false,
              public TransferUserEnabled = false,
              public UserNameTrackingEnabled = false,
              public FeeRounding = 0,
              public Fees = [],
              public Prepaid = false,
              public FirstRentalEndWarning = 0,
              public RentalEndWarningInterval = 0,
              public RenterPhoneTrackingEnabled = false,
              public WifiLiteStates = []
  ) {}
}
