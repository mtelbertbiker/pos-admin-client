import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ContactusRequestSentComponent} from './contactus-request-sent/contactus-request-sent.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConstantsService} from '../../shared/data-services/constants.service';
import {SessionService} from '../../shared/data-services/session.service';
import {LogService} from '../../shared/log.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  subscription: Subscription;
  firstName = '';
  lastName = '';
  companyName = '';
  email = '';
  phone = '';
  city = '';
  state = '';
  request = '';

  myModals = {
    sentConfirm: ContactusRequestSentComponent
  };

  constructor(private modal: NgbModal,
              private http: HttpClient,
              private sessionService: SessionService,
              private log: LogService,
              private consts: ConstantsService) {
  }

  ngOnInit() {
    this.log.logPageView('CONTACT');
    this.initForm();
    this.subscription = this.contactForm.valueChanges.subscribe(
      (value) => {
        this.updateContact(value);
      });
  }

  private initForm() {

    this.contactForm = new FormGroup(
      {
        'FirstName': new FormControl(this.firstName, Validators.required),
        'LastName': new FormControl(this.lastName, Validators.required),
        'CompanyName': new FormControl(this.companyName, Validators.required),
        'City': new FormControl(this.city, Validators.required),
        'State': new FormControl(this.state, Validators.required),
        'Phone': new FormControl(this.phone, Validators.required),
        'Email': new FormControl(this.email, [Validators.required, Validators.email]),
        'Request': new FormControl(this.request)
      }
    );
  }

  isFieldInvalid(fieldName: string) {
    return this.contactForm.controls[fieldName].invalid && this.contactForm.controls[fieldName].touched;
  }

  updateContact(contactForm) {
    this.firstName = contactForm.FirstName;
    this.lastName = contactForm.LastName;
    this.companyName = contactForm.CompanyName;
    this.city = contactForm.City;
    this.state = contactForm.State;
    this.email = contactForm.Email;
    this.phone = contactForm.Phone;
    this.request = contactForm.Request;
  }

  onSend() {
    const contactUs = {
      'FirstName' : this.firstName,
      'LastName': this.lastName,
      'CompanyName': this.companyName,
      'City': this.city,
      'State': this.state,
      'Phone': this.phone,
      'Email': this.email,
      'Request': this.request
    };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    this.log.logEvent('CONTACTUS', contactUs);
    this.http.post(this.consts.ContactUsLogicAppUri,
      contactUs,
      { headers: headers }).subscribe({
      next: data => {
        this.modal.open(this.myModals.sentConfirm).result.then((result) => {
          if (result === 'Ok') {
            this.contactForm.reset();
          }
        });
      },
      error: error => {
        this.log.logError('onSend', error);
        this.sessionService.Error = error;
      }
    });
  }
}
