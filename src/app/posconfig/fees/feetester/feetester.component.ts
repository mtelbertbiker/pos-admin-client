import { Component, OnInit } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FeeGroup} from '../../../shared/pos-models/fee-group.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-feetester',
  templateUrl: './feetester.component.html'
})

export class FeeTesterComponent implements OnInit {
  venue: Venue;
  id: number;
  feeGroup: FeeGroup;
  fgid = 0;
  feeTesterForm: FormGroup;
  dayOfWeek = 0;
  users = 0;
  beginHour = 0;
  beginMinute = 0;
  endHour = 23;
  endMinute = 59;
  subscription: Subscription;

  public dayList = [
    { value: 0, name: 'Sunday'},
    { value: 1, name: 'Monday'},
    { value: 2, name: 'Tuesday'},
    { value: 3, name: 'Wednesday'},
    { value: 4, name: 'Thursday'},
    { value: 5, name: 'Friday'},
    { value: 6, name: 'Saturday'}
  ];

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
          this.initForm();
          this.subscription = this.feeTesterForm.valueChanges.subscribe(
            (value) => this.updateFeeCalc(this.feeTesterForm.value)
          );
        }
      );
  }

  private initForm() {
    const feeGroup = this.feeGroup;
    const dayOfWeek = this.dayOfWeek;
    const users = this.users;
    const beginTime = {hour: this.beginHour, minute: this.beginMinute};
    const endTime = {hour: this.endHour, minute: this.endMinute};
    this.feeTesterForm = new FormGroup(
      {
        'FeeGroup': new FormControl(feeGroup, Validators.required),
        'DayOfWeek': new FormControl(dayOfWeek, Validators.required),
        'Users': new FormControl(users, Validators.required),
        'BeginTime': new FormControl(beginTime, Validators.required),
        'EndTime': new FormControl(endTime, Validators.required),
      }
    );
  }

  updateFeeCalc(feeCalcForm) {
    this.fgid = feeCalcForm.FeeGroup;
    this.users = feeCalcForm.Users;
    this.dayOfWeek = feeCalcForm.DayOfWeek;
    this.beginHour = feeCalcForm.BeginTime.hour;
    this.beginMinute = feeCalcForm.BeginTime.minute;
    this.endHour = feeCalcForm.EndTime.hour;
    this.endMinute = feeCalcForm.EndTime.minute;
  }

  onTestFeeCalc() {
  }
}
