import { Injectable } from '@angular/core';
import {loadStripe} from '@stripe/stripe-js';
import {LogService} from '../log.service';
import {ConstantsService} from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  stripePromise: any = null;
  stripe: any = null;
  elements: any;
  card: any;

  seats: number;
  productId: string;
  priceId: string;

  constructor(private log: LogService, public constants: ConstantsService) {
    this.getConfig();
  }

  getConfig() {
    this.log.logTrace('Stripe Service - getConfig');
   // return fetch('https://localhost:44318/api/Billing/Config', {
    return fetch(this.constants.BillingUri + '/config', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.stripePromise = loadStripe(response.publishableKey)
          .then(res => {
            this.stripe = res;
            this.elements = this.stripe.elements();
            this.stripeElements();
            this.log.logTrace('Stripe Elements Configured');
          });
        // Set up Stripe Elements
        // this.stripe = Stripe(response.publishableKey);
        // this.stripeElements();
      });
  }

  stripeElements() {

    /*
    if (document.getElementById('card-element')) {
      const elements = this.stripe.elements();

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

      const card = elements.create('card', {style: style});

      card.mount('#card-element');

      card.on('focus', function () {
        const el = document.getElementById('card-element-errors');
        el.classList.add('focused');
      });

      card.on('blur', function () {
        const el = document.getElementById('card-element-errors');
        el.classList.remove('focused');
      });

      card.on('change', function (event) {
        this.displayError(event);
      });*/

      const signupForm = document.getElementById('signup-form');
      if (signupForm) {
        signupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.changeLoadingState(true);
          // Create customer
          this.createCustomer().then((result) => {
            const customer = result.customer;
            window.location.href = '/prices.html?customerId=' + customer.id;
          });
        });
      }

      const paymentForm = document.getElementById('payment-form');
      if (paymentForm) {
        paymentForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.changeLoadingStateprices(true);

          // If a previous payment was attempted, get the lastest invoice
          const latestInvoicePaymentIntentStatus = localStorage.getItem(
            'latestInvoicePaymentIntentStatus'
          );

          let invoiceId = undefined;
          let isPaymentRetry = false;
          if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
            invoiceId = localStorage.getItem('latestInvoiceId');
            isPaymentRetry = true;
            // create new payment method & retry payment on invoice with new payment method
            this.createPaymentMethod({
              card: this.card,
              isPaymentRetry,
              invoiceId,
            });
          } else {
            // create new payment method & create subscription
            this.createPaymentMethod({card: this.card, isPaymentRetry, invoiceId});
          }
        });
      }
    }

  createCustomer() {
    const billingEmail = document.querySelector('#email').nodeValue;

    return fetch('/create-customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: billingEmail,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      });
  }

  createPaymentMethod({card, isPaymentRetry, invoiceId}) {
    const params = new URLSearchParams(document.location.search.substring(1));
    const customerId = params.get('customerId');
    // Set up payment method for recurring usage
    const billingName = document.querySelector('#name').nodeValue;

    const priceId = document.getElementById('priceId').innerHTML.toUpperCase();

    this.stripe
      .createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
          name: billingName,
        },
      })
      .then((result) => {
        if (result.error) {
          this.displayError(result.error);
        } else {
          if (isPaymentRetry) {
            // Update the payment method and retry invoice payment
            this.retryInvoiceWithNewPaymentMethod(
              customerId,
              result.paymentMethod.id,
              invoiceId,
              priceId
            );
          } else {
            // Create the subscription
            this.createSubscription(customerId, result.paymentMethod.id, priceId);
          }
        }
      });
  }

  createSubscription(customerId, paymentMethodId, priceId) {
    return (
      fetch('/create-subscription', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned
        // by Stripe. Add the addional details we need.
        .then((result) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            subscription: result,
            paymentMethodId: paymentMethodId,
            priceId: priceId,
          };
        })
        // Some payment methods require a customer to do additional
        // authentication with their financial institution.
        // Eg: 2FA for cards.
        .then(this.handleCardSetupRequired)
        .then(this.handlePaymentThatRequiresCustomerAction)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail. You will
        // get a requires_payment_method error.
        .then(this.handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then(this.onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          this.displayError(error);
        })
    );
  }

  handleCardSetupRequired({
                            subscription,
                            invoice,
                            priceId,
                            paymentMethodId
                          }) {
    const setupIntent = subscription.pending_setup_intent;

    if (setupIntent && setupIntent.status === 'requires_action') {
      return this.stripe
        .confirmCardSetup(setupIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            throw result;
          } else {
            if (result.setupIntent.status === 'succeeded') {
              // There's a risk of the customer closing the window before callback
              // execution. To handle this case, set up a webhook endpoint and
              // listen to setup_intent.succeeded.
              return {
                priceId: priceId,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        });
    } else {
      // No customer action needed
      return {subscription, priceId, paymentMethodId};
    }
  }

  handlePaymentThatRequiresCustomerAction({
                                            subscription,
                                            invoice,
                                            priceId,
                                            paymentMethodId,
                                            isRetry,
                                          }) {
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    const paymentIntent = invoice
      ? invoice.payment_intent
      : subscription.latest_invoice.payment_intent;

    if (!paymentIntent) {
      return {subscription, priceId, paymentMethodId};
    }

    if (
      paymentIntent.status === 'requires_action' ||
      (isRetry === true && paymentIntent.status === 'requires_payment_method')
    ) {
      return this.stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            throw result;
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              // There's a risk of the customer closing the window before callback
              // execution. To handle this case, set up a webhook endpoint and
              // listen to invoice.paid. This webhook endpoint returns an Invoice.
              return {
                priceId: priceId,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        });
    } else {
      // No customer action needed
      return {subscription, priceId, paymentMethodId};
    }
  }

  handleRequiresPaymentMethod({
                                subscription,
                                paymentMethodId,
                                priceId,
                              }) {
    if (subscription.status === 'active') {
      // subscription is active, no customer actions required.
      return {subscription, priceId, paymentMethodId};
    } else if (
      subscription.latest_invoice.payment_intent.status ===
      'requires_payment_method'
    ) {
      // Using localStorage to store the state of the retry here
      // (feel free to replace with what you prefer)
      // Store the latest invoice ID and status
      localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
      localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        subscription.latest_invoice.payment_intent.status
      );
      throw {error: {message: 'Your card was declined.'}};
    } else {
      return {subscription, priceId, paymentMethodId};
    }
  }

  onSubscriptionComplete(result) {
    console.log(result);
    // Payment was successful. Provision access to your service.
    // Remove invoice from localstorage because payment is now complete.
    this.clearCache();
    // Change your UI to show a success message to your customer.
    this.onSubscriptionComplete(result);
    // Call your backend to grant access to your service based on
    // the product your customer subscribed to.
    // Get the product by using result.subscription.price.product
  }


  retryInvoiceWithNewPaymentMethod(
    customerId,
    paymentMethodId,
    invoiceId,
    priceId
  ) {
    return (
      fetch('/retry-invoice', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned
        // by Stripe. Add the addional details we need.
        .then((result) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            invoice: result,
            paymentMethodId: paymentMethodId,
            priceId: priceId,
            isRetry: true,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(this.handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then(this.onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          this.displayError(error);
        })
    );
  }

  displayError(event) {
    console.log('displayError');
    this.changeLoadingStateprices(false);
    const displayError = document.getElementById('card-element-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  }

  // Show a spinner on subscription submission
  changeLoadingState(isLoading) {
    console.log('changeLoadingStateprices');
    if (isLoading) {
      document.querySelector('#button-text').classList.add('hidden');
      document.querySelector('#loading').classList.remove('hidden');
      // document.querySelector('#signup-form button').disabled = true;
    } else {
      document.querySelector('#button-text').classList.remove('hidden');
      document.querySelector('#loading').classList.add('hidden');
      // document.querySelector('#signup-form button').disabled = false;
    }
  }


  // Show a spinner on subscription submission
  changeLoadingStateprices(isLoading) {
    console.log('changeLoadingStateprices');
    if (isLoading) {
      document.querySelector('#button-text').classList.add('hidden');
      document.querySelector('#loading').classList.remove('hidden');

      document.querySelector('#submit-basic').classList.add('invisible');
      document.querySelector('#submit-premium').classList.add('invisible');
      if (document.getElementById('confirm-price-change-cancel')) {
        document
          .getElementById('confirm-price-change-cancel')
          .classList.add('invisible');
      }
    } else {
      document.querySelector('#button-text').classList.remove('hidden');
      document.querySelector('#loading').classList.add('hidden');

      document.querySelector('#submit-basic').classList.remove('invisible');
      document.querySelector('#submit-premium').classList.remove('invisible');
      if (document.getElementById('confirm-price-change-cancel')) {
        document
          .getElementById('confirm-price-change-cancel')
          .classList.remove('invisible');
        document
          .getElementById('confirm-price-change-submit')
          .classList.remove('invisible');
      }
    }
  }

  clearCache() {
    localStorage.clear();
  }
}
