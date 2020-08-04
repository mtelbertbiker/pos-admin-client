import {Component, OnInit} from '@angular/core';
import {ConstantsService, FormTypes} from '../../../../shared/data-services/constants.service';
import {StripeService} from '../../../../shared/data-services/stripe.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Licensee} from '../../../../shared/licensee.model';
import {LicenseeService} from '../../../../shared/licensee.service';
import {SessionService} from '../../../../shared/data-services/session.service';
import {LogService} from '../../../../shared/log.service';

@Component({
  selector: 'app-licensee-billing-master-item',
  templateUrl: './licensee-billing-master-item.component.html',
  styleUrls: ['./licensee-billing-master-item.component.css']
})
export class LicenseeBillingMasterItemComponent implements OnInit {

  selectedProductId = undefined;
  selectedLocations = 0;
  licensee: Licensee;
  index: number;

  constructor(private stripeService: StripeService, private licenseeService: LicenseeService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private log: LogService) {
  }

  ngOnInit() {
    this.log.logTrace('LicenseeBillingMasterItemComponent onInit');
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.index);
          this.selectedLocations = this.licenseeService.getBillableCount(this.licensee.LicId);

        }
      );
  }
}

