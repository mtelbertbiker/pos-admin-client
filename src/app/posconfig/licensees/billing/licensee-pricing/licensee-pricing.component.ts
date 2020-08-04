import {Component, Input, OnInit} from '@angular/core';
import {ConstantsService} from '../../../../shared/data-services/constants.service';
import {StripeService} from '../../../../shared/data-services/stripe.service';
import {LogService} from '../../../../shared/log.service';

@Component({
  selector: 'app-licensee-pricing',
  templateUrl: './licensee-pricing.component.html',
  styleUrls: ['./licensee-pricing.component.scss']
})
export class LicenseePricingComponent implements OnInit {
  @Input() selectedProductId: string;
  @Input() selectedLocations: number;
  priceId: string;

  backgroundColor = '#e7e5e5';
  constructor(public constants: ConstantsService, private stripeService: StripeService, private log: LogService) { }

  ngOnInit() {
    this.stripeService.seats = this.selectedLocations;
    if (this.selectedProductId) {
      this.stripeService.productId = this.selectedProductId;
    }
  }

  onRemoveLocation() {
    if (this.selectedLocations > 1) {
      this.selectedLocations = this.selectedLocations - 1;
    }
  }

  onAddLocation() {
    this.selectedLocations = this.selectedLocations + 1;
  }

  onSelectProduct(productId, priceId) {
    this.selectedProductId = productId;
    this.priceId = priceId;
  }

}
