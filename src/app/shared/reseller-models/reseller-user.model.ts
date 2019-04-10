import {User} from '../user.model';
export class ResellerUser extends User {
  constructor(public UserId: number,
              public FirstName: string,
              public LastName: string,
              public Email: string,
              public Phone: string,
              public Disabled: boolean,
              public Title: string) {
    super(UserId, FirstName, LastName, Email, Phone, Disabled);
  }
}
