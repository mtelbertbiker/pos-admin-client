import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ResellerService} from '../../reseller.service';
import {Licensee} from '../../../shared/licensee.model';

@Component({
  selector: 'app-reseller-licensee-list',
  templateUrl: './reseller-licensee-list.component.html',
})
export class ResellerLicenseeListComponent implements OnInit {
  @Input() licensees: Licensee[];

  constructor(private resellerService: ResellerService,
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

  onAddLicensee() {
  }

}
