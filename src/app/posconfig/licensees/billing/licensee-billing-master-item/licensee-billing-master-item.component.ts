import {Component, OnInit} from '@angular/core';
import {StripeService} from '../../../../shared/data-services/stripe.service';
import {ActivatedRoute, Params} from '@angular/router';
import {LicenseeService} from '../../../../shared/licensee.service';
import {SessionService} from '../../../../shared/data-services/session.service';
import {LogService} from '../../../../shared/log.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CancelSubscriptionModalComponent} from '../cancel-subscription-modal/cancel-subscription-modal.component';
import {SubscriptionCancelledModalComponent} from '../subscription-cancelled-modal/subscription-cancelled-modal.component';
import {UpdateSubscriptionModalComponent} from '../update-subscription-modal/update-subscription-modal.component';
import {SubscriptionUpdatedModalComponent} from '../subscription-updated-modal/subscription-updated-modal.component';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {VenueService} from '../../../../venues/venue.service';

@Component({
  selector: 'app-licensee-billing-master-item',
  templateUrl: './licensee-billing-master-item.component.html',
  styleUrls: ['./licensee-billing-master-item.component.css']
})
export class LicenseeBillingMasterItemComponent implements OnInit {
  selectedLocations = 0;
  index: number;
  myModals = {
    cancelConfirm: CancelSubscriptionModalComponent,
    cancelled: SubscriptionCancelledModalComponent,
    updateConfirm: UpdateSubscriptionModalComponent,
    updated: SubscriptionUpdatedModalComponent
  };


  constructor(public stripeService: StripeService,
              private licenseeService: LicenseeService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private modal: NgbModal,
              public venueService: VenueService,
              private log: LogService) {
  }

  ngOnInit() {
    this.log.logTrace('LicenseeBillingMasterItemComponent onInit');
    this.stripeService.canUpdate = false;
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.stripeService.licensee = this.licenseeService.getLicensee(this.index);
          this.selectedLocations = this.licenseeService.getBillableCount(this.stripeService.licensee.LicId);
          this.stripeService.stripeProducts = this.stripeService.getStripeProducts();
          if (this.stripeService.licensee.StripeBilling.StripeProductId) {
            this.stripeService.selectedProduct =
              this.stripeService.stripeProducts.find(x => x.StripeProductId ===
                this.stripeService.licensee.StripeBilling.StripeProductId);
          }
        }
      );
  }

  onCancel() {
    this.modal.open(this.myModals.cancelConfirm).result.then((result) => {
      if (result === 'Ok') {
        this.log.logTrace('Cancel Subscription requested');
        this.stripeService.cancelSubscription()
          .then((cancelResult) => {
            this.log.logTrace('Cancel Subscription result:' + cancelResult);
            this.modal.open(this.myModals.cancelled).result.then(() => {
            }, (reason) => {
            });
          });
      }
    }, (reason) => {
    });
  }

  onUpdate() {
    this.modal.open(this.myModals.updateConfirm).result.then((result) => {
      if (result === 'Ok') {
        this.log.logTrace('Update Subscription requested');
        this.stripeService.updateSubscription()
          .then((updateResult) => {
            this.log.logTrace('Update Subscription result:' + updateResult);
            this.modal.open(this.myModals.updated).result.then(() => {
            }, (reason) => {
            });
          });
      }
    }, (reason) => {
    });
  }

  getVenueCount() {

  }

}

