import {Component, Input, OnInit} from '@angular/core';
import {LogMsg} from '../../../../shared/pos-models/logmsg.model';

@Component({
  selector: 'app-feecalc-logmsg-item',
  templateUrl: './feecalc-logmsg-item.component.html',
})
export class FeecalcLogmsgItemComponent implements OnInit {
  @Input() logmsg: LogMsg;

  constructor() { }

  ngOnInit() {
  }

}
