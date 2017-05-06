import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-venue-detail-navigation',
  templateUrl: './venue-detail-navigation.component.html',
})
export class VenueDetailNavigationComponent implements OnInit {
  id: number;
  isCollapsed = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['vid'];
        }
      );
  }

  toggleCollapseState() {
    this.isCollapsed = !this.isCollapsed;
  }

}
