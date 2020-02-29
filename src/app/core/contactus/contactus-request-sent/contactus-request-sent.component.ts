import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contactus-request-sent-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Request Sent</h4>
    </div>
    <div class="modal-body">
      <p><strong>Thank you for reaching out!  We'll get back to you soon!</strong></p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-info" (click)="modal.close('Ok')">OK</button>
    </div>
  `
})
export class ContactusRequestSentComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    console.log('Contact Us Request Sent Modal Component onInit');
  }

}
