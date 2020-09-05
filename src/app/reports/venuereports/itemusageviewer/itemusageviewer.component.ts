import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Venue} from '../../../shared/pos-models/venue.model';
import {VenueService} from '../../../venues/venue.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ConstantsService} from '../../../shared/data-services/constants.service';

@Component({
  selector: 'app-itemusageviewer',
  templateUrl: './itemusageviewer.component.html'
})
export class ItemUsageViewerComponent implements OnInit {
  @Input() beginDateTime: string; // '06/03/2020 00:00';
  @Input()  endDateTime: string; // '06/04/2020 23:59';
  @ViewChild('viewer1', { read: false }) childReport;
  venue: Venue;
  id: number;
  ready = 'ready';
  viewerToolTipOpening = 'viewerToolTipOpening';
  viewerContainerStyle = {
    position: 'relative',
    width: '800px',
    height: '800px',
    ['font-family']: 'ms sans serif',
    encapsulation: ViewEncapsulation.None
  };

  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              public constantsService: ConstantsService) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );
  }

  doReportRefresh() {
    const source = this.childReport.reportSource;
    source.parameters.beginDateTime = this.beginDateTime;
    source.parameters.endDateTime = this.endDateTime;
    this.childReport.setReportSource(source);
  }




}
