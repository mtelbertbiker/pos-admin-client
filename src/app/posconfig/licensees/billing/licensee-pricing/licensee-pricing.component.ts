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
  @Input() selectedLocations: number;
  selectedProductId: string;


  backgroundColor = '#e7e5e5';

  constructor(public constants: ConstantsService,
              public stripeService: StripeService,
              private log: LogService) {
  }

  ngOnInit() {
    this.stripeService.seats = this.selectedLocations;
    if (this.stripeService.selectedProduct) {
      this.selectedProductId = this.stripeService.selectedProduct.StripeProductId;
    }
    this.updateSeats();
    this.updatePrice();
  }

  onRemoveLocation() {
    if (this.selectedLocations > 1) {
      this.selectedLocations = this.selectedLocations - 1;
      this.stripeService.canUpdate = true;
    }
    this.updateSeats();
    this.updatePrice();
  }

  onAddLocation() {
    this.selectedLocations = this.selectedLocations + 1;
    this.stripeService.canUpdate = true;
    this.updateSeats();
    this.updatePrice();
  }

  onSelectProduct(productId) {
    this.selectedProductId = productId;
    this.stripeService.selectedProduct = this.stripeService.stripeProducts.find(p => p.StripeProductId === productId);
    this.stripeService.canUpdate = true;
    this.updateSeats();
    this.updatePrice();
  }

  updatePrice() {
    if (this.stripeService.selectedProduct) {
      this.stripeService.totalPrice = this.stripeService.seats * this.stripeService.selectedProduct.Price;
    }
  }

  updateSeats() {
    this.stripeService.seats = this.selectedLocations;
  }

}
