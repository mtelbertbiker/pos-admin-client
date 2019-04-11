import {Component, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs/Rx';


@Component({
  selector: 'app-licensee-master-item-navigation',
  templateUrl: './licensee-master-item-navigation.component.html',
  styleUrls: ['./licensee-master-item-navigation.component.css']
})
export class LicenseeMasterItemNavigationComponent implements OnInit {
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
              private sessionService: SessionService,
              private venueService: VenueService,
              private modal: NgbModal,
              private router: Router) {
  }


  ngOnInit() {
    console.log('Licensee Master Item Navigation Component onInit');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
          this.venueDataService.getVenues(this.licensee.LicId);
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
    console.log('onSelectVenue:' + index);
    this.vid = index;
    this.router.navigate(['licensee/' + this.id + '/locations/' + index + '/detail']);
  }


  onAddVenue() {
    console.log('onAddVenue');
    const newVenue = new Venue(0, 0, 0, 'New Location',
      '', '', '', '', '', '', '', 0, '', false, '', false, ''
      , true, [], [], [], [], 0, false, '');
    newVenue.LicId = this.sessionService.licensee.LicId;
    this.vid = this.venueService.addVenue(newVenue);
    this.sessionService.setSaveState(FormTypes.Locations, false, true);
    this.router.navigate(['licensee/' + this.id + '/locations/' + this.vid + '/detail']);
  }


  onSave() {
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
            console.log(licensee);
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
                    console.log('PutVenue Response:' + loc.toString());
                    this.venueService.putVenue(this.vid, loc);
                    this.sessionService.resetSaveState();
                  });
            } else {
              this.sessionService.resetSaveState();
            }
          }
        );
    } else {
      this.sessionService.Saving.push(FormTypes.Locations.toString());
      this.sessionService.HideSaveBtn = true;
      this.venueDataService.putVenue(this.venueService.getVenue(this.vid))
        .subscribe(
          resp => {
            let venue: any;
            venue = resp;
            console.log('PutVenue Response:' + venue.toString());
            this.venueService.putVenue(this.vid, venue);
            this.sessionService.resetSaveState();
            this.venues = this.venueService.getVenuesForLicensee(this.licensee.LicId);
          });
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


}
