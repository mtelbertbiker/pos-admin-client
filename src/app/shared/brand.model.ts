import {Venue} from './pos-models/venue.model';

export class Brand {
  constructor(public LicId: number,
              public BId: number,
              public Name: string,
              public Locations: Venue[]
  ) {}
}
