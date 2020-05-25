import {Component, OnInit} from '@angular/core';
import {LoginTypes} from '../../shared/data-services/constants.service';
import {SessionStorageService} from 'angular-web-storage';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {SessionService} from '../../shared/data-services/session.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public sessionService: SessionService,
              public  websession: SessionStorageService,
              private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
  }

  distributorSignIn() {
    this.sessionService.LoginType = LoginTypes.Distributor;
    this.websession.set('LoginType', LoginTypes.Distributor);
    this.oidcSecurityService.authorize();
  }

}
