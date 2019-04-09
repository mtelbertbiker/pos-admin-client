import { Component, OnInit } from '@angular/core';
import {Licensee} from '../../../shared/licensee.model';
import {ActivatedRoute, Params} from '@angular/router';
import {LicenseeService} from '../../../shared/licensee.service';

@Component({
  selector: 'app-licensee-user-list',
  templateUrl: './licensee-user-list.component.html',
  styleUrls: ['./licensee-user-list.component.css']
})
export class LicenseeUserListComponent implements OnInit {
  licensee: Licensee;
  id: number;

  constructor(private route: ActivatedRoute,
              private licenseeService: LicenseeService) { }

  ngOnInit() {
    console.log('Licensee User List Component onInit');
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.licensee = this.licenseeService.getLicensee(this.id);
        }
      );
  }
}
