import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-subscription-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Cancel Subscription?</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body">
      <p>If you cancel your subscription, your location configurations will NOT be deleted.
  But the Fee Machine Tablet Application will be DISABLED at all locations.</p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Don't Cancel</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok')">Yes, Cancel</button>
    </div>
  `,
  styleUrls: ['./cancel-subscription-modal.component.scss']
})
export class CancelSubscriptionModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
