import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-license-agreement-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Terms of Use</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>` + `
    <div class="modal-body"><p [innerHTML]="licenseText"></p>
    </div>` + `
    <div class="modal-footer">` + `
      <button type="button" class="btn btn-secondary" (click)="modal.close('Cancel')">Cancel</button>
      <button type="button" class="btn btn-info" (click)="modal.close('Ok')">I Agree</button>
    </div>
  `,
  styleUrls: ['./license-agreement-modal.component.scss']
})
export class LicenseAgreementModalComponent implements OnInit {

  licenseText = '';

  constructor(public modal: NgbActiveModal, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('../../../../../assets/licenseAgreement.html', {responseType: 'text'})
      .subscribe(data => this.licenseText = data);
  }

}
