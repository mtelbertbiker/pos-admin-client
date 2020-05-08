import {Component, OnDestroy, OnInit} from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FeeGroup} from '../../../shared/pos-models/fee-group.model';
import {Subscription} from 'rxjs';
import {FeecalcDataService} from '../../../shared/data-services/feecalc-data.service';
import {TimedFeeCalcWebRequest} from '../../../shared/feecalc-models/timedfeecalcwebrequest.model';
import {SessionService} from '../../../shared/data-services/session.service';
import {TimedFeeCalcResponse} from '../../../shared/feecalc-models/timedfeecalcresponse.model';

@Component({
  selector: 'app-feetester',
  templateUrl: './feetester.component.html',
  styleUrls: ['./feetester.component.css']
})

export class FeeTesterComponent implements OnInit, OnDestroy {
  venue: Venue;
  id: number;
  feeGroup: FeeGroup;
  feeTesterForm: FormGroup;
  subscription: Subscription;
  timedFeeCalcResponse: TimedFeeCalcResponse;

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
              private feeCalcService: FeecalcDataService,
              private route: ActivatedRoute,
              private session: SessionService) { }

  ngOnInit() {
    this.timedFeeCalcResponse = { Ok: false, TotalFee: 0, TotalTime: 0, LogMessages: [], FeeList: [], MsgLevel: 0 };
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
          if (this.venue.FeeGroups.length > 0) {
            this.feeGroup = this.venue.FeeGroups[0];
            this.session.FeeCalcTest.fgid = this.feeGroup.FGId;
          }
          this.initForm();
          this.subscription = this.feeTesterForm.valueChanges.subscribe(
            (value) => this.updateFeeCalc(this.feeTesterForm.value)
          );
        }
      );
  }

  private initForm() {
    const feeGroup = this.feeGroup.FGId;
    const dayOfWeek = this.session.FeeCalcTest.dayOfWeek;
    const users = this.session.FeeCalcTest.users;
    const beginTime = {hour: this.session.FeeCalcTest.beginHour, minute: this.session.FeeCalcTest.beginMinute};
    const endTime = {hour: this.session.FeeCalcTest.endHour, minute: this.session.FeeCalcTest.endMinute};
    this.feeTesterForm = new FormGroup(
      {
        'FeeGroup': new FormControl(feeGroup, Validators.required),
        'DayOfWeek': new FormControl(dayOfWeek, Validators.required),
        'Users': new FormControl(users, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
        'BeginTime': new FormControl(beginTime, Validators.required),
        'EndTime': new FormControl(endTime, Validators.required),
      }
    );
  }

  updateFeeCalc(feeCalcForm) {
    this.session.FeeCalcTest.fgid = feeCalcForm.FeeGroup;
    this.session.FeeCalcTest.users = feeCalcForm.Users;
    this.session.FeeCalcTest.dayOfWeek = feeCalcForm.DayOfWeek;
    this.session.FeeCalcTest.beginHour = feeCalcForm.BeginTime.hour;
    this.session.FeeCalcTest.beginMinute = feeCalcForm.BeginTime.minute;
    this.session.FeeCalcTest.endHour = feeCalcForm.EndTime.hour;
    this.session.FeeCalcTest.endMinute = feeCalcForm.EndTime.minute;
    this.feeGroup =  this.venue.FeeGroups.find( x => x.FGId === +feeCalcForm.FeeGroup);
  }

  private getNextWeekDay(d) {
    if (d) {
      const next = new Date();
      next.setDate(next.getDate() - next.getDay() + 7 + d);
      return next;
    }
  }

  pad(n) {
    return (n < 10) ? ('0' + n) : n;
  }

  apiDateTimeString(thisDate) {
    return thisDate.getFullYear() + '-' +
      (this.pad(thisDate.getMonth() + 1)) + '-' +
      this.pad(thisDate.getDate()) + 'T' +
      this.pad(thisDate.getHours()) + ':' + this.pad(thisDate.getMinutes()) + ':00';
  }

  onTestFeeCalc() {
    const startDate = this.getNextWeekDay(this.session.FeeCalcTest.dayOfWeek);
    const startDateTime = startDate.setHours(this.session.FeeCalcTest.beginHour, this.session.FeeCalcTest.beginMinute, 0, 0);
    let stopDate;
    let stopDateTime;
    if (this.feeGroup.Prepaid) {
      stopDateTime = startDateTime + 60000;
    } else {
      if (this.session.FeeCalcTest.endHour < this.session.FeeCalcTest.beginHour) {  // rental ends on next calendar day
        if (this.session.FeeCalcTest.dayOfWeek === 6) {
          stopDate = startDate;
          stopDate.setHours(24);
          stopDateTime = stopDate.setHours(this.session.FeeCalcTest.endHour, this.session.FeeCalcTest.endMinute, 0, 0);
        } else {
        }
      } else {
        stopDateTime = startDate.setHours(this.session.FeeCalcTest.endHour, this.session.FeeCalcTest.endMinute, 0, 0);
      }
    }
    const timedFeeCalcRequest = new TimedFeeCalcWebRequest({
      LicenseeId : this.venue.LicId,
      BrandId : this.venue.BId,
      LocationId : this.venue.LId,
      FeeGroupId : this.session.FeeCalcTest.fgid,
      Users : this.session.FeeCalcTest.users,
      StartTime : this.apiDateTimeString(new Date(startDateTime)),
      StopTime : this.apiDateTimeString(new Date(stopDateTime))
    });
    this.feeCalcService.FeeCalc(timedFeeCalcRequest)
      .subscribe(
        val => {
          let feeCalcResponse: any;
          feeCalcResponse = val;
          this.timedFeeCalcResponse = feeCalcResponse;
        },
        response => {
          console.log(response);
          this.session.Error = response;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
