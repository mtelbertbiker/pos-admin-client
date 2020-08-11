export class StripeBilling {
  constructor(public StripeCustomerId: string,
  public StripeProductId: string,
  public StripePriceId: string,
  public StripeSubscriptionId: string,
  public StripeQty: number) {}
}
