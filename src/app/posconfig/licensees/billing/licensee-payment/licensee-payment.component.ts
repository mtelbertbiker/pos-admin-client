import {Component, OnInit} from '@angular/core';
import {StripeService} from '../../../../shared/data-services/stripe.service';
import {LogService} from '../../../../shared/log.service';

@Component({
  selector: 'app-licensee-payment',
  templateUrl: './licensee-payment.component.html',
  styleUrls: ['../stripeglobal.css', '../normalize.css']
})
export class LicenseePaymentComponent implements OnInit {

  constructor(private stripeService: StripeService, private log: LogService) {
  }

  ngOnInit() {
    console.log('LicenseePaymentComponent onInit');
    this.stripeService.createCustomer()
      .then(result => {
        console.log('Retrieved Stripe Customer detail For Licensee:' + result.customer.LicId);
        this.stripeService.stripeCustomerId = result.customer.StripeBilling.StripeCustomerId;
        this.setupCardElement();
      });
  }

  setupCardElement() {
    if (document.getElementById('card-element')) {

      // Card Element styles
      const style = {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#a0aec0',
          },
        },
      };

      this.stripeService.card = this.stripeService.elements.create('card', {style: style});

      this.stripeService.card.mount('#card-element');

      this.stripeService.card.on('focus', function () {
        const el = document.getElementById('card-element-errors');
        el.classList.add('focused');
      });

      this.stripeService.card.on('blur', function () {
        const el = document.getElementById('card-element-errors');
        el.classList.remove('focused');
      });

      this.stripeService.card.on('change', function (event) {
        console.log('on card change');
        const displayError = document.getElementById('card-element-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    }
  }

  onPaymentSubscribe() {
    console.log('onPaymentSubscribe');
    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      'latestInvoicePaymentIntentStatus'
    );
    if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
      const invoiceId = localStorage.getItem('latestInvoiceId');
      const isPaymentRetry = true;
      // create new payment method & retry payment on invoice with new payment method
      this.stripeService.createPaymentMethod({
        isPaymentRetry,
        invoiceId,
      });
    } else {
      // create new payment method & create subscription
      this.stripeService.createPaymentMethod({isPaymentRetry: false, invoiceId: undefined});
    }

  }
}
