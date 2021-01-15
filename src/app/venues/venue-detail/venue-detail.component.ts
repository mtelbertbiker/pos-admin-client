import {Component, OnDestroy, OnInit} from '@angular/core';
import {VenueService} from '../venue.service';
import {Venue} from '../../shared/pos-models/venue.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {VenueDataService} from '../../shared/data-services/venue-data.service';
import {SessionService} from '../../shared/data-services/session.service';
import {FormTypes} from '../../shared/data-services/constants.service';
import {ConfirmDeletionModalComponent} from '../../shared/confirm-deletion-modal/confirm-deletion-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CopyVenueModalComponent} from './copy-venue-modal/copy-venue-modal.component';
import {LogService} from '../../shared/log.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit, OnDestroy {
  venue: Venue;
  venueDetailForm: FormGroup;
  id: number;
  subscription: Subscription;
  posType: any;
  eodTime: any;
  myModals = {
    deleteConfirm: ConfirmDeletionModalComponent,
    copyVenue: CopyVenueModalComponent
  };

  public posTypes = [
    {value: 0, name: 'None'},
    {value: 1, name: 'Aloha Table Service'},
    {value: 2, name: 'Aloha Quick Service'},
    {value: 3, name: 'Micros 3700'},
  ];

  public eodTimes = [
    {value: 0, name: 'Midnight'},
    {value: 60, name: '1am'},
    {value: 120, name: '2am'},
    {value: 180, name: '3am'},
    {value: 240, name: '4am'},
    {value: 300, name: '5am'},
    {value: 360, name: '6am'}
  ];

  constructor(private venueService: VenueService,
              private venueDataService: VenueDataService,
              private route: ActivatedRoute,
              private router: Router,
              private modal: NgbModal,
              private log: LogService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.log.logTrace('VenueDetailComponent onInit');
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
          if (!this.venue.HasVenueDetail) {
            this.venueDataService.getVenueDetail(this.id);
            this.venue = this.venueService.getVenue(this.id);
          }
          this.sessionService.setCurrentVenueIndex(this.id);
          this.venue = this.venueService.getVenue(this.id);
          this.initForm();
          this.subscription = this.venueDetailForm.valueChanges.subscribe(
            (value) => {
              this.venueService.updateVenue(this.id, value);
              this.sessionService.setSaveState(FormTypes.Locations, this.venueDetailForm.valid, this.venueDetailForm.dirty);
            }
          );
        }
      );
  }

  private initForm() {
    if (this.venue.POSTypeId != null) {
      this.posType = this.posTypes[this.venue.POSTypeId];
    } else {
      this.posType = this.posTypes[0];
    }
    this.posType = this.posTypes[0];
    if (this.venue.EODTime) {
      const i = this.eodTimes.findIndex((x => x.value === this.venue.EODTime));
      this.eodTime =  this.eodTimes[i];
    } else {
      this.eodTime = this.eodTimes[0];
    }
    const venueName = this.venue.Name;
    const address1 = this.venue.Address1;
    const address2 = this.venue.Address2;
    const city = this.venue.City;
    const state = this.venue.State;
    const postalCode = this.venue.PostalCode;
    const phone1 = this.venue.Phone1;
    const phone2 = this.venue.Phone2;
    const memo = this.venue.Memo;
    const enabled = !this.venue.Disabled;
    const postypeid = this.venue.POSTypeId;
    const eodTime = this.venue.EODTime;
    const lightsenabled = this.venue.LightControlEnabled;
    const website = this.venue.Website;
    this.venueDetailForm = new FormGroup(
      {
        'Name': new FormControl(venueName, Validators.required),
        'Address1': new FormControl(address1, Validators.required),
        'Address2': new FormControl(address2),
        'City': new FormControl(city, Validators.required),
        'State': new FormControl(state, Validators.required),
        'PostalCode': new FormControl(postalCode, Validators.required),
        'Phone1': new FormControl(phone1, Validators.required),
        'Phone2': new FormControl(phone2),
        'Memo': new FormControl(memo),
        'Enabled': new FormControl(enabled),
        'POSTypeId': new FormControl(postypeid),
        'EODTime': new FormControl(eodTime),
        'LightControlEnabled': new FormControl(lightsenabled),
        'Website': new FormControl(website),
      }
    );
  }

  isFieldInvalid(fieldName: string) {
    return this.venueDetailForm.controls[fieldName].invalid;
  }

  onCopy() {
    let ok = false;
    const copyModal = this.modal.open(this.myModals.copyVenue).result.then((result) => {
        if (result === 'Ok') {
          ok = true;
        }
      },
      (reason) => {
        if ((reason !== 'cancel') && (reason !== 'Cross click')) {
          ok = false;
          alert('Copy Location Failed / Cancelled: ' + reason);
        }
      });
    if (ok) {
      alert('Copy completed.  Be sure to Save your changes!');
    }
  }

  onDeleteLocation(index: number) {
    this.venue = this.venueService.getVenue(index);
    this.sessionService.DeletedItemName = 'Location ' + this.venue.Name;
    this.modal.open(this.myModals.deleteConfirm).result.then((result) => {
      if (result === 'Ok') {
        this.venueDataService.deleteVenue(this.venue.LicId, this.venue.BId, this.venue.LId)
          .subscribe(
            val => {
              this.venueService.removeVenue(index);
              this.router.navigate(['licensee/' + 0 + '/detail']);
              alert('Location Deleted');
            },
            response => {
              this.log.logError('onDeleteLocation', response);
              alert('Delete Request failed: ' + response.message);
            }
          );
      }
    }, (reason) => {
    });
  }

  edited() {
    return this.venueService.venuesChanged;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
