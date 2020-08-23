import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscription-completed-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Subscription Created!</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body">
      <p>Thank you for purchasing Fee Machine! You will be billed monthly for the number of subscribed locations. </p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok')">OK</button>
    </div>
  `,
  styleUrls: ['./subscription-created-modal.component.scss']
})
export class SubscriptionCreatedModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
