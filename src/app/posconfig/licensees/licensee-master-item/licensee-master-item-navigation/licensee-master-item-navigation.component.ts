import {Component, OnDestroy, OnInit} from '@angular/core';
import {Venue} from '../../../../shared/pos-models/venue.model';
import {VenueService} from '../../../../venues/venue.service';
import {LicenseeService} from '../../../../shared/licensee.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Licensee} from '../../../../shared/licensee.model';
import {SessionService} from '../../../../shared/data-services/session.service';
import {LicenseeDataService} from '../../../../shared/data-services/licensee-data.service';
import {VenueDataService} from '../../../../shared/data-services/venue-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LicenseeSaveCancelModalComponent} from './licensee-save-cancel-modal/licensee-save-cancel-modal.component';
import {FormTypes} from '../../../../shared/data-services/constants.service';
import {Subscription} from 'rxjs';
import {LogService} from '../../../../shared/log.service';


@Component({
  selector: 'app-licensee-master-item-navigation',
  templateUrl: './licensee-master-item-navigation.component.html',
  styleUrls: ['./licensee-master-item-navigation.component.css']
})
export class LicenseeMasterItemNavigationComponent implements OnInit, OnDestroy {
  id: number;
  venues: Venue[];
  vid: number;
  licensee: Licensee;
  myModals = {
    cancelConfirm: LicenseeSaveCancelModalComponent
  };
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private licenseeService: LicenseeService,
              private licenseeDataService: LicenseeDataService,
              private venueDataService: VenueDataService,
              public sessionService: SessionService,
              private venueService: VenueService,
              private modal: NgbModal,
              private log: LogService,
              private router: Router) {
  }


  ngOnInit() {
    this.log.logTrace('LicenseeMasterItemNavigationComponent onInit');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
          this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
          this.subscription = this.venueService.venuesChanged
            .subscribe(
              (venues: Venue[]) => {
                this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
              }
            );
        }
      );
  }

  onSelectVenue(index: number) {
    this.log.logTrace('onSelectVenue:' + index);
    this.vid = index;
    this.sessionService.setCurrentVenueIndex(index);
    this.router.navigate(['licensee/' + this.id + '/locations/' + index + '/detail']);
  }


  onAddVenue() {
    this.log.logTrace('onAddVenue');
    const newVenue = new Venue(0, 0, 0, 'New Location',
      '', '', '', '', '', '', '', 0, 0, '', false, '', false, ''
      , true, [], [], [], [], [], [], 0, false, '');
    newVenue.LicId = this.sessionService.licensee.LicId;
    this.vid = this.venueService.addVenue(newVenue);
    this.sessionService.setSaveState(FormTypes.Locations, false, true);
    this.router.navigate(['licensee/' + this.id + '/locations/' + this.vid + '/detail']);
  }


  onSave() {
    this.log.logTrace('onSave');
    if ((this.sessionService.ChangedItems.indexOf(FormTypes.Licensees.toString()) > -1) ||
      (this.sessionService.ChangedItems.indexOf(FormTypes.Users.toString()) > -1)) {
      this.sessionService.HideSaveBtn = true;
      this.licensee = this.sessionService.getLicensee();
      this.sessionService.Saving.push(FormTypes.Licensees.toString());
      this.licenseeDataService.putLicensee(this.licensee)
        .subscribe(
          response => {
            let licensee: any;
            licensee = response;
            this.log.logTrace('onSave response', licensee);
            this.sessionService.setLicensee(licensee);
            this.sessionService.Saving.pop();
            const venue = this.venueService.getVenue(this.vid);
            if ((venue != null) && (venue.IsChanged)) {
              this.sessionService.Saving.push(FormTypes.Locations.toString());
              this.venueDataService.putVenue(venue)
                .subscribe(
                  resp => {
                    let loc: any;
                    loc = resp;
                    this.log.logTrace('On Save PutVenue-1 Response', resp);
                    this.venueService.putVenue(this.vid, loc);
                    this.sessionService.resetSaveState();
                  },
                  error => {
                    this.log.logError('On Save PutVenue-1', error);
                    this.sessionService.Error = error;
                  });
            } else {
              this.sessionService.resetSaveState();
            }
          }, error => {
            this.log.logError('On Save putLicensee', error);
            this.sessionService.Error = error;
          }
        );
    } else {
      this.sessionService.Saving.push(FormTypes.Locations.toString());
      this.sessionService.HideSaveBtn = true;
      this.venueDataService.putVenue(this.venueService.getVenue(this.sessionService.getCurrentVenueIndex()))
        .subscribe(
          resp => {
            let venue: any;
            venue = resp;
            this.log.logTrace('PutVenue-2 Response', resp);
            this.venueService.putVenue(this.vid, venue);
            this.sessionService.resetSaveState();
            this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
          },
          error => {
            this.log.logError('On Save PutVenue-2', error);
            this.sessionService.Error = error;
          }
        );
    }
  }

  onCancel() {
    if (this.sessionService.ChangedItems.length > 0) {
      this.modal.open(this.myModals.cancelConfirm).result.then((result) => {
        if (result === 'Ok') {
          this.router.navigate(['licensee/' + this.id + '/detail']);
          this.sessionService.resetSaveState();
        }
      }, (reason) => {
      });
    }
  }

  onLicenseeNavigate(pageName) {
    this.router.navigate(['/licensee/' + this.id + '/' + pageName]);
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
