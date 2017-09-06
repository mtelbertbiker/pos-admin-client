import {LogMsg} from '../pos-models/logmsg.model';
import {ChargedFee} from './chargedfee.model';
export class TimedFeeCalcResponse {
  constructor(
  public Ok: boolean,
  public LogMessages: LogMsg[],
  public TotalFee: number,
  public TotalTime: any,
  public FeeList: ChargedFee[],
  public MsgLevel: number) {}
}
