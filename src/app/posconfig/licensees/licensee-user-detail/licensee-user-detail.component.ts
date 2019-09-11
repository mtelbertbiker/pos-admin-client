import {Component, OnInit} from '@angular/core';
import {LicenseeUser} from '../../../shared/licensee-user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormTypes} from '../../../shared/data-services/constants.service';
import {SessionService} from '../../../shared/data-services/session.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {LicenseeService} from '../../../shared/licensee.service';
import {Licensee} from '../../../shared/licensee.model';
import {ResellerService} from '../../../resellers/reseller.service';

@Component({
  selector: 'app-licensee-user-detail',
  templateUrl: './licensee-user-detail.component.html',
  styleUrls: ['./licensee-user-detail.component.css']
})
export class LicenseeUserDetailComponent implements OnInit {
  licensee: Licensee;
  licenseeUser: LicenseeUser;
  licenseeUserDetailForm: FormGroup;
  subscription: Subscription;
  ui: number;

  constructor(private licenseeService: LicenseeService,
              private resellerService: ResellerService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.licensee = this.sessionService.licensee;
          this.ui = +params['uid'];
          this.licenseeUser = this.licensee.LicenseeUsers[this.ui];
          this.initForm();
          this.subscription = this.licenseeUserDetailForm.valueChanges.subscribe(
            (value) => {
              this.updateLicenseeUser(value);
              this.sessionService.setSaveState(FormTypes.Users, this.licenseeUserDetailForm.valid, this.licenseeUserDetailForm.dirty);
            }
          );
        }
      );
  }

  private initForm() {
    const FirstName = this.licenseeUser.FirstName;
    const LastName = this.licenseeUser.LastName;
    const Email = this.licenseeUser.Email;
    const Administrator = this.licenseeUser.Administrator;
    const AppUser = this.licenseeUser.AppUser;
    const Phone = this.licenseeUser.Phone;
    const Disabled = this.licenseeUser.Disabled;
    this.licenseeUserDetailForm = new FormGroup(
      {
        'FirstName': new FormControl(FirstName, Validators.required),
        'LastName': new FormControl(LastName, Validators.required),
        'Email': new FormControl(Email, [Validators.required, Validators.email]),
        'Administrator': new FormControl(Administrator),
        'AppUser': new FormControl(AppUser),
        'Phone': new FormControl(Phone),
        'Disabled': new FormControl(Disabled),
      });
  }

  isFieldInvalid(fieldName: string) {
    return this.licenseeUserDetailForm.controls[fieldName].invalid;
  }

  updateLicenseeUser(updatedLicenseeUser: LicenseeUser) {
    this.licenseeUser.FirstName = updatedLicenseeUser.FirstName;
    this.licenseeUser.LastName = updatedLicenseeUser.LastName;
    this.licenseeUser.Email = updatedLicenseeUser.Email;
    this.licenseeUser.Administrator = updatedLicenseeUser.Administrator;
    this.licenseeUser.AppUser = updatedLicenseeUser.AppUser;
    this.licenseeUser.Disabled = updatedLicenseeUser.Disabled;
  }

  onDeleteUser(index: number) {
    if (confirm('Delete this User?') === true) {
      this.licensee.LicenseeUsers.splice(index, 1);
      this.router.navigate(['..'], {relativeTo: this.route});
    }
    ;
  }

}
