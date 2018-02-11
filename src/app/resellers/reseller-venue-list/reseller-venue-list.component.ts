import { Component, OnInit } from '@angular/core';
import {Venue} from "../../shared/pos-models/venue.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ResellerService} from "../reseller.service";
import {ResellerDataService} from "../../shared/data-services/reseller-data.service";

@Component({
  selector: 'app-reseller-venue-list',
  templateUrl: './reseller-venue-list.component.html'
})
export class ResellerVenueListComponent implements OnInit {
  venues: Venue[];
  licid: number;

  constructor(private resellerService: ResellerService,
              private resellerDataService: ResellerDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.licid = +params['licid'];
          this.venues = this.resellerService.getLocations();
        }
      );
  }

}
