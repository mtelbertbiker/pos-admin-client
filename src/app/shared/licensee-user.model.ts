import {User} from './user.model';
export class LicenseeUser extends User {
  constructor(public UserId: number,
              public FirstName: string,
              public LastName: string,
              public Email: string,
              public Phone: string,
              public Disabled: boolean,
              public AppUser: boolean,
              public Administrator: boolean,
              public UpdatedUtc: string) {
    super(UserId, FirstName, LastName, Email, Phone, Disabled, UpdatedUtc);
  }
}
