import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ContactusRequestSentComponent} from './contactus-request-sent/contactus-request-sent.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modal: NgbModal) {
  }

  ngOnInit() {
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
        'Request': new FormControl(this.email)
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
    this.modal.open(this.myModals.sentConfirm).result.then((result) => {
      if (result === 'Ok') {
        this.contactForm.reset();
      }
    });
  }
}
