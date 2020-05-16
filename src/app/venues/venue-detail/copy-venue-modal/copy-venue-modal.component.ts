import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../shared/data-services/session.service';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../venue.service';

@Component({
  selector: 'app-copy-venue-modal',
  templateUrl: './copy-venue-modal.component.html',
  styleUrls: ['./copy-venue-modal.component.scss']
})
export class CopyVenueModalComponent implements OnInit {
  index: number;
  venue: Venue;
  venues: Venue[];

  constructor(public modal: NgbActiveModal,
              private sessionService: SessionService,
              private venueService: VenueService) { }

  ngOnInit() {
    console.log('Venue Copy onInit');
    this.index = this.sessionService.getCurrentVenueIndex();
    this.venue = this.venueService.getVenue(this.index);
    this.venues = this.venueService.getVenues();
  }

  targetLicenseeVenueIndexList() {
    const indexlist = [];
    for (let i = 0; i < this.venues.length; i++) {
      if (i !== this.index) {
        indexlist.push(i);
      }
    }
    return indexlist;
  }

  feeGroupName(rifg) {
    const fg = this.venue.FeeGroups.find(x => x.FGId === rifg.FGId);
    return fg.Name;
  }

}
