import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Licensee} from '../../../shared/licensee.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SessionService} from '../../../shared/data-services/session.service';
import {ResellerService} from '../../../resellers/reseller.service';
import {ResellerDataService} from '../../../shared/data-services/reseller-data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LicenseeDataService} from '../../../shared/data-services/licensee-data.service';

@Component({
  selector: 'app-licensee-item-detail',
  templateUrl: './licensee-item-detail.component.html'
})
export class LicenseeItemDetailComponent implements OnInit {
  @Input() licensee: Licensee;
  licenseeItemDetailForm: FormGroup;
  index: number;
  subscription: Subscription;

  constructor(private resellerService: ResellerService,
              private resellerDataService: ResellerDataService,
              private licenseeDataService: LicenseeDataService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index =  +params['id'];
          this.licensee = this.sessionService.getLicensee();
         // this.resellerDataService.getResellerLicenseeLocations(this.licensee.LicId);
          this.initForm();
          this.subscription = this.licenseeItemDetailForm.valueChanges.subscribe(
            (value) => this.updateLicensee(this.licenseeItemDetailForm.value)
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
        'Email': new FormControl(email, Validators.required),
        'Website': new FormControl(website),
      }
    );
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
    this.licensee.UpdatedUtc = new Date().toDateString();
    this.sessionService.setLicensee(this.licensee);
  }

  onSubmit() {
    this.licenseeDataService.putLicensee(this.licensee)
      .subscribe(
        (response: Response) => {
          console.log(response);
            let licensee: any;
            licensee = response;
            this.sessionService.setLicensee(licensee);
            alert('Licensee Saved');
            this.router.navigate(['home']);
          },
        response => {
          console.log(response);
          alert('Save Request failed: ' + response.message);
        }
      );
  }

  onCancel() {
    this.router.navigate(['home']);
  }

}
