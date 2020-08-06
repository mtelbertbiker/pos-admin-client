import {Component, OnInit} from '@angular/core';
import {ConstantsService, FormTypes} from '../../../../shared/data-services/constants.service';
import {StripeService} from '../../../../shared/data-services/stripe.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Licensee} from '../../../../shared/licensee.model';
import {LicenseeService} from '../../../../shared/licensee.service';
import {SessionService} from '../../../../shared/data-services/session.service';
import {LogService} from '../../../../shared/log.service';
import {StripeProduct} from '../../../../shared/pos-models/stripe-product.model';

@Component({
  selector: 'app-licensee-billing-master-item',
  templateUrl: './licensee-billing-master-item.component.html',
  styleUrls: ['./licensee-billing-master-item.component.css']
})
export class LicenseeBillingMasterItemComponent implements OnInit {
  selectedLocations = 0;
  // licensee: Licensee;
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
          // this.licensee = this.licenseeService.getLicensee(this.index);
          this.stripeService.licensee = this.licenseeService.getLicensee(this.index);
          this.selectedLocations = this.licenseeService.getBillableCount( this.stripeService.licensee.LicId);
          this.stripeService.stripeProducts = this.getStripeProducts();
          this.stripeService.selectedProduct = this.stripeService.stripeProducts[1];
        }
      );
  }

  getStripeProducts(): StripeProduct[] {
    const AvailableProducts: StripeProduct[] = [
      {
        StripeProductId: 'prod_HbSwHgJz6T7SCm',
        Name: 'Basic Edition',
        Desc: 'Core Features needed for small/standalone rental operations - no internet / wireless needed',
        StripePriceId: 'price_1H2cIdGOAuP3gw61nhlxqDyf',
        Price: 50.00,
        DisplayOrder: 1
      },
      {
        StripeProductId: 'prod_HbpykW4dp7OUOd',
        Name: 'Brewery Edition',
        Desc: 'Adds features and support needed for larger operators',
        StripePriceId: 'price_1H2cIdGOAuP3gw61nhlxqDyf',
        Price: 75.00,
        DisplayOrder: 2
      },
      {
        StripeProductId: 'prod_HbSy08aOoPphIM',
        Name: 'Billiard Edition',
        Desc: 'Full Featured solution designed for Billiard Hall Operators',
        StripePriceId: 'price_1H2G29GOAuP3gw61OuvlE1RU',
        Price: 100.00,
        DisplayOrder: 3
      },
    ];
    return AvailableProducts;
  }

}

