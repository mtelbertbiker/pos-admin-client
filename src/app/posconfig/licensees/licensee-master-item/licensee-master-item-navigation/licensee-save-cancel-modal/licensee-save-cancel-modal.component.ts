import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../../../shared/data-services/session.service';
import {LogService} from '../../../../../shared/log.service';

@Component({
  selector: 'app-licensee-save-cancel-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Cancel Changes?</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body">
      <p><strong>You have made changes to the following: <span class="text-primary">{{changedItems}}</span>.  Cancel these changes?</strong></p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Don't Cancel</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok')">Yes, Cancel</button>
    </div>
  `
})
export class LicenseeSaveCancelModalComponent implements OnInit {
  changedItems: string[];

  constructor(public modal: NgbActiveModal, private sessionService: SessionService, private log: LogService) { }

  ngOnInit() {
    this.log.logTrace('LicenseeSaveCancelModalComponent onInit');
    this.changedItems = this.sessionService.ChangedItems;
  }

}
