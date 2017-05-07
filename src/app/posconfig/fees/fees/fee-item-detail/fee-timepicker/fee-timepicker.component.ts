import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fee-timepicker',
  templateUrl: './fee-timepicker.component.html'
})
export class FeeTimePickerComponent implements OnInit {
  @Input() feeTime;

  ngOnInit() {
  }

}
