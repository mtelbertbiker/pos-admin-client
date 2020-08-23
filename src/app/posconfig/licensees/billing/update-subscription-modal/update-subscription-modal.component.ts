import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-subscription-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Update Subscription?</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body">
      <p>If your update your subscription, your billing amount may change.</p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Don't Update</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok')">Yes, Update</button>
    </div>
  `,
  styleUrls: ['./update-subscription-modal.component.scss']
})
export class UpdateSubscriptionModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
