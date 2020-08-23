import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscription-updated-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Subscription Updated!</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body">
      <p>Your subscription has been updated. </p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok')">OK</button>
    </div>
  `,
  styleUrls: ['./subscription-updated-modal.component.scss']
})
export class SubscriptionUpdatedModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
