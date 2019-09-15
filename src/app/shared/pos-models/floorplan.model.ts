import {FloorplanItem} from './floorplan-item.model';

export class Floorplan {
  constructor(public LicId = 0,
              public BId = 0,
              public Lid = 0,
              public Id = 0,
              public Name = '',
              public DisplayOrder = 0,
              public FloorplanItems  = FloorplanItem[0]
  ) {}
}
