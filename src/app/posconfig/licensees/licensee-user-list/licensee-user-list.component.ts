import { Component, OnInit } from '@angular/core';
import {Licensee} from '../../../shared/licensee.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LicenseeService} from '../../../shared/licensee.service';
import {LicenseeUser} from '../../../shared/licensee-user.model';
import {FormTypes} from '../../../shared/data-services/constants.service';
import {SessionService} from '../../../shared/data-services/session.service';
import {LogService} from '../../../shared/log.service';

@Component({
  selector: 'app-licensee-user-list',
  templateUrl: './licensee-user-list.component.html',
  styleUrls: ['./licensee-user-list.component.css']
})
export class LicenseeUserListComponent implements OnInit {
  licensee: Licensee;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService,
              private log: LogService,
              private licenseeService: LicenseeService) { }

  ngOnInit() {
    this.log.logTrace('LicenseeUserListComponent onInit');
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
        }
      );
  }

  onAddLicenseeUser() {
    const newLicUser = new LicenseeUser();
    this.licensee.LicenseeUsers.push(newLicUser);
    this.sessionService.setSaveState(FormTypes.Users, true, true);
    this.router.navigate([this.licensee.LicenseeUsers.length - 1], {relativeTo: this.route});
  }
}
