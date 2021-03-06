import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Licensee} from '../../../shared/licensee.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../shared/data-services/session.service';
import {ResellerService} from '../../../resellers/reseller.service';
import {ResellerDataService} from '../../../shared/data-services/reseller-data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LicenseeDataService} from '../../../shared/data-services/licensee-data.service';
import {FormTypes, RegexPatterns} from '../../../shared/data-services/constants.service';
import {LicenseeService} from '../../../shared/licensee.service';
import {LogService} from '../../../shared/log.service';

@Component({
  selector: 'app-licensee-item-detail',
  templateUrl: './licensee-item-detail.component.html',
  styleUrls: ['./licensee-item-detail.component.css']
})
export class LicenseeItemDetailComponent implements OnInit, OnDestroy {
  licensee: Licensee;
  licenseeItemDetailForm: FormGroup;
  index: number;
  subscription: Subscription;

  constructor(private licenseeService: LicenseeService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private log: LogService,
              private router: Router) {
  }

  ngOnInit() {
    this.log.logTrace('LicenseeItemDetailComponent onInit');
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.index);
          this.initForm();
          this.subscription = this.licenseeItemDetailForm.valueChanges.subscribe(
            (value) => {
              this.updateLicensee(value);
              this.sessionService.setSaveState(FormTypes.Licensees, this.licenseeItemDetailForm.valid, this.licenseeItemDetailForm.dirty);
            }
          );
        }
      );
  }

  private initForm() {
    const name = this.licensee.Name;
    const address1 = this.licensee.Address1;
    const address2 = this.licensee.Address2;
    const city = this.licensee.City;
    const state = this.licensee.State;
    const postalCode = this.licensee.PostalCode;
    const phone1 = this.licensee.Phone1;
    const phone2 = this.licensee.Phone2;
    const contactFirstName = this.licensee.ContactFirstName;
    const contactLastName = this.licensee.ContactLastName;
    const email = this.licensee.Email;
    const website = this.licensee.Website;
    const enabled = !this.licensee.Disabled;
    this.licenseeItemDetailForm = new FormGroup(
      {
        'Name': new FormControl(name, Validators.required),
        'Address1': new FormControl(address1, Validators.required),
        'Address2': new FormControl(address2),
        'City': new FormControl(city, Validators.required),
        'State': new FormControl(state, Validators.required),
        'PostalCode': new FormControl(postalCode, Validators.required),
        'Phone1': new FormControl(phone1, Validators.required),
        'Phone2': new FormControl(phone2),
        'ContactFirstName': new FormControl(contactFirstName, Validators.required),
        'ContactLastName': new FormControl(contactLastName, Validators.required),
        'Email': new FormControl(email, [Validators.required, Validators.email]),
        'Enabled': new FormControl(enabled),
        'Website': new FormControl(website),
      }
    );
  }

  isFieldInvalid(fieldName: string) {
    return this.licenseeItemDetailForm.controls[fieldName].invalid;
  }

  updateLicensee(updatedLicensee: Licensee) {
    this.licensee.Name = updatedLicensee.Name;
    this.licensee.Address1 = updatedLicensee.Address1;
    this.licensee.Address2 = updatedLicensee.Address2;
    this.licensee.City = updatedLicensee.City;
    this.licensee.State = updatedLicensee.State;
    this.licensee.PostalCode = updatedLicensee.PostalCode;
    this.licensee.Phone1 = updatedLicensee.Phone1;
    this.licensee.Phone2 = updatedLicensee.Phone2;
    this.licensee.ContactFirstName = updatedLicensee.ContactFirstName;
    this.licensee.ContactLastName = updatedLicensee.ContactLastName;
    this.licensee.Email = updatedLicensee.Email;
    this.licensee.Website = updatedLicensee.Website;
    if (updatedLicensee['Enabled']) {
      this.licensee.Disabled = false;
    } else {
      this.licensee.Disabled = true;
    }
    this.licensee.UpdatedUtc = new Date().toDateString();
    this.sessionService.setLicensee(this.licensee);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
