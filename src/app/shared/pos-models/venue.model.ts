import {ItemImage} from './item-image.model';
import {FeeGroup} from './fee-group.model';
import {RentalItem} from './rental-item.model';
import {LocationRentalType} from './location-rental-type.model';
import {WifiBulbState} from './wifi-bulb-state.model';
export class Venue {
  constructor(public LicId = 0,
              public BId = 0,
              public LId = 0,
              public Name = 'New Location',
              public Address1 = '',
              public Address2 = '',
              public City = '',
              public State = '',
              public PostalCode = '',
              public Phone1 = '',
              public Phone2 = '',
              public POSTypeId = 0,
              public EODTime = 0,
              public Memo  = '',
              public Disabled = false,
              public DisabledReason  = '',
              public LightControlEnabled = false,
              public Website = '',
              public HasVenueDetail = false,
              public ItemImages = [],
              public FeeGroups = [],
              public Floorplans = [],
              public RentalItems = [],
              public LocationRentalTypes = [],
              public WifiLightBulbStates: WifiBulbState[] = [],
              public UpdateCount = 0,
              public IsChanged = null,
              public LastUpdated = '') {}
}
