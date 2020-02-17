import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../data-services/session.service';

@Component({
  selector: 'app-confirm-deletion-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Confirm Delete?</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body">
      <p><strong>Are you sure you want to delete {{sessionService.DeletedItemName}}?</strong></p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok')">Delete</button>
    </div>
  `
})
export class ConfirmDeletionModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal, public sessionService: SessionService) { }

  ngOnInit() {
    console.log('Confirm Deletion Modal Component onInit');
  }

}
