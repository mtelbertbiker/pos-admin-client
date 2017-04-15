import {Component, OnInit} from '@angular/core';
import {VenueDataService} from './shared/data-services/venue-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private venueDataService: VenueDataService) {}

  ngOnInit() {
    this.venueDataService.getVenues();
  }
}


