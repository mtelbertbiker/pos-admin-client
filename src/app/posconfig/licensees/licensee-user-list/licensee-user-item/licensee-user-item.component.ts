import {Component, Input, OnInit} from '@angular/core';
import {LicenseeUser} from '../../../../shared/licensee-user.model';

@Component({
  selector: 'app-licensee-user-item',
  templateUrl: './licensee-user-item.component.html',
  styleUrls: ['./licensee-user-item.component.css']
})
export class LicenseeUserItemComponent implements OnInit {
  @Input() licenseeUser: LicenseeUser;
  @Input() index: number;
  @Input() vid: number;

  constructor() { }

  ngOnInit() {
  }

}
