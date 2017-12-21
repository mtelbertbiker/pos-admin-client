import {User} from '../user.model';
export class ResellerUser extends User {
  constructor(public UserId: number,
              public UserName: string,
              public FirstName: string,
              public LastName: string,
              public Email: string,
              public Phone: string,
              public Disabled: boolean,
              public UpdatedUtc: string,
              public Title: string) {
    super(UserId, UserName, FirstName, LastName, Email, Phone, Disabled, UpdatedUtc);
  }
}
