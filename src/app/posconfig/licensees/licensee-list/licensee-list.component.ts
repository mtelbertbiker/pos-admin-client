import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ResellerService} from '../../../resellers/reseller.service';
import {Licensee} from '../../../shared/licensee.model';
import {ResellerDataService} from '../../../shared/data-services/reseller-data.service';
import {RentalItem} from '../../../shared/pos-models/rental-item.model';

@Component({
  selector: 'app-licensee-list',
  templateUrl: './licensee-list.component.html',
})
export class LicenseeListComponent implements OnInit {
  licensees: Licensee[];

  constructor(private resellerService: ResellerService,
              private resellerDataService: ResellerDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.licensees = this.resellerService.getLicensees();
        }
      );
  }



}
