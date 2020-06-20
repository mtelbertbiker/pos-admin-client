import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LogService} from '../../shared/log.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private router: Router, private log: LogService) { }

  ngOnInit() {
    this.log.logEvent('UNAUTHORIZED');
  }

  onGoHome() {
    this.log.logTrace('UNAUTHORIZED - onGoHome');
    this.router.navigate(['home']);
  }

}
