export class User {
  constructor(public UserId: number,
              public UserName: string,
              public FirstName: string,
              public LastName: string,
              public Email: string,
              public Phone: string,
              public Disabled: boolean,
              public UpdatedUtc: string) {}
}
