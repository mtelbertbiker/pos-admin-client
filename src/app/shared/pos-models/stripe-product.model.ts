export class StripeProduct {
  constructor(public StripeProductId: string,
              public Name: string,
              public Desc: string,
              public StripePriceId: string,
              public Price: number,
              public DisplayOrder: number) {}
}
