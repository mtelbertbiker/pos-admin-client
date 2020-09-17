import {Component, OnDestroy, OnInit} from '@angular/core';
import {StripeService} from '../../../../shared/data-services/stripe.service';
import {LogService} from '../../../../shared/log.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LicenseAgreementModalComponent} from '../license-agreement-modal/license-agreement-modal.component';

@Component({
  selector: 'app-licensee-payment',
  templateUrl: './licensee-payment.component.html',
  styleUrls: ['../stripeglobal.css', '../normalize.css']
})
export class LicenseePaymentComponent implements OnInit, OnDestroy {
  myModals = {
    licenseeAgreementConfirm: LicenseAgreementModalComponent
  };

  canSubscribe = false;

  constructor(public stripeService: StripeService, private log: LogService, private modal: NgbModal) {
  }

  ngOnInit() {
    console.log('LicenseePaymentComponent onInit');
    this.stripeService.createCustomer()
      .then(result => {
        console.log('Retrieved Stripe Customer detail For Licensee:' + result.customer.LicId);
        this.stripeService.stripeCustomerId = result.customer.StripeBilling.StripeCustomerId;
        this.stripeService.stripeSubscriptionId = result.customer.StripeBilling.StripeSubscriptionId;
        if (!this.stripeService.stripeSubscriptionId) {
          this.setupCardElement();
        }
      });
  }

  ngOnDestroy(): void {
    console.log('LicenseePaymentComponent - OnDestroy');
    if (this.stripeService.card) {
      this.stripeService.card.destroy('card');
    }
  }

  setupCardElement() {
    console.log('setupCardElement');
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
        const submitpremium = document.getElementById('submit-premium');
        submitpremium.hidden = true;
        const displayError = document.getElementById('card-element-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
          if (event.complete) {
            console.log('card is complete');
            submitpremium.hidden = false;
          }
        }
      });
    }
  }

  onPaymentSubscribe() {
    console.log('onPaymentSubscribe');
    this.modal.open(this.myModals.licenseeAgreementConfirm, {
      size: 'lg'
    }).result.then((result) => {
      if (result === 'Ok') {
        this.log.logTrace('License Agreement Confirmed');
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
      } else {
        console.log('License Agreement not accepted');
      }
    }, (reason) => {
    });
  }
}
