import {Injectable} from '@angular/core';
import {loadStripe} from '@stripe/stripe-js';
import {LogService} from '../log.service';
import {ConstantsService} from './constants.service';
import {StripeProduct} from '../pos-models/stripe-product.model';
import {Licensee} from '../licensee.model';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {SessionService} from './session.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SubscriptionCreatedModalComponent} from '../../posconfig/licensees/billing/subscription-created-modal/subscription-created-modal.component';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  myModals = {
    created: SubscriptionCreatedModalComponent
  };

  stripePromise: any = null;
  stripe: any = null;
  elements: any;
  card: any;

  stripeCustomerId: string;
  stripeSubscriptionId: string;

  stripeProducts: StripeProduct[];
  selectedProduct: StripeProduct;
  licensee: Licensee;

  seats: number;
  currentPrice: number;
  totalPrice: number;
  cancelInProgress = false;
  updateInProgress = false;
  canUpdate = false;
  subscribeInProgress = false;

  constructor(private log: LogService,
              public constants: ConstantsService,
              private oidcSecurityService: OidcSecurityService,
              private modal: NgbModal,
              private session: SessionService) {
    this.getConfig();
  }

  getConfig() {
    this.log.logTrace('Stripe Service - getConfig');
    const token = this.oidcSecurityService.getToken();
    return fetch(this.constants.BillingUri + '/config', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ClientId': this.session.ClientId
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
    this.log.logTrace('stripeElements- begin');
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
            isPaymentRetry,
            invoiceId,
          });
        } else {
          // create new payment method & create subscription
          this.createPaymentMethod({isPaymentRetry, invoiceId});
        }
      });
    }
  }

  updateSubscription() {
    this.log.logTrace('Begin updateSubscription for LicId ' + this.licensee.LicId);
    this.updateInProgress = true;
    const token = this.oidcSecurityService.getToken();
    return fetch(this.constants.BillingUri + '/updatesubscription', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ClientId': this.session.ClientId
      },
      body: JSON.stringify({
        licId: this.licensee.LicId,
        subscriptionId: this.stripeSubscriptionId,
        newProductId: this.selectedProduct.StripeProductId,
        newPriceId: this.selectedProduct.StripePriceId,
        newQty: this.seats,
      }),
    })
      .then((response) => {
        this.updateInProgress = false;
        return response.json();
      })
      .then((response) => {
        this.updateInProgress = false;
        return response;
      });
  }

  createCustomer() {
    this.log.logTrace('Begin createCustomer for LicId ' + this.licensee.LicId);
    const token = this.oidcSecurityService.getToken();
    return fetch(this.constants.BillingUri + '/createcustomer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ClientId': this.session.ClientId
      },
      body: JSON.stringify({
        licId: this.licensee.LicId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      });
  }

  createPaymentMethod({isPaymentRetry, invoiceId}) {
    this.log.logTrace('Begin createPaymentMethod: ' + isPaymentRetry);
    this.changeLoadingState(true);
    const params = new URLSearchParams(document.location.search.substring(1));
    const customerId = this.stripeCustomerId;
    // Set up payment method for recurring usage
    const billingName = document.querySelector('#card-name').nodeValue;

    const priceId = this.selectedProduct.StripePriceId.toUpperCase();

    this.stripe
      .createPaymentMethod({
        type: 'card',
        card: this.card,
        billing_details: {
          name: billingName,
        },
      })
      .then((result) => {
        if (result.error) {
          this.displayError(result.error);
          this.changeLoadingState(false);
          return undefined;
        } else {
          if (isPaymentRetry) {
            // Update the payment method and retry invoice payment
            this.changeLoadingState(false);
            return this.retryInvoiceWithNewPaymentMethod(
              customerId,
              result.paymentMethod.id,
              invoiceId,
              priceId
            );
          } else {
            // Create the subscription
            this.createSubscription(customerId, result.paymentMethod.id, priceId)
              .then(resp => {
                this.log.logTrace('Subscription Created');
                this.changeLoadingState(false);
                return resp;
              });
          }
        }
      });
    return undefined;
  }

  createSubscription(customerId, paymentMethodId, priceId) {
    this.log.logTrace('begin createSubscription for LicId ' + this.licensee.LicId);
    this.subscribeInProgress = true;
    const token = this.oidcSecurityService.getToken();
    return fetch(this.constants.BillingUri + '/createsubscription', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ClientId': this.session.ClientId
      },
      body: JSON.stringify({
        licId: this.licensee.LicId,
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        priceId: priceId,
        qty: this.seats,
        productId: this.selectedProduct.StripeProductId
      }),
    })
      .then((response) => {
        return response.json();
      })
      // If the card is declined, display an error to the user.
      .then((result) => {
        if (result.Message) {
          // The card had an error when trying to attach it to a customer
          throw result;
        }
        return result;
      })
      // Normalize the result to contain the object returned
      // by Stripe. Add the addional details we need.
      .then((result) => {
        this.subscribeInProgress = false;
        console.log('createSubscription - returning here.');  // + JSON.stringify(result));
        return this.onSubscriptionComplete(result);
        // return {
        //   // Use the Stripe 'object' property on the
        //   // returned result to understand what object is returned.
        //   subscription: result,
        //   paymentMethodId: paymentMethodId,
        //   priceId: priceId,
        // };
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
      //     .then(this.onSubscriptionComplete)
      .then((finalResult) => {
        return this.onSubscriptionComplete(finalResult);
      })
      .catch((error) => {
        // An error has happened. Display the failure to the user here.
        // We utilize the HTML element we created.
        this.displayError(error);
        return error;
      });
  }

  handleCardSetupRequired({
                            subscription,
                            invoice,
                            priceId,
                            paymentMethodId
                          }) {
    this.log.logTrace('Begin handleCardSetupRequired for Subscription ' + subscription);
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
    this.log.logTrace('Begin handlePaymentThatRequiresCustomerAction for Subscription ' + subscription);
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
    this.log.logTrace('Begin handleRequiresPaymentMethod for Subscription ' + subscription);
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
    this.log.logTrace('Begin onSubscriptionComplete for Subscription ' + result.subscription.id);
    const id = result.subscription.id;
    this.stripeSubscriptionId = id;
    this.modal.open(this.myModals.created).result.then(() => {
    }, (reason) => {
    });
    // Payment was successful. Provision access to your service.
    // Remove invoice from localstorage because payment is now complete.
    this.clearCache();
    // Change your UI to show a success message to your customer.
    // this.onSubscriptionComplete(result);
    // Call your backend to grant access to your service based on
    // the product your customer subscribed to.
    // Get the product by using result.subscription.price.product
    return result;
  }


  retryInvoiceWithNewPaymentMethod(
    customerId,
    paymentMethodId,
    invoiceId,
    priceId
  ) {
    this.log.logTrace('Begin retryInvoiceWithNewPaymentMethod for Customer Id ' + customerId);
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
    this.log.logTrace('displayError:' + JSON.stringify(event));
    this.changeLoadingStateprices(false);
    const displayError = document.getElementById('card-element-errors');
    if (Object.keys(event).length === 0) {
      return;
    }
    if (event.Message) {
      displayError.textContent = event.Message;
    } else {
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    }
  }

// Show a spinner on subscription submission
  changeLoadingState(isLoading) {
    console.log('changeLoadingState');
    if (isLoading) {
      document.querySelector('#button-text').classList.add('hidden');
      document.querySelector('#loading').classList.remove('hidden');
      // document.querySelector('#signup-form button').disabled = true;
    } else {
      document.querySelector('#button-text').classList.remove('hidden');
      document.querySelector('#loading').classList.add('hidden');
      // document.querySelector('#signup-form button').disabled = false;
    }
    console.log('changeLoadingState - exiting');
  }


// Show a spinner on subscription submission
  changeLoadingStateprices(isLoading) {
    console.log('changeLoadingStateprices:' + isLoading);

    if (isLoading) {
      document.querySelector('#button-text').classList.add('hidden');
      document.querySelector('#loading').classList.remove('hidden');

      // document.querySelector('#submit-basic').classList.add('invisible');
      document.querySelector('#submit-premium').classList.add('invisible');
      if (document.getElementById('confirm-price-change-cancel')) {
        document
          .getElementById('confirm-price-change-cancel')
          .classList.add('invisible');
      }
    } else {
      document.querySelector('#button-text').classList.remove('hidden');
      document.querySelector('#loading').classList.add('hidden');

      // document.querySelector('#submit-basic').classList.remove('invisible');
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
    console.log('changeLoadingStateprices - exiting');
  }

  cancelSubscription() {
    this.log.logTrace('Begin cancelSubscription for Licensee id ' + this.licensee.LicId);
    this.cancelInProgress = true;
    const token = this.oidcSecurityService.getToken();
    // this.changeLoadingStateprices(true);
    // const params = new URLSearchParams(document.location.search.substring(1));
    return fetch(this.constants.BillingUri + '/cancelsubscription', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ClientId': this.session.ClientId
      },
      body: JSON.stringify({
        subscriptionId: this.stripeSubscriptionId,
        licId: this.licensee.LicId
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((cancelSubscriptionResponse) => {
        return this.subscriptionCancelled(cancelSubscriptionResponse);
      });
  }

  subscriptionCancelled(cancelSubscriptionResponse) {
    this.log.logTrace('Begin subscriptionCancelled for Licensee id ' + this.licensee.LicId);
    this.stripeSubscriptionId = undefined;
    console.log('subscriptionCancelled');
    this.cancelInProgress = false;
    return true;
    // document.querySelector('#subscription-cancelled').classList.remove('hidden');
    // document.querySelector('#subscription-settings').classList.add('hidden');
  }

  getStripeProducts(): StripeProduct[] {
    return this.licensee.StripeProducts;
  }

  clearCache() {
    localStorage.clear();
  }
}
