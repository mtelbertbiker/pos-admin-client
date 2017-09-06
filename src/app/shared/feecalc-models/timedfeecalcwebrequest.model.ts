export class TimedFeeCalcWebRequest {
  public LicenseeId: number;
  public BrandId: number;
  public LocationId: number;
  public FeeGroupId: number;
  public Users: number;
  public StartTime: any;
  public StopTime: any;

  public constructor(init?: Partial<TimedFeeCalcWebRequest>) {
    Object.assign(this, init);
  }
}

