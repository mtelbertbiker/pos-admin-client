import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LogService} from '../../shared/log.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(private router: Router, private log: LogService) { }

  ngOnInit() {
    this.log.logEvent('FORBIDDEN');
  }

  onGoHome() {
    this.log.logTrace('FORBIDDEN - onGoHome');
    this.router.navigate(['home']);
  }

}
