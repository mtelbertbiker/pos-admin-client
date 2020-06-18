import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../../shared/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private log:  LogService) {
  }

  ngOnInit() {
    this.log.logTrace('HomeComponent onInit');
  }
}
