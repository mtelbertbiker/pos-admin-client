import {User} from './user.model';
export class LicenseeUser extends User {
  constructor(public UserId = 0,
              public FirstName = '',
              public LastName = '',
              public Email = '',
              public Phone = '',
              public Disabled = false,
              public AppUser = true,
              public Administrator = false) {
    super(UserId, FirstName, LastName, Email, Phone, Disabled);
  }
}
