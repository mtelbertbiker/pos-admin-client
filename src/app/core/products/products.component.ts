import {Component, OnInit} from '@angular/core';
import {LoginTypes, UserFlow} from '../../shared/data-services/constants.service';
import {SessionStorageService} from 'angular-web-storage';
import {SessionService} from '../../shared/data-services/session.service';
import {LogService} from '../../shared/log.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public sessionService: SessionService,
              public  websession: SessionStorageService,
              private log: LogService) {
  }

  ngOnInit() {
  }

  distributorSignIn() {
    this.sessionService.LoginType = LoginTypes.Distributor;
    this.websession.set('LoginType', LoginTypes.Distributor);
    this.log.logEvent('DistributorSignIn');
    this.sessionService.fmAuthorize(UserFlow.Susi);
  }

}
